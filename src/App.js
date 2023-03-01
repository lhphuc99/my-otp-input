import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState("");
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  function handleOtpChange(e, index) {
    const value = e.target.value;

    // Only allow numeric values
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Update the OTP value for the given index
    const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
    if (newOtp.length <= 6) setOtp(newOtp);

    // Move focus to the next input field
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  }

  function handleOtpPaste(e) {
    e.preventDefault();

    // Get the pasted text and split it into individual characters
    const pastedData = e.clipboardData.getData("text/plain").split("");

    // Update the OTP value for each character in the pasted text
    let newOtp = otp;
    for (let i = 0; i < pastedData.length && i < inputRefs.length; i++) {
      if (/^\d*$/.test(pastedData[i])) {
        newOtp = newOtp.slice(0, i) + pastedData[i] + newOtp.slice(i + 1);
      }
    }
    setOtp(newOtp);
  }

  function handleOtpKeyDown(e, index) {
    const value = e.target.value;

    // Handle backspace key to move focus to previous input field
    if (e.key === "Backspace" && !value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    if (e.key === "Backspace" && !value && index === 0) {
      e.preventDefault();
    }
  }

  return (
    <div>
      {inputRefs.map((ref, i) => (
        <input
          key={i}
          ref={ref}
          type="tel"
          pattern="\d*"
          inputMode="numeric"
          value={otp[i] || ""}
          onChange={(e) => handleOtpChange(e, i)}
          onPaste={handleOtpPaste}
          onKeyDown={(e) => handleOtpKeyDown(e, i)}
        />
      ))}
    </div>
  );
}

export default App;
