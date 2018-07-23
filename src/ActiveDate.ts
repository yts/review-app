import * as React from "react";
import Day from "./Day";
export const ActiveDateContext = React.createContext<IActiveDate>({
  day: Day.fromNow(),
  goToNextDay: () => {
    localStorage.setItem("hi", "bye");
  },
  //   goToPrevDay: () => {},
  //   goToToday: () => {},
  material: "",
  toReview: []
});

export interface IActiveDate {
  day: Day;
  material: string;
  toReview: IReviewable[];
  goToNextDay: () => void;
  //   goToPrevDay: () => void;
  //   goToToday: () => void;
}

export interface IReviewable {
  day: Day;
  material: string;
}
