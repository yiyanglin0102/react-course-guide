import React, { Component } from "react";
import "./App.css";
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
    return <div className="text-center">{this.getInterests()}</div>;
  }
}
export default InterestsArea;