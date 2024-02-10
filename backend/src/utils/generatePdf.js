import pdf from "html-pdf";
import pdfTemplate from "../documents/index.js";
import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

export const generatePdfAndMail = (donor) => {
  console.log("GENERATE PDG >>>>>");
  pdf
    .create(pdfTemplate(donor), {})
    .toFile(
      `donation/${donor.donorName}-${donor.donateName}.pdf`,
      (err, data) => {
        if (err) {
          throw new ApiError(500, "Error while Generate PDF");
        } else {
          sendMail(donor, data);
        }
      }
    );
};

const sendMail = async (donor, data) => {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "emmie.lesch53@ethereal.email",
      pass: "NRxSNaaukVbPrKgfpT",
    },
  });

  let mailDetails = {
    from: "21gckps@gmail.com",
    to: "pronak391@gmail.com",
    subject: "Donation receipt",
    text: `Thank you for support us😍, ${donor.donorName} for donating ${donor.donateName} - ${donor.donateQty}.`,
    attachments: [
      {
        path: data.filename,
      },
    ],
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log("Error in sendMail");
    } else {
      console.log("Mail Sent successfully");
      console.log(data);
    }
  });
};
