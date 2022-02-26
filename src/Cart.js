import React from 'react';
import Course from './Course';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // cartCourses: [], // The list of added courses to cart
    };
  }
  getCourses() {
    console.log(this.props.data);

    const courses = this.props.data.map((course) => {
      return <Course
        ShowAdd={false}
        key={course.name}
        data={course}
        removeCart={this.props.removeCart} 
      />;
    });
    return courses;
  }

  render() {
    return <div>{this.getCourses()}</div>;
  }

}

export default Cart;