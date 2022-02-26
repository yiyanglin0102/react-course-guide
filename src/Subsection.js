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
    var discussions = section[choice].subsections;
    return Object.keys(discussions).map((key, index) => {
      return (
        <tr key={this.props.data.number + choice + key + index}>
          <td >{discussions[key].number}</td>
          <td >{discussions[key].location}</td>
          <td >{Object.entries(discussions[key].time).join(" ; ")}</td>
        </tr>
      )
    })
  }
  render() {
    return <div>
     {!this.props.compactMode && <div>
      <h6># Discussions ################################</h6>
      {this.renderTableData()}
      </div>}
    </div>;
  }
}

export default Subsection;
