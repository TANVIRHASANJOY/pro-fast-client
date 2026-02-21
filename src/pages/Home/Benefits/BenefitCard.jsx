import React from "react";

const BenefitCard = ({ title, description, image }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 
                    p-6 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Left Image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={image}
          alt={title}
          className="w-40 h-40 object-contain rounded-xl"
        />
      </div>

      {/* Middle Divider Line */}
      <div className="hidden md:block w-px h-40 bg-gray-300"></div>

      {/* Right Text */}
      <div className="w-full md:w-2/3 text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
