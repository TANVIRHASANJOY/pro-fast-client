import React from "react";
import bannerImg from "../../../assets/location-merchant.png";
import bgImage from "../../../assets/be-a-merchant-bg.png";

const BeMarcent = () => {
  return (
    <section data-aos="zoom-in-up" className="p-10 flex justify-center bg-gray-100">
      {/* Card Container */}
      <div 
        className="w-full max-w-6xl rounded-2xl p-20 flex flex-col md:flex-row items-center gap-12 shadow-2xl bg-[#03373D] bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Optional Dark Overlay (for better readability) */}
        <div className="absolute inset-0 bg-[#03373D]/80"></div>

        {/* Content Wrapper (important: relative + z-10) */}
        <div className="relative z-10 md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl font-extrabold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="text-white text-lg leading-relaxed">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-white/90 transition">
              Become a Merchant
            </button>
            <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default BeMarcent;
