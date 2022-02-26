import React, { Component } from "react";
import "./App.css";
import Subsection from "./Subsection.js";

class Section extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div>
      <div>
        { !this.props.compactMode && <h3>{this.props.data.number} - </h3>}
        <div>{this.props.data.name}</div>
        <h5>Credits------------------------------</h5>
        <div>{this.props.data.credits}</div>
        <h5>Subject------------------------------</h5>
        <div>{this.props.data.subject}</div>
        <h5>Description------------------------------</h5>
        <div>{this.props.data.description}</div>
        <h5>Requisites------------------------------</h5>
        <div>{this.props.data.requisites.map((requisite) => <li>{requisite}</li>)}</div>
        <h5>Keywords------------------------------</h5>
        <div>{this.props.data.keywords.map((keyword) => <li>{keyword}</li>)}</div>
        <h5>Sections------------------------------</h5>
        <div>{this.props.data.sections.map((section) =>
          <div>
            <h4>{section.number}</h4>
            <li>instructor: {section.instructor}
            </li>
            <li>{section.location}
            </li>
            <li>Meeting Time</li>
            <ul>
              <li>{section.location}</li>
              <li>{Object.keys(section.time)}</li>
              <li>{Object.values(section.time)}</li>
            </ul>
          </div>
        )}</div>
        <div>
        </div>
      </div>
    </div>;
  }
}

export default Section;
