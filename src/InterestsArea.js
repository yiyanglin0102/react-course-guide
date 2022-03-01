import React, { Component } from "react";
import "./App.css";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Interests from './Interests';

class InterestsArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getInterests() {
    const tags = this.props.interestsTags.map((tag) => {
      return <div>
        <Interests
          key={tag}
          name={tag} 
          addRecommender={this.props.addRecommender} 
          removeRecommender={this.props.removeRecommender} 
          />
      </div>;
    });

    return tags;
  }

  render() {

    return <div>{this.getInterests()}</div>;
  }
}
export default InterestsArea;