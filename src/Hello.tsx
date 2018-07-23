import * as React from "react";

export interface IProps {
  name: string;
}

class Hello extends React.Component<IProps, object> {
  public render() {
    const { name } = this.props;

    return <span>Hello, {name}!</span>;
  }
}

export default Hello;
