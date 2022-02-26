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
        <h6>###########################################</h6>
        <Section data={this.props.data} compactMode={this.props.compactMode} />
        <h6># Discussions ################################</h6>
        <Subsection data={this.props.data} compactMode={this.props.compactMode} />
        <h6>###########################################</h6>
      </div>
    )
  }
}

export default Course;

