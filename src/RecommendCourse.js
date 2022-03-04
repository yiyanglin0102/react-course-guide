import React, { Component } from 'react';
import './App.css';
import Section from './Section';
import Subsection from './Subsection';

class RecommendCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Section key={this.props.data.name + " recommendSec"} data={this.props.data} compactMode={this.props.compactMode} />
        <Subsection key={this.props.data.name + " recommendSub"} data={this.props.data} compactMode={this.props.compactMode} />
      </div>
    )
  }
}

export default RecommendCourse;

