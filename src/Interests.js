import React, { Component } from 'react';
import './App.css';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Interests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      likePressed: false,
      likeStyle: 'btn-btn-info',
    }
    this.pressed = this.pressed.bind(this);
    this.addRecommender = this.addRecommender.bind(this);
    this.removeRecommender = this.removeRecommender.bind(this);
  }


  addRecommender() {
    this.props.addRecommender(this.props.name);
  }

  removeRecommender() {
    this.props.removeRecommender(this.props.name);
  }

  pressed() {
    this.state.likePressed
      ? this.setState({ likeStyle: 'light' }, () => {
        this.removeRecommender()
      })
      : this.setState({ likeStyle: 'primary' }, () => {
        this.addRecommender()
      });
    this.state.likePressed
      ? this.setState({ likePressed: false })
      : this.setState({ likePressed: true });

    // console.log(this.props.name);
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
