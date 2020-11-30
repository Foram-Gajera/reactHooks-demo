import React, { useState, useMemo } from "react";

function MemoHook() {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const incrementOne = () => {
    setCounterOne(counterOne + 1);
  };
  const incrementTwo = () => {
    setCounterTwo(counterTwo + 1);
  };

  const isEven = useMemo(() => {
    //make slow this even function
    let i = 0;
    while (i < 200000000) {
      //   console.log(i);
      i++;
    }

    return counterOne % 2 === 0;
  }, [counterOne]);

  return (
    <div>
      <h3>useMemo Demo</h3>
      <button onClick={incrementOne}>(slow) counter one - {counterOne}</button>
      <p>{isEven ? "counter one: Even" : "counter one: Odd"}</p>
      <button onClick={incrementTwo}>
        (normal) counter two - {counterTwo}
      </button>
    </div>
  );
}

export default MemoHook;
