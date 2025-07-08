import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code"; // ✅ Correct import for react-qr-code
import { useNavigate } from "react-router-dom";
import "./paymentMethod.css";
import { FaGooglePay, FaMoneyBillWave } from "react-icons/fa";

const PaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [qrExpired, setQrExpired] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const navigate = useNavigate();

    const amount = 1;
    const upiId = "7667363767@axl";
    const upiLink = `upi://pay?pa=${upiId}&pn=Merchant&am=${amount}&cu=INR`;

    // QR expires after 2 minutes
    useEffect(() => {
        let timer;
        if (showQR) {
            timer = setTimeout(() => {
                setShowQR(false);
                setQrExpired(true);
            }, 2 * 60 * 1000);
        }
        return () => clearTimeout(timer);
    }, [showQR]);

    // Redirect after payment
    useEffect(() => {
        if (paymentConfirmed) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [paymentConfirmed, navigate]);

    const handleSelect = (method) => {
        setSelectedMethod(method);
        setShowQR(false);
        setQrExpired(false);
        setPaymentConfirmed(false);

        if (method === "upi") {
            setShowQR(true); // ✅ Show QR only when UPI is selected
        }
    };

    const handleConfirmPayment = () => {
        setShowQR(false);
        setPaymentConfirmed(true);
    };

    return (
        <div className="payment-container">
            <h2>Select Payment Method</h2>

            <div className="payment-options">
                <div
                    className={`option ${selectedMethod === "upi" ? "selected" : ""}`}
                    onClick={() => handleSelect("upi")}
                >
                    <FaGooglePay /> Pay with UPI
                </div>
                <div
                    className={`option ${selectedMethod === "cod" ? "selected" : ""}`}
                    onClick={() => handleSelect("cod")}
                >
                    <FaMoneyBillWave /> Cash on Delivery
                </div>
            </div>

            <div className="payment-form">
                {selectedMethod === "upi" && showQR && (
                    <div className="upi-section">
                        <p>Scan this QR using your UPI app:</p>
                        <QRCode value={upiLink} size={200} />
                        {/* <p className="qr-link">{upiLink}</p> */}
                        <button className="confirm-btn" onClick={handleConfirmPayment}>
                            ✅ I have completed payment
                        </button>
                    </div>
                )}

                {paymentConfirmed && (
                    <p className="success-message">✅ Payment confirmed! Redirecting to Home...</p>
                )}

                {qrExpired && !paymentConfirmed && (
                    <p className="expired-message">❌ QR code expired. Please try again.</p>
                )}

                {selectedMethod === "cod" && (
                    <div className="cod-confirm">
                        <p>You have selected <strong>Cash on Delivery</strong>.</p>
                        <button onClick={() => navigate("/")}>Confirm Order</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentMethod;
