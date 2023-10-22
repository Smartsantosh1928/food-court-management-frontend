import React, { useState } from 'react';
import upiqr from 'upiqr';

const Demo = () => {
  const [amount, setAmount] = useState('');
  const [qrCodeURL, setQrCodeURL] = useState('');

  const generateQRCode = () => {
    upiqr({
        payeeVPA: "rockroshan1114@okicici",
        payeeName: "Roshan",
        amount: amount
      })
      .then((upi) => {
        setQrCodeURL(upi.qr);
        console.log(upi.qr);
        console.log(upi.intent);  
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <div>
        <label>Enter the amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={generateQRCode}>Generate QR Code</button>
      </div>
      {qrCodeURL && (
        <div>
          <h2>Generated QR Code:</h2>
          <img src={qrCodeURL} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default Demo;
