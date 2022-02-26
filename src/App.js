import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import Cart from "./Cart";


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
      completedCourses: [], // The list of *course numbers* of completed courses.
      cart: [], // The list of added courses to cart
    };
    this.addCourseCart = this.addCourseCart.bind(this);
    this.removeCourseCart = this.removeCourseCart.bind(this);
  }

  /**
   * When the component mounts, fetch the classes data from the server.
   * Save the data in the state.
   *
   */
  componentDidMount() {
    // Fetch all the courses from the server
    fetch("https://cs571-course-guide.herokuapp.com/api/react/classes")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        });
      })
      .catch((err) => console.log(err));

    // Fetch the completed courses from the server.
    fetch("https://cs571-course-guide.herokuapp.com/api/react/students/5022025924/classes/completed")
      .then((res) => res.json())
      .then((data) => {
        // Notice that completed courses are returned
        // as a list of course numbers, not course objects.
        this.setState({
          completedCourses: data.data,
        });
      })
      .catch((err) => console.log(err));
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

  setCourses(courses) {
    // This is a callback function for the filteredCourses state.
    // Set the courses to be displayed in the CourseArea under Search tab.
    // Refer to the Sidebar component (Sidebar.js) to understand when this is used.
    this.setState({ filteredCourses: courses });
  }

  addCourseCart(course) {
    let updatedCart = [...this.state.cart]; //copy the original Cart
    updatedCart.push(course);
    this.setState({ cart: updatedCart });  //override the original cart
  }

  removeCourseCart(course) {

    let updatedCart = [...this.state.cart]; //copy the original Cart
    updatedCart = updatedCart.filter(function (item) {
      return item !== course
    })
    this.setState({ cart: updatedCart }); //override the original cart
  }

  render() {
    return (
      <>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "#313854",
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
                compactMode={false} // Optionally, you could use this prop in the future for Cart and Completed Courses?
                addCart={this.addCourseCart}
                removeCart={this.removeCourseCart}
              />
            </div>
          </Tab>

          {/* Cart Tab */}
          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              {/* Put your component for the cart feature here. */}
              {/* Or, can you think of a way to reuse the CourseArea component?  */}

              <Cart data={this.state.cart}
                // addCart={this.addCourseCart}
                removeCart={this.removeCourseCart}
              />

            </div>
          </Tab>

          {/* Completed Courses Tab */}
          <Tab eventKey="completedCourses" title="Completed Courses" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              {/* Put your component for the completed courses feature here. */}
              {/* Or, can you think of a way to reuse the CourseArea component? */}
            </div>
          </Tab>

        </Tabs>
      </>
    );
  }
}

export default App;
