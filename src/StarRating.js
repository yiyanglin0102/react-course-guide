import React from "react";
import "./App.css";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
class StarRating extends React.Component {

  handleRating(rating) {
    // This function is called when a user clicks on a star.
    // It updates the rating of the course stored in App's state (completedCourses).

    this.props.setRating(this.props.data.number, rating);
  }

  getStars() {
    return Array.from({ length: 5 }).map((star, idx) => {

      let starGlyph = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>;

      if (idx + 1 > this.props.data.rating || !this.props.data.rating) {
        // If the star is not selected, or if there is no rating (rating === 0),
        // then use the empty star.

        starGlyph = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>;
      }

      return (
        <OverlayTrigger
          key={'bottom'}
          placement={'bottom'}
          overlay={
            <Tooltip id={`tooltip-bottom'`}>
              {idx + 1}  Stars</Tooltip>
          }
        >
          <button
            className="star"
            key={idx + 1}
            onClick={() => this.handleRating(idx + 1)}
          >
            {starGlyph}
          </button>
        </OverlayTrigger>
      );
    });
  }

  render() {
    return (
      <div className="mt-1">
        <h6 className="rating">
          Rating:{" "}
          {this.props.data.rating
            ? `${this.props.data.rating} stars`
            : `Not rated`}
        </h6>
        {this.getStars()}
      </div>
    );
  }
}

export default StarRating;
