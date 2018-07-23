import Day from "../Day";
import * as React from "react";

// interface ILocalStorageLearning {
//   timestamp: number;
//   material: string;
// }

class Learning {
  constructor(public day: Day = Day.fromNow(), public material: string = "") {}
  public hasValue() {
    return this.material !== "";
  }
}

export interface ILearningsContext {
  learnings: Learning[];

  getForDay: (day: Day) => Learning;
  setMaterialForDay: (day: Day, material: string) => void;
  getReviewablesForDay: (day: Day) => Learning[];
}

export const LearningsContext: React.Context<
  ILearningsContext
> = React.createContext<ILearningsContext>({
  learnings: [],
  getForDay: (day: Day) => new Learning(),
  setMaterialForDay: () => {},
  getReviewablesForDay: () => []
});
export class LearningsProvider extends React.Component<
  object,
  ILearningsContext
> {
  public componentDidMount() {
    const stored: string | null = localStorage.getItem("learnings");
    if (!stored) {
      return;
    }
    const storedLearnings = JSON.parse(stored);
    this.setState({
      learnings: storedLearnings.map(
        (storedLearning: any) =>
          new Learning(new Day(storedLearning.day), storedLearning.material)
      )
    });
  }
  private getLearningForDay = (day: Day): Learning => {
    const foundLearning = this.state.learnings.find(
      learning => learning.day.value() === day.value()
    );
    return foundLearning || new Learning(day);
  };

  private setMaterialForDay = (day: Day, material: string) => {
    this.setState(prevState => {
      const learnings = [
        ...prevState.learnings.filter(
          learning => learning.day.value() !== day.value()
        ),
        new Learning(day, material)
      ];
      this.saveToLocalStorage(learnings);
      return {
        learnings
      };
    });
  };

  private saveToLocalStorage = (learnings: Learning[]) => {
    localStorage.setItem("learnings", JSON.stringify(learnings));
  };

  private getReviewablesForDay = (day: Day) => {
    const reviewDays = [1, 7, 28, 365];
    const reviewables: Learning[] = [];
    reviewDays.forEach(pastDay => {
      const learning = this.getLearningForDay(day.addDays(-pastDay));
      if (learning.hasValue()) {
        reviewables.push(learning);
      }
    });
    return reviewables;
  };

  public state: ILearningsContext = {
    learnings: [
      // new Learning(),
      // new Learning(Day.fromNow().addDays(-1), "learned yesteray"),
      // new Learning(Day.fromNow().addDays(-2), "learned 2 days ago"),
      // new Learning(Day.fromNow().addDays(-7), "learned last week")
    ],
    getForDay: this.getLearningForDay,
    setMaterialForDay: this.setMaterialForDay,
    getReviewablesForDay: this.getReviewablesForDay
  };

  public render() {
    return (
      <LearningsContext.Provider value={this.state}>
        {this.props.children}
      </LearningsContext.Provider>
    );
  }
}

export const LearningsConsumer = LearningsContext.Consumer;
