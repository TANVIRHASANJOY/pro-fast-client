import React from "react";
import Marquee from "react-fast-marquee";
import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/casio.png";
import brand3 from "../../../assets/brands/amazon_vector.png";
import brand4 from "../../../assets/brands/moonstar.png";
import brand5 from "../../../assets/brands/randstad.png";
import brand6 from "../../../assets/brands/start-people 1.png";
import brand7 from "../../../assets/brands/start.png";

const BrandMarquee = () => {
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

  return (
    <div className="py-12 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          We've helped thousands of <span className="text-primary">sales teams</span>
        </h2>
      </div>

      {/* Marquee */}
      <Marquee gradient={false} speed={60} pauseOnHover={true}>
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-24 h-16 flex items-center justify-center mx-6"
          >
            <img
              src={brand}
              alt={`brand-${index}`}
              className="object-contain h-full w-full"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
