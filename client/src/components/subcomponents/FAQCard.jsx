import React, { useState } from "react";
import { Collapse } from "@material-tailwind/react";
import { faqClosedIcon, faqOpenIcon } from "../../assets/utilities";
const FAQCard = (props) => {
  const [open, setOpen] = useState(false);
  const { question, ans } = props;
  return (
    <div>
      <div className="p-8 bg-inherit vessel faq">
        <button className="flex items-center justify-between w-full">
          <h1 className="font-semibold text-accent-green">{question}</h1>

          <span
            className="text-accent-green bg-secondary-blue rounded-full"
            onClick={() => setOpen(!open)}
          >
            {open ? faqOpenIcon : faqClosedIcon}
          </span>
        </button>
        <Collapse open={open}>
          <p className="mt-6 text-sm text-white">{ans}</p>
        </Collapse>
      </div>
    </div>
  );
};

export default FAQCard;
