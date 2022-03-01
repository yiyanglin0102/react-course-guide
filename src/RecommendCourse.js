import React, { Component } from 'react';
import './App.css';
import Section from './Section';
import Subsection from './Subsection';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class RecommendCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {

    return (
      <div>
        <Section data={this.props.data} compactMode={this.props.compactMode} />
        <Subsection data={this.props.data} compactMode={this.props.compactMode} />

      </div>
    )
  }
}

export default RecommendCourse;

