import React from 'react';
import Course from './Course';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          cartCourses: [], // The list of added courses to cart
        };
    }
    getCourses() {
        console.log(this.props.data);

        const courses = this.props.data.map((course) => {
          return <Course key={course.name} data={course} callbackFromCourse={this.state.cartCourses}/>;
        });
        return courses;
      }


    render() {
        return  <div>{this.getCourses()}</div>;
    }

}

export default Cart;