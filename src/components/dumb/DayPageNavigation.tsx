import * as React from "react";
import { Glyphicon, Button, ButtonGroup } from "react-bootstrap";

interface IProps {
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

const DayPageNavigation: React.SFC<IProps> = props => (
  <ButtonGroup>
    <Button onClick={props.onPrev}>
      <Glyphicon glyph="chevron-left" />Previous Day
    </Button>
    <Button onClick={props.onReset}>Today</Button>
    <Button onClick={props.onNext}>
      Next Day
      <Glyphicon glyph="chevron-right" />
    </Button>
  </ButtonGroup>
);

export default DayPageNavigation;
