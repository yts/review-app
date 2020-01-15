import * as React from "react";
import { Panel, Grid } from "react-bootstrap";
import { ActiveDayConsumer, IActiveDayContext } from "../../stores/activeDay";
import { LearningsConsumer, ILearningsContext } from "../../stores/learnings";
import Day from "../../Day";
import NewMaterialForm from "../dumb/NewMaterialForm";
import DayPageNavigation from "../dumb/DayPageNavigation";

interface IReviewProps {
  day: Day;
}

const Review: React.SFC<IReviewProps> = props => (
  <LearningsConsumer>
    {learnings => {
      const reviewables = learnings.getReviewablesForDay(props.day);
      return (
        !!reviewables.length && (
          <>
            <h3>To Review</h3>
            {reviewables.map(reviewable => (
              <Panel key={reviewable.day.value()}>
                <Panel.Heading>{reviewable.day.toString()}</Panel.Heading>
                <Panel.Body style={{ whiteSpace: "pre-line" }}>
                  {reviewable.material}
                </Panel.Body>
              </Panel>
            ))}
          </>
        )
      );
    }}
  </LearningsConsumer>
);

export class DayPage extends React.Component {
  private learnings: ILearningsContext;
  private activeDay: IActiveDayContext;

  private saveMaterial = (day: Day, material: string) =>
    this.learnings.setMaterialForDay(day, material);

  private goToPreviousDay = () => this.activeDay.addDays(-1);

  private goToNextDay = () => this.activeDay.addDays(1);

  private goToToday = () => this.activeDay.setToToday();

  public render() {
    return (
      <LearningsConsumer>
        {learnings => (
          <ActiveDayConsumer>
            {activeDay => {
              this.activeDay = activeDay;
              this.learnings = learnings;
              const material = learnings.getForDay(activeDay.day).material;
              return (
                <Grid>
                  <h2>{activeDay.day.toString()}</h2>
                  <DayPageNavigation
                    onNext={this.goToNextDay}
                    onPrev={this.goToPreviousDay}
                    onReset={this.goToToday}
                  />
                  <NewMaterialForm
                    key={activeDay.day.value()}
                    day={activeDay.day}
                    savedMaterial={material}
                    onSave={this.saveMaterial}
                  />
                  <Review day={activeDay.day} />
                </Grid>
              );
            }}
          </ActiveDayConsumer>
        )}
      </LearningsConsumer>
    );
  }
}
