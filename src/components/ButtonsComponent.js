import React from "react";

const BtnValues = [
  { id: "clear", simb: "AC" },
  { id: "backspace", simb: "DEL" },
  { id: "divide", simb: "÷" },
  { id: "seven", simb: "7" },
  { id: "eight", simb: "8" },
  { id: "nine", simb: "9" },
  { id: "multiply", simb: "x" },
  { id: "four", simb: "4" },
  { id: "five", simb: "5" },
  { id: "six", simb: "6" },
  { id: "subtract", simb: "-" },
  { id: "one", simb: "1" },
  { id: "two", simb: "2" },
  { id: "three", simb: "3" },
  { id: "add", simb: "+" },
  { id: "zero", simb: "0" },
  { id: "decimal", simb: "." },
  { id: "equals", simb: "=" },
];

const Btns = (props) => {
  const Btns = BtnValues.map((item) => {
    let clickBehavior;

    if (item.id === "clear") {
      clickBehavior = props.clearDisplay;
    } else if (item.id === "equals") {
      clickBehavior = props.calculate;
    } else if (item.id === "backspace") {
      clickBehavior = props.backspace;
    } else if (/[-+÷x]/.exec(item.simb)) {
      clickBehavior = props.handleOperation
    } else {
      clickBehavior = props.handleNumber
    }

    return (
      <button key={item.id} id={item.id} onClick={clickBehavior} className='btn'>
        {item.simb}
      </button>
    );
  });
  return <div className="btns">{Btns}</div>;
};

export default Btns;
