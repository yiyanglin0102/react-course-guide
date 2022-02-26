import React, { Component } from "react";
import "./App.css";
import Course from "./Course";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class CourseArea extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getCourses() {
    // 1. Declarative way of returning the courses, using .map().
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map for more details.
    // console.log(this.props.data);
    const courses = this.props.data.map((course) => {
      let WanttoAsk = true;
      return <div>
        <Button
          onClick={() => this.props.addCart(course)}
        >Add to Cart</Button>
        <Button
          onClick={() => this.props.removeCart(course)}
        >Remove from Cart</Button>
        <Course
          key={course.name}
          data={course}
          compactMode={this.props.compactMode} />
      </div>;
    });

    // 2. Imperative way of returning the courses, using for ... of iteration and .push().
    // To use this instead, uncomment the following code and comment the above code.
    // let courses = [];

    // for(const course of this.props.data) {
    //   courses.push (
    //     <Course key={course.name} data={course}/>
    //   )
    // }

    return courses;
  }

  render() {
    return <div style={{ margin: "5px" }}>{this.getCourses()}</div>;
  }
}

export default CourseArea;
