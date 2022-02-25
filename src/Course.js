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
    }
  }

  render() {
    return (
      <div>
        <Button 
        onClick={
          () => {
            this.props.addCart(this.props.data)
          }
        }
        >Add to Cart</Button>
        
        <Button 
        onClick={
          () => {
            this.props.removeCart(this.props.data)
            // console.log(this.props.data);
          }
        }
        >remove from Cart</Button>

        <h6>###########################################</h6>
        <Section data={this.props.data} />
        <h6># Discussions ################################</h6>
        <Subsection data={this.props.data} />
        <h6>###########################################</h6>
      </div>
    )
  }
}

export default Course;

