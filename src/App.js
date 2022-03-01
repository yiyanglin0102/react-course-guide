import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import Cart from "./Cart";
import Completed from "./Completed";
import InterestsArea from "./InterestsArea";
import Recommended from "./Recommended";

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
      completedRating: [],
      ratingCount: 'Course',
      interestsTags: [], // All unique values of keywords in each course
      recommendedCourses: [],
    };
    this.addCourseCart = this.addCourseCart.bind(this);
    this.removeCourseCart = this.removeCourseCart.bind(this);
    this.rating = this.rating.bind(this);
    this.addRecommender = this.addRecommender.bind(this);
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
        this.setState({ interestsTags: interestsCollections, }, () => {
          // console.log(this.state.interestsTags)
        });
      })
      .catch((err) => console.log(err));

    // Fetch the completed courses from the server.
    fetch("https://cs571.cs.wisc.edu/api/react/students/5022025924/classes/completed")
      .then((res) => res.json())
      .then((data) => {
        // Notice that completed courses are returned
        // as a list of course numbers, not course objects.
        this.setState({
          completedCourses: data.data,
          ratingCount: data.data.length,
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
    for (let i = 0; i < updatedCart.length; i++) {
      if (updatedCart[i].number === course.number) {
        return;
      }
    }
    updatedCart.push(course);
    console.log(course);
    this.setState({ cart: updatedCart });  //override the original cart
  }

  removeCourseCart(course) {
    let updatedCart = [...this.state.cart]; //copy the original Cart
    updatedCart = updatedCart.filter(function (item) {
      return item !== course
    })
    this.setState({ cart: updatedCart }); //override the original cart
  }

  rating(course) {
    let updatedCart = [...this.state.completedRating]; //copy the original Cart
    updatedCart = updatedCart.filter(item => item.name !== course.name);
    updatedCart.push({
      key: course.name,
      name: course.name,
      rating: course.rating,
    });


    //https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync
    this.setState({ completedRating: updatedCart, }, () => {
      this.setState({ ratingCount: this.state.completedCourses.length - this.state.completedRating.length });
    });
  }

  //input keyword and search all courses wih this keyword and push to recommendedCourses array
  addRecommender(tagName) {
    console.log(tagName);
    let updatedRecommender = [...this.state.recommendedCourses]; //copy the original Cart
    for (let i = 0; i < this.state.allCourses.length; i++) {
      for (let j = 0; j < this.state.allCourses[i].keywords.length; j++) {
        if (this.state.allCourses[i].keywords[j] === tagName) {
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
        <Tabs
          defaultActiveKey="interests"
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
                recommenderMode={false}
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
                compactMode={false}
                recommenderMode={false}
              />

            </div>
          </Tab>

          {/* Completed Courses Tab */}
          <Tab eventKey="completedCourses" title={"Completed Courses (" + (this.state.ratingCount) + " needs rating)"} style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              {/* Put your component for the completed courses feature here. */}
              {/* Or, can you think of a way to reuse the CourseArea component? */}

              <Completed
                completedData={this.state.completedCourses}
                allData={this.state.allCourses}
                compactMode={true}
                recommenderMode={false}
                rating={this.rating}
              />

            </div>
            {/* Interests Tab */}
          </Tab>
          <Tab eventKey="interests" title={"Interests"} style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              {/* Put your component for the completed courses feature here. */}
              {/* Or, can you think of a way to reuse the CourseArea component? */}

              <InterestsArea
                interestsTags={this.state.interestsTags}
                addRecommender={this.addRecommender}
              />

            </div>
          </Tab>

          {/* Course Recommender  */}
          <Tab eventKey="recommnder" title="Recommended Courses" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              {/* Put your component for the cart feature here. */}
              {/* Or, can you think of a way to reuse the CourseArea component?  */}

              <Recommended
                data={this.state.recommendedCourses}
                compactMode={true}
                recommenderMode={true}
              />

            </div>
          </Tab>

        </Tabs>
      </>
    );
  }
}

export default App;
