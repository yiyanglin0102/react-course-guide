import React from 'react';
import './App.css';
import Section from './Section';
import Subsection from './Subsection';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Course extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div>
      <h6>###########################################</h6>
        <Section data={this.props.data}/>
        <h6># Discussions ################################</h6>
        <Subsection data={this.props.data}/>
        <h6>###########################################</h6>
      </div>
    )
  }
}

export default Course;

