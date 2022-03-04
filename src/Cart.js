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
    const courses = this.props.data.map((course) => {
      return <Card>
        <Course
          key={course.name}
          data={course}
          compactMode={this.props.compactMode}
          ratingMode={this.props.ratingMode} />
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