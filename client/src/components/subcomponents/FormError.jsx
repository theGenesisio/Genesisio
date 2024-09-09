import React from "react";

const FormError = (props) => {
  const { err, code } = props;
  let classes =
    code <= 220 ? "text-accent-green text-sm" : "text-accent-red text-sm";
  return <div className={classes}>{err}</div>;
};
export default FormError;
