import React, { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaUserCircle, FaBuilding } from "react-icons/fa";

const CustomerReview = () => {
  const reviews = [
    {
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
      name: "John Smith",
      position: "Senior Product Designer",
    },
    {
      text: "This product completely changed my daily routine. My back pain reduced significantly after using it consistently.",
      name: "Sarah Johnson",
      position: "UI/UX Designer",
    },
    {
      text: "I love the comfort and quality. It feels natural and doesn't restrict movement.",
      name: "Michael Brown",
      position: "Software Engineer",
    },
    {
      text: "Excellent support and fast delivery. Highly recommended for office workers.",
      name: "Emily Davis",
      position: "Marketing Manager",
    },
    {
      text: "Very comfortable and easy to use. Helps me stay aligned all day.",
      name: "David Wilson",
      position: "Business Analyst",
    },
    {
      text: "Superb build quality and very effective for posture improvement.",
      name: "Olivia Taylor",
      position: "HR Manager",
    },
    {
      text: "A must-have for remote workers. Keeps posture in check effortlessly.",
      name: "James Anderson",
      position: "Frontend Developer",
    },
    {
      text: "Professional design and noticeable results within days.",
      name: "Sophia Thomas",
      position: "Product Owner",
    },
    {
      text: "Very supportive and lightweight. I wear it daily.",
      name: "Daniel Martinez",
      position: "Graphic Designer",
    },
    {
      text: "Improved my posture and reduced neck strain significantly.",
      name: "Isabella Moore",
      position: "Project Manager",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  const review = reviews[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-4">
          What our customers are sayings
        </h2>

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
          Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        {/* Review Card */}
        <div className="bg-white p-10 rounded-2xl shadow-xl relative">

          {/* Company Icon */}
          <div className="flex justify-center mb-6 text-green-600 text-3xl">
            <FaBuilding />
          </div>

          {/* Quote Icon */}
          <div className="text-green-500 text-2xl mb-4 flex justify-center">
            <FaQuoteLeft />
          </div>

          {/* Review Text */}
          <p className="text-gray-700 leading-relaxed mb-8">
            {review.text}
          </p>

          {/* User Info */}
          <div className="flex items-center justify-center gap-4">
            <FaUserCircle className="text-4xl text-gray-400" />
            <div className="text-left">
              <h4 className="font-bold">{review.name}</h4>
              <p className="text-sm text-gray-500">
                {review.position}
              </p>
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 px-4 -translate-y-1/2">
            <button
              onClick={prevReview}
              className="bg-gray-200 hover:bg-green-500 hover:text-white transition w-10 h-10 rounded-full flex items-center justify-center"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextReview}
              className="bg-gray-200 hover:bg-green-500 hover:text-white transition w-10 h-10 rounded-full flex items-center justify-center"
            >
              <FaArrowRight />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
