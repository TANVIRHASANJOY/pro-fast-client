import React from "react";
import BenefitCard from "./BenefitCard";

import trackingImg from '../../../assets/benefits/tracking.png'
import safeImg from "../../../assets/benefits/Vector (1).png";
import supportImg from "../../../assets/benefits/Vector.png";

const Benefits = () => {
  const benefitsData = [
    {
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: trackingImg,
    },
    {
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: safeImg,
    },
    {
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: supportImg,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 space-y-16">

        {benefitsData.map((item, index) => (
          <BenefitCard
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}

      </div>
    </section>
  );
};

export default Benefits;
