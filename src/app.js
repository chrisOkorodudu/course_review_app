

// database setup
require('./db');
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');



app.get('/api/reviews', function(req, res) {
  // TODO: retrieve all reviews or use filters coming in from req.query
  // send back as JSON list


  const query = {};
	Object.keys(req.query).forEach((key) => {
		if (req.query[key]) {
			query[key] = req.query[key];
		}
	});
  Review.find(query , (err, reviews) => {
    if (!err && reviews) {
      res.json(reviews);
    }
  });
});

app.post('/api/review/create', (req, res) => {
  // TODO: create new review... if save succeeds, send back JSON
  // representation of saved object
  const review = new Review({
    name: req.body.name,
    semester: req.body.semester,
    year: req.body.semester,
    review: req.body.review
  }).save((err, review) => {
    if (err) {
      console.log('error saving');
      res.json({err: 'UNBALE TO SAVE REVIEW'});
    } else {
      console.log('success');
      res.json(review);
    }

  });


});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log('Connection error');
  }
  console.log('Server started (ctrl + c to shut down)');
});
