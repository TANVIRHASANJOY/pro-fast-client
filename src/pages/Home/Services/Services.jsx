import React from "react";
import ServiceCard from "../../../pages/Home/Services/ServiceCard";

import {
  FaShippingFast,
  FaTruck,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in major cities. Express delivery available within 4–6 hours in Dhaka.",
      icon: FaShippingFast,
    },
    {
      title: "Nationwide Delivery",
      description:
        "Home delivery in every district across Bangladesh within 48–72 hours.",
      icon: FaTruck,
    },
    {
      title: "Fulfillment Solution",
      description:
        "Inventory management, order processing, packaging, and after-sales support.",
      icon: FaWarehouse,
    },
    {
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery service anywhere in Bangladesh with guaranteed safety.",
      icon: FaMoneyBillWave,
    },
    {
      title: "Corporate Service / Contract Logistics",
      description:
        "Customized corporate solutions including warehouse and inventory management.",
      icon: FaBuilding,
    },
    {
      title: "Parcel Return",
      description:
        "Reverse logistics facility allowing easy product return or exchange.",
      icon: FaUndoAlt,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      
      {/* Upper Intro */}
      <div className="max-w-6xl mx-auto text-center px-4 mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            Icon={service.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
