"use strict";

const { LoremIpsum } = require("lorem-ipsum");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function getRandomNum(min, max) {
  const raw = Math.random() * (max - min) + min;
  return Math.floor(raw);
}

function makeReviews(target) {
  const reviews = [];
  for (let i = 2; i <= target; i++) {
    const randomNum = getRandomNum(2, 6);
    const newReview = {
      booking_id: i,
      title: lorem.generateWords(getRandomNum(3, 7)),
      body: lorem.generateSentences(getRandomNum(3, 7)),
      rating: randomNum,
    };
    reviews.push(newReview);
  }
  return reviews;
}

const seedReviews = [
  {
    booking_id: 1,
    title: "TESTING",
    body: "testing testing lorem ipsum...",
    rating: 5,
  },
  ...makeReviews(15),
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reviews", seedReviews, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
