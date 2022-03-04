import React, { Component } from 'react';
import './App.css';
import Section from './Section';
import Subsection from './Subsection';

class SearchCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  render() {
    return (
      <div>
        <div>
          <Section data={this.props.data} compactMode={this.props.compactMode} />
          <Subsection data={this.props.data} compactMode={this.props.compactMode} />
        </div>
      </div>
    )
  }
}

export default SearchCourse;

