import React, { useState, useCallback } from "react";
import Button from "./Button";

//useCallback is used for performance optimization

const CallBackDemo = () => {
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(100);

  const handleAge = useCallback(() => {
    setAge(age + 1);
  }, [age]);

  const handleSalary = useCallback(() => {
    setSalary(salary + 100);
  }, [salary]);

  //   const handleAge = () => {
  //     setAge(age + 1);
  //   };

  //   const handleSalary = () => {
  //     setSalary(salary + 100);
  //   };

  return (
    <div>
      <h3>use of useCallBack hook</h3>
      <p>age - {age} </p>
      <Button handleClick={handleAge}>Increment Age</Button>
      <p>salary - {salary}</p>
      <Button handleClick={handleSalary}>Increment Salary</Button>
    </div>
  );
};

export default CallBackDemo;
