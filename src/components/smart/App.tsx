import * as React from "react";
import Day from "../../Day";
import AppNavbar from "../dumb/Navbar";
import { ActiveDayProvider } from "../../stores/activeDay";
import { LearningsProvider } from "../../stores/learnings";
import { DayPage } from "../pages/DayPage";

class App extends React.Component {
  public goToNextDay = () => {
    this.setState((state: any) => {
      const date = state.activeDate.day.toDate();
      date.setDate(date.getDate() + 1);
      const newDay = Day.fromDate(date);
      return {
        activeDate: {
          ...state.activeDate,
          day: newDay
        }
      };
    });
  };
  public state = {
    activeDate: {
      day: Day.fromNow(),
      material: "new material",
      toReview: [],
      goToNextDay: this.goToNextDay
    }
  };
  public render() {
    return (
      <LearningsProvider>
        <ActiveDayProvider>
          <AppNavbar />
          <DayPage />
        </ActiveDayProvider>
      </LearningsProvider>
    );
  }
}

export default App;
