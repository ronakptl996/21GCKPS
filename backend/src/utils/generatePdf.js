import pdf from "html-pdf";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import { ApiError } from "./ApiError.js";
import pdfTemplate from "../documents/index.js";
import nodemailer from "nodemailer";

export const generatePdfAndMail = async (donor) => {
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

const sendMail = async (donor, donorData) => {
  // Get the full path to the current script
  const fullPath = fileURLToPath(import.meta.url);

  // Get the current script directory
  const currentScriptDirectory = path.dirname(fullPath);

  // Get the parent directory
  const parentDirectory = path.dirname(currentScriptDirectory);

  console.log("======================sendMail ===========================");
  console.log("================= Donor ======", donor);
  console.log("Current script directory:", currentScriptDirectory);
  console.log("Parent directory:", parentDirectory);

  const invoicePath = path.resolve(
    parentDirectory, // Ensures parentDirectory is interpreted correctly
    "donation", // Adds 'donation' as a new path segment
    donorData.filename // File name
  );

  console.log("invoicePath =========", invoicePath);

  const invoiceBuffer = fs.readFileSync(invoicePath);

  console.log("PATH FOR DONATION=============");
  console.log("invoiceBuffer =>>>>>>>", invoiceBuffer);
  console.log("DIR ====>", parentDirectory);

  const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["21gckpatidarsamaj@gmail.com"],
    subject: "Donation receipt 21GKPS",
    html: `<div>
        <div className="email-header">
          <h2>Thank you for support us😍</h2>
        </div>
        <div className="email-content">
          <p>Dear ${donor.donorName},</p>
          <p>
            We are truly grateful for your generous donation of ${donor.donateName}. Your support means a great deal to us and helps
            us continue our mission of 21GCKPS.
          </p>
          <p>
            <strong>
              We've attached an invoice with this email for your records.
            </strong>
            If you have any questions or need further assistance, please feel
            free to contact us
          </p>
          <p>
            Thank you again for your kindness and support. We look forward to
            updating you on our progress and sharing the impact of your
            generosity.
          </p>
          <p>Warm regards,</p>
          <p>21GCKPS</p>
        </div>
    </div>`,
    attachments: [
      {
        filename: donorData.filename,
        content: invoiceBuffer,
      },
    ],
  });

  if (error) {
    console.log("ERROR WHILE ---------------ERROR WHILE EMAIL SEND >>", error);
    // return res.status(400).json({ error });
  }

  console.log("EMAIL SEND SUCCESSFULLY >>", data);
};

// let testAccount = await nodemailer.createTestAccount();

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "emmie.lesch53@ethereal.email",
//     pass: "NRxSNaaukVbPrKgfpT",
//   },
// });

// let mailDetails = {
//   from: "21gckps@gmail.com",
//   to: "pronak391@gmail.com",
//   subject: "Donation receipt",
//   text: `Thank you for support us😍, ${donor.donorName} for donating ${donor.donateName} - ${donor.donateQty}.`,
//   attachments: [
//     {
//       path: data.filename,
//     },
//   ],
// };

// transporter.sendMail(mailDetails, (err, data) => {
//   if (err) {
//     console.log("Error in sendMail");
//   } else {
//     console.log("Mail Sent successfully");
//     console.log(data);
//   }
// });
