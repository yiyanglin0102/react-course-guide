import React, { Component } from 'react';
import './App.css';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Interests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      likePressed: false,
      likeStyle: "btn btn-outline-info",
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
      ? this.setState({ likeStyle: "btn btn-outline-light" }, () => {
        this.removeRecommender()
      })
      : this.setState({ likeStyle: 'primary' }, () => {
        this.addRecommender()
      });
    this.state.likePressed
      ? this.setState({ likePressed: false })
      : this.setState({ likePressed: true });
  }

  render() {

    return (
      <Card>
        <Button
          className="rounded-circle"
          size="lg"
          variant={this.state.likeStyle}
          onClick={this.pressed.bind(this)}
          style={{
            border: "none",
            padding: "20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline - block",
            fontSize: "30px",
            margin: "4px 2px",
            borderRadius: "20%",
            textTransform: "capitalize",
          }}
        >{this.props.name}</Button>
      </Card>
    )
  }
}

export default Interests;
