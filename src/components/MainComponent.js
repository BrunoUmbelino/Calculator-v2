import React from "react";
import Btns from "./ButtonsComponent";
import { Col, Container, Label, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setNumberInExpression,
  addNumberInExpression,
  addOperatorInExpression,
  setResult,
  backSpaceExpression,
  clearState,
} from "../redux/calculatorSlice";

export const Main = () => {
  const expression = useSelector((state) => state.expression);
  const display = useSelector((state) => state.display);

  const exceededLimitCharacters = display.length > 15;

  const dispatch = useDispatch();

  const reset = () => {
    dispatch(clearState());
  };

  const backspace = () => {
    dispatch(backSpaceExpression());
  };

  const handleNumber = (e) => {
    if (!exceededLimitCharacters) {
      let input = e.target.innerText;

      const MoreThanOnePointInExpression =
        input === "." && display.includes(".");
      const MoreThanOneInitialZeroInExpression =
        input === "0" && display === "0";

      if (MoreThanOnePointInExpression) return;
      else if (MoreThanOneInitialZeroInExpression) return;
      else if (display === "0") {
        dispatch(setNumberInExpression(input));
      } else {
        dispatch(addNumberInExpression(input));
      }
    }
  };

  const handleOperation = (e) => {
    if (!exceededLimitCharacters) {
      let operator = e.target.innerText;
      operator = operator.replace(/[÷]/, "/");
      operator = operator.replace(/[x]/, "*");

      dispatch(addOperatorInExpression(operator));
    }
  };

  const calculate = () => {
    if (!exceededLimitCharacters) {
      let exp = expression;
      const startWitchOperator = /^[/*+-]+/.test(exp);
      const endsWithOperator = /[x+‑/]+$/.test(exp);

      // If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign)
      exp = exp.replace(/([-+/*]+)([+/*])/g, "$2");

      if (!endsWithOperator && !startWitchOperator) {
        const result = eval(exp).toString();
        const formattedResult = result.slice(0, 15);
        dispatch(setResult(formattedResult));
      } else {
        alert("Invalid expression");
        reset();
      }
    }
  };

  const LimitError = () => {
    return <div className="error">"number of characters exceeded"</div>;
  };

  return (
    <div className="main">
      <div className="wrap">
        <Container className="calculator">
          <Row>
            <Col>
              <div>
                <span>||</span>
              </div>
              <Row className="screen">
                <Label className="exp">
                  {display.length > 15 ? "" : expression}
                </Label>
                <Label id="display">
                  {display.length > 15 ? <LimitError /> : display}
                </Label>
              </Row>
              <Row>
                <Btns
                  handleNumber={handleNumber}
                  handleOperation={handleOperation}
                  calculate={calculate}
                  backspace={backspace}
                  reset={reset}
                />
              </Row>
            </Col>
          </Row>
        </Container>
        <span className="by">By Bruno Umbelino</span>
      </div>
    </div>
  );
};
