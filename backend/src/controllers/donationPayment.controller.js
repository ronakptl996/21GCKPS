import crypto from "crypto";
import { razorPayInstance } from "../index.js";
import { Donor } from "../models/donor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Donation } from "../models/donation.model.js";
import { generatePdfAndMail } from "../utils/generatePdf.js";
import { ApiError } from "../utils/ApiError.js";

const checkout = asyncHandler(async (req, res) => {
  //   console.log(req.body);
  const { headOfFamily } = req.user;

  const userName = `${headOfFamily.surname} ${headOfFamily.firstname} ${headOfFamily.secondname}`;
  const userEmail = headOfFamily.email;
  const userContact = headOfFamily.contact;

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await razorPayInstance.orders.create(options);

  const donor = await Donor.create({
    amount: req.body.amount,
    donateQty: req.body.donateQty,
    donateName: req.body.donationName,
    orderId: order.id,
    donorName: userName,
    donorEmail: userEmail,
    donorContact: userContact,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userName, userEmail, userContact, order, donorId: donor._id },
        ""
      )
    );
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { id, qty } = req.params;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    );

    const donation = await Donation.findById(id);

    let totalDonationPrice = donation.price;
    let totalDonationQty = donation.totalQty;
    let eachPrice = totalDonationPrice / totalDonationQty;
    let minusPrice = eachPrice * Number(qty);

    donation.totalQty = donation.totalQty - Number(qty);
    donation.price = donation.price - minusPrice;
    await donation.save({ validateBeforeSave: false });

    const donorData = await Donor.findOne({ orderId: razorpay_order_id });
    donorData.paymentId = razorpay_payment_id;
    donorData.signatureId = razorpay_signature;
    donorData.status = "paid";
    await donorData.save({ validateBeforeSave: false });

    // Generate PDF and send mail
    generatePdfAndMail(donorData);
  } else {
    throw new ApiError(500, "Error while verifying payment");
  }
});

export { checkout, verifyPayment };
