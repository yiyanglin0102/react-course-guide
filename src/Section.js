import React, { Component } from "react";
import "./App.css";
import Subsection from "./Subsection.js";

class Section extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  requisiteConvert() {
    if (this.props.data.requisites.length === 0) {
      return "None";
    }
    let requisites = JSON.stringify(this.props.data.requisites).replaceAll('"', '');
    requisites = requisites.slice(1, -1);

    let stack = [];
    let final = "";
    for (let i = 0; i < requisites.length; i++) {
      let x = requisites[i];
      if (x == '[') {
        stack.push(x);
        final += "(";
        continue;
      }
      let check;
      switch (x) {
        case ']':
          check = stack.pop();
          if (requisites[i + 1] === ',') {
            final += ") and ";
            i++;
          }
          break;
        case ',':
          final += ") or (";
          break;
        default:
          final += x;
      }
    }
    final += ')'
    // console.log(requisites);
    // console.log("final : " + final);
    return final;
  }


  render() {
    return <div>
      <div>
        {!this.props.compactMode && <h3>{this.props.data.number} - </h3>}
        <h2>{this.props.data.name}</h2>
        <h5>Credits------------------------------</h5>
        <div>{this.props.data.credits}</div>
        <h5>Subject------------------------------</h5>
        <div>{this.props.data.subject}</div>
        <h5>Description------------------------------</h5>
        <div>{this.props.data.description}</div>

        {!this.props.compactMode && <div>

          <h5>Requisites------------------------------</h5>
          <div>{this.requisiteConvert()}</div>
          <h5>Keywords------------------------------</h5>
          <div>{this.props.data.keywords.map((keyword) => <li>{keyword}</li>)}</div>
          <h5>Sections------------------------------</h5>
          <div>{this.props.data.sections.map((section) =>
            <div>
              <h4>{section.number}</h4>
              <li>Instructor: {section.instructor}
              </li>
              <li>Location: {section.location}
              </li>
              <li>Meeting Time</li>
              <ul>
                <li>{section.location}</li>
                <li>{Object.keys(section.time)}</li>
                <li>{Object.values(section.time)}</li>
              </ul>
            </div>
          )}</div>

        </div>}
        <div>
        </div>
      </div>
    </div>;
  }
}

export default Section;
