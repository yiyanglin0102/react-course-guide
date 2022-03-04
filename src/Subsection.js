import React from "react";
import "./App.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Subsection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  renderTableData() {
    let sections = this.props.data.sections;
    return Object.keys(sections).map((key, index) => {
      return (
        <div style={{
          fontSize: "18px",
          textTransform: "capitalize",
          display: "inline - block",
          margin: "4px 2px",
        }}>
          {this.getDis(sections, key)}
        </div>
      )
    })
  }

  getDis(section, choice) {
    var disc = section[choice].subsections;
    return Object.keys(disc).map((key, index) => {
      return (
        <tr key={this.props.data.number + choice + key + index}>
          <td >{disc[key].number}</td>
          <td >{disc[key].location}</td>
          <td >{Object.entries(disc[key].time).join(" ; ")}</td>
        </tr>
      )
    })
  }
  render() {
    return <div>
      {!this.props.compactMode &&
        <>
          <Button className="btn btn-outline-light" variant="dark" onClick={() => { this.setState({ show: true }) }}>
            <h6>Show Subsections</h6>
          </Button>

          <Modal
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title id="subsection-modal">
                <h5>Subsections</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <table>
                  {this.renderTableData()}
                </table>
              </div>
            </Modal.Body>
          </Modal>
        </>
      }
    </div>;
  }
}

export default Subsection;
