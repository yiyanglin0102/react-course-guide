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
      likeStyle: "btn btn-outline-success",
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
      ? this.setState({ likeStyle:  "btn btn-outline-light" }, () => {
        this.removeRecommender()
      })
      : this.setState({ likeStyle: 'success' }, () => {
        this.addRecommender()
      });
    this.state.likePressed
      ? this.setState({ likePressed: false })
      : this.setState({ likePressed: true });

    // console.log(this.props.name);
  }

  render() {

    return (
      <>
        <Button variant={this.state.likeStyle}
          onClick={this.pressed.bind(this)}
        >{this.props.name}</Button>
      </>
    )
  }
}

export default Interests;
