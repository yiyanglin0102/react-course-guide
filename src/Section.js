import React, { Component } from "react";
import "./App.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Section extends Component {

  constructor(props) {
    super(props);
    this.state = {
      secShow: false,
    }
  }

  requisiteConvert() {
    if (this.props.data.requisites.length === 0) {
      return "None";
    }

    let requisites = this.props.data.requisites;
    let outterArray = [];
    for (let i = 0; i < requisites.length; i++) {
      let innerArray = "(";
      innerArray += requisites[i].join(' OR ');
      innerArray += ")";
      outterArray.push(innerArray);
    }
    return outterArray.join(' AND ');
  }

  render() {
    return <div>
      <div>
        {!this.props.compactMode && <h3>{this.props.data.number} - </h3>}
        <h2>{this.props.data.name}</h2>
        <h5>Credits</h5>
        <div>{this.props.data.credits}</div>
        <h5>Subject</h5>
        <div>{this.props.data.subject}</div>
        <h5>Description</h5>
        <div>{this.props.data.description}</div>

        {!this.props.compactMode && <div>

          <h5>Requisites</h5>
          <div>{this.requisiteConvert()}</div>
          <h5>Keywords</h5>
          <div>{this.props.data.keywords.join(", ")}</div>

          <Button className="btn btn-outline-light" variant="dark" onClick={() => { this.setState({ secShow: true }) }}>
            <h6>Show Sections</h6>
          </Button>

          <Modal
            show={this.state.secShow}
            onHide={() => this.setState({ secShow: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title id="section-modal">
                <h5>Sections</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{
                fontSize: "18px",
                textTransform: "capitalize",
                display: "inline - block",
                margin: "4px 2px",
              }}>{this.props.data.sections.map((section) =>
                <div>
                  <h6>{section.number}</h6>
                  <li>Instructor: {section.instructor}
                  </li>
                  <li>Location: {section.location}
                  </li>
                  <li>Meeting Time</li>
                  <ul>
                    <table>
                      <li style={{ listStyleType: "none" }}>{Object.keys(section.time).join(" ")}</li>
                      <li style={{ listStyleType: "none" }}>{Object.values(section.time).join(" ")}</li>
                    </table>
                  </ul>

                </div>
              )}</div>
            </Modal.Body>
          </Modal>
        </div>}
        <div>
        </div>
      </div>
    </div>;
  }
}

export default Section;
