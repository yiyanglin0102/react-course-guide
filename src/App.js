import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import logo from './UWLogo.svg';
import Navbar from 'react-bootstrap/Navbar';

/**
 * The main application component.
 *
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [], // All the courses fetched from the server.
      filteredCourses: [], // The courses to be displayed in the CourseArea under Search tab.
      subjects: [], // The list of unique subjects fetched from the server.
      completedCourses: [], // The list of completed courses.
      cartCourses: [], // The list of courses in the cart.
      interestsTags: [], // All unique values of keywords in each course
      recommendedCourses: [],
      selectedLikes: [],
    };
  }


  /**
   * When the component mounts, fetch the classes data from the server.
   * Save the data in the state.
   *
   */
  componentDidMount() {
    // Fetch all the courses from the server
    fetch("https://cs571.cs.wisc.edu/api/react/classes")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        });
        let interestsCollections = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].keywords.length; j++) {
            if (!interestsCollections.includes(data[i].keywords[j])) {
              interestsCollections.push(data[i].keywords[j]);
            }
          }
        }
        interestsCollections.sort();
        this.setState({ interestsTags: interestsCollections, });
        return data;
      })
      .then((allCourses) => {
        // fetch all the completed courses
        fetch(
          "https://cs571.cs.wisc.edu/api/react/students/5022025924/classes/completed/"
        )
          .then((res) => res.json())
          .then((completedCourseNumbers) => {
            this.setState({
              completedCourses: completedCourseNumbers.data.map(
                (courseNumber) =>
                  allCourses.find((course) => course.number === courseNumber)
              ),
            });
          });
      })
      .catch((err) => console.log(err));
  }

  // Callback function that adds a new course to the cartCourses state
  addCartCourse = (course) => {
    // Duplicate check
    if (
      this.state.cartCourses.some(
        (cartCourse) => cartCourse.number === course.number
      )
    ) {
      console.log(`${course.number} is already in the cart`);
    } else {
      this.setState({
        cartCourses: [...this.state.cartCourses, course],
      });
    }
  };

  // Callback function that removes a course from the cartCourses state
  removeCartCourse(course) {
    this.setState({
      cartCourses: this.state.cartCourses.filter(
        (cartCourse) => cartCourse.number !== course.number
      ),
    });
  }

  getSubjects(data) {
    // Get all the subjects from the JSON of fetched courses.
    // Return a list of unique subjects.

    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  // Callback function that sets the rating of a course
  setRating(courseNumber, rating) {
    this.setState({
      completedCourses: this.state.completedCourses.map((course) => {
        if (course.number === courseNumber) {
          course.rating = rating;
        }
        return course;
      }),
    });
  }

  // Returns the number of courses that are not rated yet.
  getNumCoursesNeedsRating() {
    const numRatedCourses = this.state.completedCourses.filter(
      (course) => course.rating !== undefined
    ).length;

    return this.state.completedCourses.length - numRatedCourses;
  }

  setCourses(courses) {
    // This is a callback function for the filteredCourses state.
    // Set the courses to be displayed in the CourseArea under Search tab.
    // Refer to the Sidebar component (Sidebar.js) to understand when this is used.
    this.setState({ filteredCourses: courses });
  }
  //input keyword and search all courses wih this keyword and push to recommendedCourses array
  addRecommender(tagName) {
    let updatedLikes = [...this.state.selectedLikes];
    updatedLikes.push(tagName);
    updatedLikes = [...new Set(updatedLikes)];
    this.setState({ selectedLikes: updatedLikes }, () => {
      this.updateRecommendCourses();
    });

  }

  removeRecommender(tagName) {
    let updatedLikes = [...this.state.selectedLikes]; //copy the original Cart
    updatedLikes = updatedLikes.filter(function (item) {
      return item !== tagName
    })
    this.setState({ selectedLikes: updatedLikes }, () => {
      this.updateRecommendCourses();
    });
  }

  updateRecommendCourses() {
    let updatedRecommender = []; //copy the original Cart
    for (let i = 0; i < this.state.allCourses.length; i++) {
      for (let j = 0; j < this.state.selectedLikes.length; j++) {
        if (this.state.allCourses[i].keywords.includes(this.state.selectedLikes[j])) {
          updatedRecommender.push(this.state.allCourses[i]);
        }
      }
    }
    let noDuplicateRecommender = [...new Set(updatedRecommender)];
    this.setState({ recommendedCourses: noDuplicateRecommender });
  }

  render() {
    return (
      <>
        <Navbar
          fixed={'top'}
          className={'position-sticky ps-4'}
          sytle={{ backgroundColor: "black" }}
          expand="sm" bg="dark" variant="dark"
          style={{ justifyContent: "left" }}
        >
          <a href="https://www.wisc.edu/">
            <img src={logo} width="100" height="30" />
          </a>
        </Navbar>
        <>

        </>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "#CE1212",
          }}
        >
          {/* Search Tab */}
          <Tab eventKey="search" title="Search" style={{ paddingTop: "5vh" }}>
            <Sidebar
              setCourses={(courses) => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
            />
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cartCourses={this.state.cartCourses}
                addCartCourse={this.addCartCourse.bind(this)}
                removeCartCourse={this.removeCartCourse.bind(this)}
              />
            </div>
          </Tab>

          {/* Cart Tab */}
          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              <CourseArea
                mode="cart"
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cartCourses={this.state.cartCourses}
                addCartCourse={this.addCartCourse}
                removeCartCourse={this.removeCartCourse.bind(this)}
              />
            </div>
          </Tab>

          {/* Completed Courses Tab */}
          <Tab
            eventKey="completedCourses"
            title={`Completed Courses (${this.getNumCoursesNeedsRating()} needs rating)`}
            style={{ paddingTop: "5vh" }}
          >
            <div style={{ marginLeft: "5vw" }}>
              <CourseArea
                mode="completed"
                data={this.state.completedCourses}
                allData={this.state.allCourses}
                setRating={this.setRating.bind(this)}
              />
            </div>
          </Tab>
          <Tab eventKey="interests" title={"Interests"} style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              <CourseArea
                mode="interests"
                interestsTags={this.state.interestsTags}
                addRecommender={this.addRecommender.bind(this)}
                removeRecommender={this.removeRecommender.bind(this)}
              />
            </div>
          </Tab>
          {/* Course Recommender */}
          <Tab eventKey="recommnder" title="Recommended Courses" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              <CourseArea
                data={this.state.recommendedCourses}
                allData={this.state.allCourses}
                mode="recommended"
              />
            </div>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;
