"use strict";
const faker = require("faker");
const casual = require("casual");
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

function makeListings(target) {
  const listings = [];
  for (let i = 2; i <= target; i++) {
    const newListing = {
      title: lorem.generateWords(getRandomNum(3, 7)),
      description: lorem.generateSentences(getRandomNum(3, 7)),
      owner_id: i,
      category_id: getRandomNum(1, 7),
      location: casual.city,
      img_url:
        "https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633825471/shipshape-project/rental-Sail-boat-Caralina-27feet-Sag_Harbor-NY_8fZXWgw_g0kux2.jpg",
    };
    listings.push(newListing);
  }
  return listings;
}

const seedListings = [
  {
    title: "TESTING LISTINGS SEEDER",
    description: "testing testing lorem ipsum...",
    owner_id: 2,
    category_id: 1,
    location: "Miami",
    img_url:
      "https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633825471/shipshape-project/rental-Sail-boat-Caralina-27feet-Sag_Harbor-NY_8fZXWgw_g0kux2.jpg",
  },
  ...makeListings(20),
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Listings", seedListings, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Listings", null, {});
  },
};
