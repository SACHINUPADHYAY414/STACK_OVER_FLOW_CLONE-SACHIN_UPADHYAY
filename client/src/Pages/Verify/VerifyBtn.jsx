import React from "react";

export const VerifyBtn = ({ handleVerify }) => {
  return (
    <div className="verify-container">
      <div className="verify-text">
        <h4>Complete Account Verification</h4>
        <p>To access full resources, please verify your account.</p>
      </div>
      <button onClick={handleVerify}>Verify my account</button>
    </div>
  );
};
