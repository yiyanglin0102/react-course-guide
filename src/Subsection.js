import React from "react";
import "./App.css";

class Subsection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  renderTableData() {
    let sections = this.props.data.sections;
    return Object.keys(sections).map((key, index) => {
      return (
        <div>
          {this.getDis(sections, key)}
        </div>
      )
    })
  }

  getDis(section, choice) {
    var disc = section[choice].subsections;
    return Object.keys(disc).map((key, index) => {
      return (
        <tr key={this.props.data.number + choice + key + index}>
          <td >{disc[key].number}</td>
          <td >{disc[key].location}</td>
          <td >{Object.entries(disc[key].time).join(" ; ")}</td>
        </tr>
      )
    })
  }
  render() {
    return <div>
      {!this.props.compactMode && <div>
        <h5>Subsections</h5>
        <table>
          {this.renderTableData()}
        </table>
      </div>}
    </div>;
  }
}

export default Subsection;
