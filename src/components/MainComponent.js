import React from "react";
import Btns from "./ButtonsComponent";
import { Container, Label, Row } from "reactstrap";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disp: "0",
      prev: "",
      exp: "",
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.backspace = this.backspace.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clearDisplay() {
    this.setState({ disp: `0`, exp: "" });
  }

  backspace() {
    this.setState({
      exp: this.state.disp.slice(0, -1),
      disp: this.state.disp.slice(0, -1),
    });
  }

  handleNumber(e) {
    let input = e.target.innerText;
    const { disp, exp } = this.state;

    const exceededLimitCharacters = this.state.disp.length > 15;
    const MoreThanOnePointInExpression = input === "." && disp.includes(".");
    const MoreThanOneInitialZeroInExpression = input === "0" && disp === "0";

    if (exceededLimitCharacters) return;

    if (MoreThanOnePointInExpression) return;
    else if (MoreThanOneInitialZeroInExpression) return;
    else if (disp === "0") {
      this.setState({ disp: input, exp: exp + input });
    } else {
      this.setState({
        disp: disp + input,
        exp: exp + input,
      });
    }
  }

  handleOperation(e) {
    let { exp } = this.state;
    let operator = e.target.innerText;

    operator = operator.replace(/[÷]/, "/");
    operator = operator.replace(/[x]/, "*");

    const exceededLimitCharacters = this.state.disp.length > 15;

    if (exceededLimitCharacters) return;

    this.setState({
      exp: exp + operator,
      disp: operator,
    });
  }

  calculate() {
    let { exp } = this.state;
    const startWitchOperator = /^[/*+-]+/.test(exp);
    const endsWithOperator = /[x+‑/]+$/.test(exp);
    const exceededLimitCharacters = this.state.disp.length > 15;

    // If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign)
    exp = exp.replace(/([-+/*]+)([+/*])/g, "$2");

    if (exceededLimitCharacters) return;

    if (!endsWithOperator && !startWitchOperator) {
      const result = eval(exp).toString();
      const formattedRes = result.slice(0, 15);
      this.setState({
        disp: formattedRes,
        exp: formattedRes,
      });
    } else {
      alert("Invalid expression");
      this.clearDisplay();
    }
  }

  render() {
    console.log(this.state);
    const LimitError = () => {
      return <div className="error">"number of characters exceeded"</div>;
    };
    return (
      <div className="main">
        <div>
          <Container className="calculator">
            <div>
              <span>||</span>
            </div>
            <Row className="screen">
              <Label className="expression">
                {this.state.disp.length > 15 ? "" : this.state.exp}
              </Label>
              <Label id="display">
                {this.state.disp.length > 15 ? <LimitError /> : this.state.disp}
              </Label>
            </Row>
            <Row>
              <Btns
                clearDisplay={this.clearDisplay}
                handleNumber={this.handleNumber}
                calculate={this.calculate}
                backspace={this.backspace}
                handleOperation={this.handleOperation}
              />
            </Row>
          </Container>
          <div>
            <span className="by">By Bruno Umbelino</span>
          </div>
        </div>
      </div>
    );
  }
}
