import React from "react";

const Email = () => {
  return (
    <div>
      <div className="email-header">
        <h2>Thank you for support us😍, Patel Dahyabhai Somabhai</h2>
      </div>
      <div className="email-content">
        <p>Dear [Donor's Name],</p>
        <p>
          We are truly grateful for your generous donation of [Donation
          Amount/Item/Service]. Your support means a great deal to us and helps
          us continue our mission of [Briefly Describe Your Organization's
          Mission].
        </p>
        <p>
          <strong>
            We've attached an invoice with this email for your records
          </strong>
          . If you have any questions or need further assistance, please feel
          free to contact us
        </p>
        <p>
          Thank you again for your kindness and support. We look forward to
          updating you on our progress and sharing the impact of your
          generosity.
        </p>
        <p>Warm regards,</p>
        [Your Organization's Name]
      </div>
    </div>
  );
};

export default Email;
