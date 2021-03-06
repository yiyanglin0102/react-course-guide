import React from "react";
import "./App.css";
import Subsection from "./Subsection.js";
import Accordion from 'react-bootstrap/Accordion'

class Section extends React.Component {
  getTimes() {
    let times = [];
    let sectionTimes = this.props.data.time;

    Object.keys(sectionTimes).forEach(function (day) {
      times.push(
        <li key={day} style={{ listStyleType: "none" }}>
          {day}: {sectionTimes[day]}
        </li>
      );
    });

    return times;
  }

  getSubsections() {
    let subsections = [];
    let course = this.props.courseKey;
    let section = this.props.data.number;
    let subsectionsData = this.props.data.subsections;
    let headingKey = [course, section].join("-");

    if (subsectionsData.length > 0) {
      subsections.push(<h5 key={headingKey} style={{ fontWeight: "bold" }}>Subsections</h5>);
      for (const subsection of Object.values(subsectionsData)) {
        // Check here if Cart data is present, and only push if course subsection is present
        subsections.push(
          <Subsection
            key={subsection.number}
            data={subsection}
            courseKey={course}
            sectionKey={section}
            subsectionKey={subsection.number}
          />
        );
      }
    }

    return subsections;
  }

  render() {
    let section = this.props.data.number;
    let instructor = this.props.data.instructor;
    let location = this.props.data.location;

    return (
      <Accordion.Item eventKey={section}>
        <Accordion.Header>{section}</Accordion.Header>
        <Accordion.Body>
          <li style={{ listStyleType: "none" }}><div style={{ color: "#CE1212", fontSize: "22px", fontWeight: "bold" }}>Instructor</div>{instructor}</li>
          <li style={{ listStyleType: "none" }}><div style={{ color: "#CE1212", fontSize: "22px", fontWeight: "bold" }}>Location</div>{location}</li>
          <li style={{ listStyleType: "none" }}><div style={{ color: "#CE1212", fontSize: "22px", fontWeight: "bold" }}>Meeting Times</div></li>
          <ul style={{
            textTransform: "capitalize",
          }}>{this.getTimes()}</ul>
          <div style={{
            textTransform: "capitalize",
          }}>{this.getSubsections()}</div>
        </Accordion.Body>
      </Accordion.Item>
    );
  }
}

export default Section;
