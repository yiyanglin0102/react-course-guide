import React from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import SearchAndFilter from "./SearchAndFilter";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef(); // Reference to the subject dropdown
    this.minimumCredits = React.createRef(); // Reference to the minimum credits input
    this.maximumCredits = React.createRef(); // Reference to the maximum credits input
    this.search = React.createRef(); // Reference to the search keyword input
  }

  setCourses() {
    // Pass the filter inputs to the searchAndFilter function of the SearchAndFilter class
    const filteredResult = this.searchAndFilter.searchAndFilter(
      this.props.courses,
      this.search.current.value,
      this.subject.current.value,
      this.minimumCredits.current.value,
      this.maximumCredits.current.value
    );

    // Set the filtered courses to the state of the parent component
    this.props.setCourses(filteredResult);
  }

  /**
   * Prevent the user from entering a non-numeric value
   */
  handleCreditsKeyDown(e) {
    if (
      [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ].indexOf(e.key) === -1
    )
      e.preventDefault();
  }

  /**
   * Returns an array of options for the subject dropdown.
   * 
   */
  getSubjectOptions() {
    const subjectOptions = this.props.subjects.map((subject) => {
      return <option key={subject}>{subject}</option>;
    });

    return subjectOptions;
  }

  render() {
    return (
      <Card className="sidebar">
        <Card.Body>
          <Card.Title>Search and Filter</Card.Title>

          {/* Search Filters */}
          <Form>
            {/* Search Keyword */}
            <Form.Group
              controlId="formKeywords"
              className="mb-3"
              onChange={() => this.setCourses()}
            >
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                autoComplete="off"
                ref={this.search}
              />
            </Form.Group>

            {/* Subject Dropdown */}
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                ref={this.subject}
                onChange={() => this.setCourses()}
              >
                {this.getSubjectOptions()}
              </Form.Select>
            </Form.Group>

            {/* Credits */}
            <Form.Label>Credits</Form.Label>
            <div
              className="mb-3"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Form.Group
                controlId="minimumCredits"
                onChange={() => this.setCourses()}
                onKeyDown={(e) => this.handleCreditsKeyDown(e)}
              >
                <Form.Control
                  type="text"
                  placeholder="minimum"
                  autoComplete="off"
                  ref={this.minimumCredits}
                />
              </Form.Group>
              <div style={{ marginLeft: "5px", marginRight: "5px" }}>to</div>
              <Form.Group
                controlId="maximumCredits"
                onChange={() => this.setCourses()}
                onKeyDown={(e) => this.handleCreditsKeyDown(e)}
              >
                <Form.Control
                  type="text"
                  placeholder="maximum"
                  autoComplete="off"
                  ref={this.maximumCredits}
                />
              </Form.Group>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default Sidebar;
