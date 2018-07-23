import * as React from "react";
import { FormControl } from "react-bootstrap";
import Day from "../../Day";
import debounce from "lodash/debounce";

interface INewMaterialState {
  material: string;
  isUnsaved: boolean;
}

interface INewMaterialProps {
  savedMaterial: string;
  day: Day;
  onSave: (day: Day, material: string) => void;
}

export default class NewMaterialForm extends React.Component<
  INewMaterialProps,
  INewMaterialState
> {
  public state: INewMaterialState = {
    material: "",
    isUnsaved: false
  };

  private onMaterialChange = (e: React.FormEvent<FormControl>) => {
    this.debouncedSaveChanges();
    this.setState({
      material: (e.target as HTMLTextAreaElement).value,
      isUnsaved: true
    });
  };

  private debouncedSaveChanges = debounce(() => {
    this.saveChanges();
    this.setState({
      isUnsaved: false
    });
  }, 1000);

  public componentWillUnmount() {
    this.debouncedSaveChanges.flush();
  }

  private saveChanges = () => {
    this.props.onSave(this.props.day, this.state.material);
  };

  public render() {
    return (
      <>
        <h3>
          New Material
          {this.state.isUnsaved && (
            <small style={{ paddingLeft: "20px" }}>Saving changes...</small>
          )}
        </h3>
        <form>
          <Inner
            onChange={this.onMaterialChange}
            value={
              this.state.isUnsaved
                ? this.state.material
                : this.props.savedMaterial
            }
          />
        </form>
      </>
    );
  }
}

const Inner = ({
  value,
  onChange
}: {
  value: string;
  onChange: (e: React.FormEvent<FormControl>) => void;
}) => (
  <FormControl
    componentClass="textarea"
    value={value}
    rows={5}
    onChange={onChange}
  />
);
