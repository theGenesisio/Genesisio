import React from "react";
import FAQCard from "./FAQCard";
import Lorem from "../../assets/constants";
import { gsapAnimationScrollTrigger } from "../../assets/utils";
const FAQs = () => {
  gsapAnimationScrollTrigger({ identifier: ".faq" });
  const { faqs } = Lorem;
  return (
    <div className="px-6 py-12 mx-auto">
      <h1 className="text-accent-green text-center text-topic font-normal mb-10 capitalize faq">
        Frequently asked questions
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {faqs.map((faq) => (
          <FAQCard question={faq.question} ans={faq.ans} key={faq.question}/>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
