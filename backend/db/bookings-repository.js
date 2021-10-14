// const { Op } = require("sequelize");
const { Listing } = require("./models");

async function getCategoryListings(category_id) {
  return await Listing.findAll({
    where: {
      category_id: category_id,
    },
  });
}

async function createListing(form_data) {
  const listing = await Listing.create({ ...form_data });
  console.log("******************in create listing listing: ", listing);
  return listing;
}

async function updateListing(form_data) {
  const id = form_data.id;
  delete form_data.id;
  const response = await Listing.update(form_data, {
    where: { id },
    returning: true,
    plain: true,
  });
  return response;
}

module.exports = {
  getCategoryListings,
  createListing,
  updateListing,
};
