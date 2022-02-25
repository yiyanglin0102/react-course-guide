/**
 * A class used by Sidebar component to handle the search and filter functionality.
 *
 * Implement your own search and filter functionality here.
 *
 */

class SearchAndFilter {

  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    if (minimumCredits === '') {
      minimumCredits = 0;
    }
    if (maximumCredits === '') {
      maximumCredits = 100;
    }
    let collections = []

    for (let i = 0; i < Object.keys(courses).length; i++) {
      let check = false;

      if (courses[i].number.includes(search)) {
        check = true;
      }
      else if (courses[i].description.includes(search)) {
        check = true;
      }
      else if (!check) {
        for (let j = 0; j < courses[i].keywords.length; j++) {
          if (courses[i].keywords[j].includes(search)) {
            check = true;
          }
        }
      }
      if (check) {
        if (subject === courses[i].subject || subject === 'All') {
          if (parseInt(courses[i].credits) >= parseInt(minimumCredits) && parseInt(courses[i].credits) <= maximumCredits) {
            collections.push(courses[i]);
          }
        }
      }
    }
    return collections;
  }
}

export default SearchAndFilter;