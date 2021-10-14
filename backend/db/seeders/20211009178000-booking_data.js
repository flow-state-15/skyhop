"use strict";

function setFutureDate(days) {
  const today = new Date();
  const future = new Date(today);
  future.setDate(future.getDate() + days);
  return future;
}

function getRandomNum(min, max) {
  const raw = Math.random() * (max - min) + min;
  return Math.floor(raw);
}

function makeBookings(target) {
  const bookings = [];
  for (let i = 2; i <= target; i++) {
    const randomNum = getRandomNum(10, 180);
    const newBooking = {
      listing_id: i,
      renter_id: i,
      book_start: setFutureDate(randomNum),
      book_end: setFutureDate(randomNum + 3),
    };
    bookings.push(newBooking);
  }
  return bookings;
}

const seedBookings = [
  {
    listing_id: 1,
    renter_id: 1,
    book_start: new Date(),
    book_end: setFutureDate(2),
  },
  ...makeBookings(20),
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", seedBookings, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookings", null, {});
  },
};
