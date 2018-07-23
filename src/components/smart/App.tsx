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
          {/* <ActiveDateContext.Provider value={this.state.activeDate}>
            <ActiveDateContext.Consumer>
              {activeDate => (
                <>
                  <PageHeader>{activeDate.day.toString()}</PageHeader>
                  <h2>To Review</h2>
                  <Panel>
                    <Panel.Heading>7/12/2018</Panel.Heading>
                    <Panel.Body>
                      <div>Kiddushin 82b - 83a</div>
                      <div>Shulchan Aruch page 23 lines 23 - 35</div>
                    </Panel.Body>
                  </Panel>
                  <Panel>
                    <Panel.Heading>7/8/2018</Panel.Heading>
                    <Panel.Body>
                      <div>Kiddushin 82b - 83a</div>
                      <div>Shulchan Aruch page 23 lines 23 - 35</div>
                    </Panel.Body>
                  </Panel>
                  <h2>Learned Today</h2>
                  <form>
                    <FormControl
                      componentClass="textarea"
                      value={activeDate.material}
                      rows={5}
                    />
                  </form>
                  <ButtonGroup>
                    <Button>
                      <Glyphicon glyph="chevron-left" />Prev
                    </Button>
                    <Button>Today</Button>
                    <Button onClick={activeDate.goToNextDay}>
                      Next
                      <Glyphicon glyph="chevron-right" />
                    </Button>
                  </ButtonGroup>{" "}
                </>
              )}
            </ActiveDateContext.Consumer>
          </ActiveDateContext.Provider> */}
        </ActiveDayProvider>
      </LearningsProvider>
    );
  }
}

export default App;
