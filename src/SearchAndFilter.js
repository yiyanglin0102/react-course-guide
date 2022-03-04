/**
 * A class used by Sidebar component to handle the search and filter functionality.
 *
 * Implement your own search and filter functionality here.
 *
 */

class SearchAndFilter {

  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {

    let search1 = search.toLowerCase().trim();
    
    if (minimumCredits === '') {
      minimumCredits = 0;
    }
    if (maximumCredits === '') {
      maximumCredits = 1000;
    }

    let collections = []

    for (let i = 0; i < Object.keys(courses).length; i++) {
      let check = false;
      let courseNumber = courses[i].number.toLowerCase();
      let courseDisciption = courses[i].description.toLowerCase();
      let courseKeywords = courses[i].keywords.map(element => {
        return element.toLowerCase();
      });
      if (courseNumber.includes(search1)) {
        check = true;
      }
      else if (courseDisciption.includes(search1)) {
        check = true;
      }
      else if (!check) {
        for (let j = 0; j < courseKeywords.length; j++) {
          if (courseKeywords[j].includes(search1)) {
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