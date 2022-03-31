import React from "react";
import "./App.css";
import Course from "./Course";
import Interests from './Interests';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    if (this.props.mode === "cart") {
      // If the mode is cart, then we want to display the courses in the compact view.
      // They should also allow the user to remove the course from the cart.
      courses = this.props.cartCourses.map((course) => (
        <Course
          key={course.number}
          data={course}
          compactView={true}
          cartCourses={this.props.cartCourses}
          addCartCourse={this.props.addCartCourse}
          removeCartCourse={(data) => this.props.removeCartCourse(data)}
          cartMode={true}
          recommendedMode={false}
        />
      ));
    } else {
      // If the mode is completed courses, then we want to display the courses in the compact view.
      // Completed courses should allow the user to give the course a rating.
      if (this.props.mode === "completed") {
        courses = this.props.data.map((course) => (
          <Course
            key={course.number}
            data={course}
            compactView={true}
            ratingMode={true}
            setRating={this.props.setRating}
            recommendedMode={false}
            cartMode={false}
          />
        ));
      } else if (this.props.mode === "interests") {
        const tags = this.props.interestsTags.map((tag) => {
          return <div>
            <Interests
              key={tag}
              name={tag}
              addRecommender={this.props.addRecommender}
              removeRecommender={this.props.removeRecommender}
              interestsMode={true}
              recommendedMode={false}
              cartMode={false}
            />
          </div>;
        });
        return tags;
      }
      else if (this.props.mode === "recommended") {
        courses = this.props.data.map((course) => (
          <Course
            key={course.number}
            data={course}
            compactView={true}
            recommendedMode={true}
            cartMode={false}
          />
        ));
      }
      else {
        // If no mode is specified, then we want to display the courses in the expanded view.
        // The user should be able to add/remove the course to/from the cart.
        courses = this.props.data.map((course) => (
          <Course
            key={course.number}
            data={course}
            compactView={false}
            cartCourses={this.props.cartCourses}
            addCartCourse={this.props.addCartCourse}
            removeCartCourse={this.props.removeCartCourse}
            recommendedMode={false}
            cartMode={false}
          />
        ));
      }
    }

    return courses;
  }

  render() {
    return <div style={{ margin: "5px" }}>{this.getCourses()}</div>;
  }
}

export default CourseArea;
