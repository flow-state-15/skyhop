"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

function makeUsers(number) {
  const users = [];
  for (let i = 3; i <= number; i++) {
    const newUsername = faker.internet.userName();
    const newUser = {
      username: newUsername,
      email: faker.internet.email(),
      hashed_password: bcrypt.hashSync(`${newUsername}@${i}`, 1),
    };
    users.push(newUser);
  }
  return users;
}

const seedData = [
  {
    username: "Demo-lition",
    email: "Demo1@demo.demo",
    hashed_password: bcrypt.hashSync("Demo1@demo.demo"),
  },
  {
    username: "Test1@test.test",
    email: "Test1@test.test",
    hashed_password: bcrypt.hashSync("Test1@test.test", 1),
  },
  ...makeUsers(100),
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", seedData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
