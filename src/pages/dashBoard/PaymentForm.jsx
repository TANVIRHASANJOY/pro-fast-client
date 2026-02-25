import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentForm = ({ parcel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  // Step 1: Client Secret create kora backend theke
  useEffect(() => {
    if (parcel?.cost > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: parcel.cost })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Payment intent error:", err);
        });
    }
  }, [axiosSecure, parcel]);

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || processing) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    setProcessing(true);
    setCardError("");

    // Step 2: Stripe confirmation
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Step 3: Payment information prepare kora
      const paymentInfo = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price: parcel.cost,
        date: new Date().toISOString(),
        parcelId: parcel._id,
        status: "paid",
      };

      // Step 4: Backend request & UI feedback
      try {
        const res = await axiosSecure.post("/payments", paymentInfo);
        
        // Check both payment result and update result
        if (res.data.paymentResult.insertedId) {
          Swal.fire({
            title: "Payment Successful! 🎉",
            text: `Transaction ID: ${paymentIntent.id}`,
            icon: "success",
            confirmButtonColor: "#4F46E5",
          }).then((result) => {
            if (result.isConfirmed) {
              // Step 5: Redirect only after user acknowledges
              navigate("/dashboard/myParcels");
            }
          });
        }
      } catch (err) {
        Swal.fire("Error", "Database update failed, but payment was charged. Contact support.", "error");
      }
      setProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-gray-100">
        <div className="card-body p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
            Complete Payment
          </h2>

          <form onSubmit={handlePay} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold uppercase tracking-wide">
                  Card Details
                </span>
              </label>
              <div className="p-4 border-2 rounded-lg bg-gray-50 border-indigo-100 focus-within:border-indigo-500 transition-all">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": { color: "#aab7c4" },
                      },
                      invalid: { color: "#9e2146" },
                    },
                  }}
                />
              </div>
              {cardError && (
                <p className="text-red-500 text-xs mt-2 font-medium italic">
                  {cardError}
                </p>
              )}
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg mt-4 border border-indigo-100">
              <div className="flex justify-between font-bold text-indigo-900">
                <span>Total Payable</span>
                <span>৳ {parcel?.cost}</span>
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className={`btn btn-indigo text-white border-none text-lg shadow-lg transform active:scale-95 transition-all
                ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                }`}
              >
                {processing ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  `Pay ৳${parcel?.cost}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;