import React from 'react';
import Course from './Course';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getCourses() {
    // console.log("Cart have these courses: ");
    // console.log(this.props.data);
    const courses = this.props.data.map((course) => {
      return <Card>
        <Course
          ShowAdd={true}
          key={course.name}
          data={course}
          compactMode={this.props.compactMode} />
        <Button className="btn btn-outline-danger" variant='light'
          onClick={() => this.props.removeCart(course)}
        >Remove from Cart</Button>
      </Card>;
    });
    return courses;
  }

  render() {
    return <div>{this.getCourses()}</div>;
  }

}

export default Cart;