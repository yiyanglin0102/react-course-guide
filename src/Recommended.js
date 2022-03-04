import React, { Component } from "react";
import "./App.css";
import Course from "./Course";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RecommendCourse from './RecommendCourse'

class Recommended extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getCourses() {
    const courses = this.props.data.map((course) => {
      return <Card>
        <RecommendCourse
          key={course.name}
          data={course}
          compactMode={this.props.compactMode} />
      </Card>;
    });

    return courses;
  }

  render() {
    return <div style={{ margin: "5px" }}>{this.getCourses()}</div>;
  }
}

export default Recommended;
