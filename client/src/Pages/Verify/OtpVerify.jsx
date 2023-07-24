import React, { useEffect, useState } from "react";

export const OtpVerify = ({ handleOtpVerification, loading, location }) => {
  const [value, setValue] = useState("");
  const [btnValue, setBtnValue] = useState("Verify");

  useEffect(() => {
    if (loading && location === window.location.href) {
      setBtnValue("Loading...");
    } else {
      setBtnValue("Verify");
    }
  }, [loading, location]);

  return (
    <div className="verify-container">
      <div className="verify-text">
        <h4>Enter your OTP</h4>
        <p>email was successfully sent</p>
      </div>
      <div className="opt-form">
        <input
          value={value}
          type="text"
          name="Otp"
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => handleOtpVerification(value)}>{btnValue}</button>
      </div>
    </div>
  );
};
