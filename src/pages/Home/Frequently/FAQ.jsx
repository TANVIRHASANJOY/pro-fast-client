import React from "react";

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Question (FAQ)
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture Pro.
            Achieve proper alignment, reduce pain, and strengthen your body with ease!
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">

          {/* Item 1 */}
          <div className="collapse collapse-plus bg-white rounded-xl shadow-md">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-lg font-semibold">
              How does this posture corrector work?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. 
                Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="collapse collapse-plus bg-white rounded-xl shadow-md">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              Is it suitable for all ages and body types?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes, the posture corrector is designed with adjustable straps to fit various body types and ages. 
                However, children under 12 should use it under adult supervision.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="collapse collapse-plus bg-white rounded-xl shadow-md">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              How long should I wear it daily?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                It is recommended to start with 20–30 minutes per day and gradually increase usage 
                as your posture improves and muscles strengthen.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="collapse collapse-plus bg-white rounded-xl shadow-md">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              Can I wear it under my clothes?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes, the posture corrector is lightweight and slim enough to wear discreetly under clothing 
                without being noticeable.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="collapse collapse-plus bg-white rounded-xl shadow-md">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              Does it help reduce back and neck pain?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes, by improving spinal alignment and reducing strain on muscles, 
                it helps alleviate back and neck discomfort over time.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
