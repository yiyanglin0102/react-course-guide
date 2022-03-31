import React from "react";
import "./App.css";
import Section from "./Section";
import StarRating from "./StarRating";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false, // whether the course is expanded (i.e. description is shown) or not
      showModal: false, // whether to display the modal that shows sections and subsections
    };
  }

  getSections() {
    // Maps the sections of the course to a list of Section components
    let sections = [];
    let course = this.props.courseKey;

    for (const section of Object.values(this.props.data.sections)) {
      sections.push(
        <Section
          key={section.number}
          data={section}
          courseKey={course}
          sectionKey={section.number}
        />
      );
    }

    return sections;
  }

  openModal() {
    // Open the modal that shows sections and subsections
    this.setState({ showModal: true });
  }

  closeModal() {
    // Close the modal that shows sections and subsections
    this.setState({ showModal: false });
  }

  setExpanded(value) {
    // Sets the expanded state of the course
    this.setState({ expanded: value });
  }

  getCourseButton() {
    // Returns a button that adds/remove the course to/from the cart
    if (!this.props.cartCourses) return;

    let cartCourses = this.props.cartCourses;
    let course = this.props.data;
    let vr = "outline-primary";

    let buttonOnClick = () => this.addCourse(course);
    let buttonText = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
    </svg>;
    let hoverWords = "Add to Cart";

    if (cartCourses.some((c) => c.number === course.number)) {
      vr = "outline-danger";
      buttonOnClick = () => this.removeCourse(course);
      buttonText = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
      </svg>;
      hoverWords = "Remove from Cart";
    }

    return (
      <OverlayTrigger
        key={'left'}
        placement={'left'}
        overlay={
          <Tooltip id={`tooltip-left'`}>
            {hoverWords}
          </Tooltip>
        }
      >
        <Button className="me-1" variant={vr} onClick={buttonOnClick}>
          {buttonText}
        </Button>
      </OverlayTrigger>
    );
  }

  getExpansionButton() {
    // Returns a button that expands/collapses the course description
    let buttonText = this.state.expanded ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>;
    let hoverWords = this.state.expanded ? "Collapse Description" : "Expand Description";
    let buttonOnClick = () => this.setExpanded(!this.state.expanded);

    return (
      <OverlayTrigger
        key={'top'}
        placement={'top'}
        overlay={
          <Tooltip id={`tooltip-top'`}>
            {hoverWords}
          </Tooltip>
        }
      >
        <Button
          variant="outline-dark"
          onClick={buttonOnClick}
        >
          {buttonText}
        </Button>
      </OverlayTrigger>
    );
  }

  addCourse = () => {
    // Adds the course to the cart
    this.props.addCartCourse(this.props.data);
  };

  removeCourse(course) {
    // Removes the course from the cart
    this.props.removeCartCourse(course);
  }

  getRequisites() {
    // Returns the requisites of the course as a formatted string
    let requisites = this.props.data.requisites;
    let reqList = [];
    let reqString = "";

    if (requisites.length > 0) {
      requisites.forEach((req) => {
        reqList.push("(" + req.join(" OR ") + ")");
      });
    } else {
      reqList.push("None");
    }
    reqString = reqList.join(" AND ");

    return reqString;
  }

  getKeywords() {
    // Returns the keywords of the course as a formatted string
    return this.props.data.keywords.join(", ");
  }

  showStarRating() {
    // Shows the star rating if it's under Completed Courses tab
    if (this.props.ratingMode === true) {
      return (
        <StarRating data={this.props.data} setRating={this.props.setRating} />
      );
    }
  }

  render() {
    let course = this.props.data.number;
    let name = this.props.data.name;
    let credits = this.props.data.credits;
    let description = this.props.data.description;

    return (

      <Card style={{
        backgroundColor: "#FEF5ED",
      }}>

        <Card.Title className="d-flex justify-content-between">
          {name}

          <div>
            {this.getCourseButton()}

            {!this.props.recommendedMode && (this.getExpansionButton())}
            <div>
            </div>
          </div>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {course} · {credits + " Credits"}
        </Card.Subtitle>

        {this.state.expanded && <p>{description}</p>}
        {this.props.recommendedMode && <p>{description}</p>}

        {!this.props.compactView && (
          <>
            <span><strong>Requisites: </strong> {this.getRequisites()}</span>
            <span>
              <u>Keywords:</u> {this.getKeywords()}
            </span>
          </>
        )}

        {/* Completed courses do not have sections/subsections */}
        {(!this.props.ratingMode && !this.props.recommendedMode) && (<Button variant="dark" onClick={() => this.openModal()}>
          View sections and subsections
        </Button>)}


        {/* Star ratings are only shown when it's rendered under Completed Courses tab */}
        {this.props.ratingMode && (
          this.showStarRating())}

        {/* Modal that shows sections and subsections */}
        <Modal
          show={this.state.showModal}
          onHide={() => this.closeModal()}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.data.name}</Modal.Title>
          </Modal.Header>

          <Accordion defaultActiveKey={this.props.data.sections[0].number}>
            {this.getSections()}
          </Accordion>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


      </Card>

    );
  }
}

export default Course;
