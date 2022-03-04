import React, { Component } from 'react';
import './App.css';
import Section from './Section';
import Subsection from './Subsection';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Course extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 'Not rated',
      Button1Pressed: false,
      Button2Pressed: false,
      Button3Pressed: false,
      Button4Pressed: false,
      Button5Pressed: false,
      Button1Style: "btn btn-outline-light", 
      Button2Style: "btn btn-outline-light",
      Button3Style: "btn btn-outline-light",
      Button4Style: "btn btn-outline-light",
      Button5Style: "btn btn-outline-light",
    }
    this.setRating1 = this.setRating1.bind(this);
    this.setRating2 = this.setRating2.bind(this);
    this.setRating3 = this.setRating3.bind(this);
    this.setRating4 = this.setRating4.bind(this);
    this.setRating5 = this.setRating5.bind(this);
  }

  setRating1() {
    this.setState({ rating: 1, });
    this.props.data.rating = 1;
    this.props.rating(this.props.data);
    /// dealing with the asyc, the following two setState(s) are not compiling sequentially
    ///https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync
    this.setState({ Button1Pressed: true, Button2Pressed: false, Button3Pressed: false, Button4Pressed: false, Button5Pressed: false, }, () => {
      this.state.Button1Pressed
        ? this.setState({ Button1Style: 'btn btn-danger', Button2Style: "btn btn-outline-light", Button3Style: "btn btn-outline-light", Button4Style: "btn btn-outline-light", Button5Style: "btn btn-outline-light" })
        : this.setState();
    });
  }
  setRating2() {
    this.setState({ rating: 2, });
    this.props.data.rating = 2;
    this.props.rating(this.props.data);

    this.setState({ Button1Pressed: false, Button2Pressed: true, Button3Pressed: false, Button4Pressed: false, Button5Pressed: false, }, () => {
      this.state.Button2Pressed
        ? this.setState({ Button1Style: 'btn btn-danger', Button2Style: 'btn btn-danger', Button3Style: "btn btn-outline-light", Button4Style: "btn btn-outline-light", Button5Style: "btn btn-outline-light" })
        : this.setState();
    });
  }
  setRating3() {
    this.setState({ rating: 3, });
    this.props.data.rating = 3;
    this.props.rating(this.props.data);

    this.setState({ Button1Pressed: false, Button2Pressed: false, Button3Pressed: true, Button4Pressed: false, Button5Pressed: false, }, () => {
      this.state.Button3Pressed
        ? this.setState({ Button1Style: 'btn btn-danger', Button2Style: 'btn btn-danger', Button3Style: 'btn btn-danger', Button4Style: "btn btn-outline-light", Button5Style: "btn btn-outline-light" })
        : this.setState();
    });
  }
  setRating4() {
    this.setState({ rating: 4, });
    this.props.data.rating = 4;
    this.props.rating(this.props.data);
  
    this.setState({ Button1Pressed: false, Button2Pressed: false, Button3Pressed: false, Button4Pressed: true, Button5Pressed: false, }, () => {
      this.state.Button4Pressed
        ? this.setState({ Button1Style: 'btn btn-danger', Button2Style: 'btn btn-danger', Button3Style: 'btn btn-danger', Button4Style: 'btn btn-danger', Button5Style: "btn btn-outline-light" })
        : this.setState();
    });
  }
  setRating5() {
    this.setState({ rating: 5, });
    this.props.data.rating = 5;
    this.props.rating(this.props.data);

    this.setState({ Button1Pressed: false, Button2Pressed: false, Button3Pressed: false, Button4Pressed: false, Button5Pressed: true, }, () => {
      this.state.Button5Pressed
        ? this.setState({ Button1Style: 'btn btn-danger', Button2Style: 'btn btn-danger', Button3Style: 'btn btn-danger', Button4Style: 'btn btn-danger', Button5Style: 'btn btn-danger' })
        : this.setState();
    });
  }

  render() {

    return (
      <Card>
        <Section data={this.props.data} compactMode={this.props.compactMode} />
        <Subsection data={this.props.data} compactMode={this.props.compactMode} />
        {this.props.compactMode && <>
          <h5>Rating: {typeof(this.state.rating)==="number"? <div>{this.state.rating + " Stars"}</div> : <div>Not Rated</div> }</h5>
          <div><Button className={this.state.Button1Style}
            onClick={this.setRating1.bind(this)}
          >★</Button>
          <Button className={this.state.Button2Style}
            onClick={this.setRating2.bind(this)}
          >★</Button>
          <Button className={this.state.Button3Style}
            onClick={this.setRating3.bind(this)}
          >★</Button>
          <Button className={this.state.Button4Style}
            onClick={this.setRating4.bind(this)}
          >★</Button>
          <Button className={this.state.Button5Style}
            onClick={this.setRating5.bind(this)}
          >★</Button></div>
        </>}
      </Card>
    )
  }
}

export default Course;

