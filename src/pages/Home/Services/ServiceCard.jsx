import React from "react";

const ServiceCard = ({ title, description, Icon }) => {
  return (
    <div
      className="group bg-white p-6 rounded-xl shadow-md
                 hover:shadow-2xl hover:-translate-y-2 
                 hover:bg-primary
                 transition-all duration-300
                 text-center"
    >
      {/* Center Icon */}
      <div className="flex justify-center mb-4">
        <Icon className="text-4xl text-primary group-hover:text-white transition duration-300" />
      </div>

      {/* Center Title */}
      <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white transition duration-300">
        {title}
      </h3>

      {/* Center Description */}
      <p className="text-gray-600 text-sm group-hover:text-gray-200 transition duration-300">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
