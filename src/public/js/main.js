// TODO: add client side code for single page application


function getReviews() {

  const req = new XMLHttpRequest();
  // const container = document.createElement('div');

  req.open('GET', '/api/reviews');
  req.addEventListener('load', () => {
    console.log(req.responseText);

    const reviews = JSON.parse(req.responseText);
    const table = document.querySelector('tbody');

    for (const review of reviews) {
      const row = document.createElement('tr');

      Object.keys(review).forEach((key) => {
        if (key !== '_id') {
          const data = document.createElement('td');
          data.textContent = review[key];
          row.appendChild(data);
        }
      });

      table.appendChild(row);
    }
  });

  req.send();
}

function filter(evt) {
  evt.preventDefault();
  const semester = document.getElementById('filterSemester').value;
  const year = document.getElementById('filterYear').value;
  const query = '?semester='+semester + '&year=' + year;

  const req = new XMLHttpRequest();

  req.open('GET', 'api/reviews/' + query);
  req.addEventListener('load', () => {
    console.log("Response Text: " + req.responseText);
    const reviews = JSON.parse(req.responseText);
    const table = document.querySelector('tbody');
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    for (const review of reviews) {
      const row = document.createElement('tr');

      Object.keys(review).forEach((key) => {
        if (key !== '_id') {
          const data = document.createElement('td');
          data.textContent = review[key];
          row.appendChild(data);
        }
      });

      table.appendChild(row);
    }
  });

  req.send();
}

function addReview(evt) {
  console.log('clicked');
  evt.preventDefault();


  const review = {
    name: document.getElementById('name').value,
    semester: document.getElementById('semester').value,
    year: document.getElementById('year').value,
    review: document.getElementById('review').value
  };


  const req = new XMLHttpRequest();
  req.open('POST', 'api/review/create', true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.send({name: review.name, semester: review.semester, year: review.year, review: review.review});

}



function main() {
  getReviews();

  const filterButton = document.getElementById('filterBtn');
  filterButton.addEventListener('click', filter);

  const addButton = document.getElementById('addBtn');
  addButton.addEventListener('click', addReview);


}

document.addEventListener("DOMContentLoaded", main);
