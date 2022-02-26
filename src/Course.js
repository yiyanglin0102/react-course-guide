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
      SearchClicked: true
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add() {
    this.props.addCart(this.props.data);
    this.setState({ SearchClicked: false, });
  }

  remove() {
    this.props.removeCart(this.props.data);
    this.setState({ SearchClicked: true, });
  }

  render() {
    return (
      <div>
        {this.props.ShowAdd && <Button
          onClick={this.add}>Add to Cart</Button>}

        <Button
          onClick={this.remove}>Remove from Cart</Button>

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

