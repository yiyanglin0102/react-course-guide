import React from 'react';
import Course from './Course';
import Button from 'react-bootstrap/Button';


class Cart extends React.Component {
  getCourses() {
    console.log("Cart have these courses: ");
    console.log(this.props.data);
    const courses = this.props.data.map((course) => {
      return <div>
        <Button
          onClick={() => this.props.removeCart(course)}
        >Remove from Cart</Button>
        <Course
          ShowAdd={true}
          key={course.name}
          data={course}
          compactMode={this.props.compactMode} />
      </div>;
    });
    return courses;
  }

  render() {
    return <div>{this.getCourses()}</div>;
  }

}

export default Cart;