import Day from "../Day";
import * as React from "react";

export interface IActiveDayContext {
  day: Day;
  setToToday: () => void;
  addDays: (days: number) => void;
}

const ActiveDayContext = React.createContext<IActiveDayContext>({
  day: Day.fromNow(),
  setToToday: () => {},
  addDays: () => {}
});

export class ActiveDayProvider extends React.Component<
  object,
  IActiveDayContext
> {
  private addDays = (numberOfDays: number) => {
    this.setState(prevState => {
      return { day: prevState.day.addDays(numberOfDays) };
    });
  };

  private setToToday = () => {
    this.setState({
      day: Day.fromNow()
    });
  };

  public state = {
    day: Day.fromNow(),
    addDays: this.addDays,
    setToToday: this.setToToday
  };
  public render() {
    return (
      <ActiveDayContext.Provider value={this.state}>
        {this.props.children}
      </ActiveDayContext.Provider>
    );
  }
}

export const ActiveDayConsumer = ActiveDayContext.Consumer;

// const Another = props => (
//   <LearningsContext.Consumer>{learnings => (
//     <Context.Consumer>{activeDay => {
//       const material = learnings.getForDay(activeDay.day);

//     }}</Context.Consumer>
//   )}</LearningsContext.Consumer>
// )
