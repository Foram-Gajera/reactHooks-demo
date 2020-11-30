import { useState } from "react";
//custom hooks - name always starts with use
//here manage (state)value and validity
export const useFormInput = () => {
  const [value, setValue] = useState("");
  const [validity, setValidity] = useState(false);

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
    if (event.target.value.trim() === "") {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };
  return {
    value: value,
    onChange: inputChangeHandler,
    validity,
  };
};
