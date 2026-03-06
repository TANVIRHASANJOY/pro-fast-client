import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-16">
      
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        About Pro Fast Delivery
      </h1>

      <p className="max-w-3xl text-center text-gray-700 mb-8 text-lg">
        Welcome to <span className="font-semibold">Pro Fast Delivery</span>, your
        reliable partner for fast and secure parcel delivery. We aim to make 
        shipping simple, transparent, and hassle-free for both individuals and businesses.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">

        {/* Feature 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Fast Delivery</h2>
          <p className="text-gray-600">
            We ensure your parcels reach their destination as quickly as possible, every time.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-xl font-bold mb-2 text-green-600">Reliable Tracking</h2>
          <p className="text-gray-600">
            Track your parcels in real-time and stay updated at every stage of delivery.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-xl font-bold mb-2 text-yellow-600">Trusted Riders</h2>
          <p className="text-gray-600">
            Our team of verified riders ensures safe and professional delivery every time.
          </p>
        </div>

      </div>

      <p className="max-w-3xl text-center text-gray-700 mt-12 text-lg">
        At Pro Fast Delivery, we value your trust and satisfaction. Our mission is to
        provide seamless delivery solutions that save you time and keep your items safe.
        Join us and experience delivery like never before!
      </p>

    </div>
  );
};

export default AboutUs;