import React, { Component } from 'react';
import './App.css';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Interests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      likePressed: '',
      likeStyle: 'btn-btn-info',
      
    }
    this.pressed = this.pressed.bind(this);
  }

  pressed() {
    this.state.likePressed
    ? this.setState({ likeStyle: 'danger' })
    : this.setState({ likeStyle: 'primary' });
  this.state.likePressed
    ? this.setState({ likePressed: false })
    : this.setState({ likePressed: true });

    console.log(this.props.name);
  }
  
  render() {

    return (
      <div>
          <Button variant={this.state.likeStyle}
            onClick={this.pressed.bind(this)}
          >{this.props.name}</Button>
      </div>
    )
  }
}

export default Interests;

