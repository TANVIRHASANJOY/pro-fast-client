import React from 'react';
import Banner from './Banner/Banner';
import Services from './Services/Services';
import BrandMarquee from './BrandMarquee/BrandMarquee';
import Benefits from './Benefits/Benefits';
import BeMarcent from './Bemarcent/Bemarcent';
import HowItWorks from './HowItWorks/HowItWorks';
import CustomerReview from './CustomerReview/CustomerReview';
import FAQ from './Frequently/FAQ';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <HowItWorks></HowItWorks>
          <Services></Services>
          <BrandMarquee></BrandMarquee>
          <Benefits></Benefits>
          <BeMarcent></BeMarcent>
          <CustomerReview></CustomerReview>
          <FAQ></FAQ>
        </div>
    );
};

export default Home;