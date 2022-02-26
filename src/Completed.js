import React, { Component } from 'react';
import Course from './Course';

class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCourseDetails() {
    let result = [];
    for (let i = 0; i < this.props.completedData.length; i++) {
      for(let j = 0; j < this.props.allData.length; j++)
      {
        if (this.props.allData[j].number === this.props.completedData[i])
        {
          result.push(this.props.allData[j]);
        }
      }
    }
    const courses = result.map((course) => {
      return <Course
        key={course.name}
        data={course}
        compactMode={this.props.compactMode}
      />;
    });
    return courses;
  }

  render() {
    return <div>{this.getCourseDetails()}</div>;
  }

}

export default Completed;