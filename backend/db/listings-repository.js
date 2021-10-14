// const { Op } = require("sequelize");
const { Listing } = require("./models");

async function getCategoryListings(category_id) {
  return await Listing.findAll({
    where: {
      category_id: category_id,
    },
  });
}

async function getUserListings(user_id) {
  return await Listing.findAll({
    where: {
      owner_id: user_id,
    },
  });
}

async function createListing(form_data) {
  const listing = await Listing.create({...form_data});
  console.log("******************in create listing listing: ", listing)
  return listing;
}

async function updateListing(form_data) {
  const id = form_data.listing_id;
  delete form_data.listing_id;
  const response = await Listing.update(form_data, {
    where: { id },
    returning: true,
    plain: true,
  });
  return response;
}

async function getListing(listing_id) {
  console.log("***************", listing_id ,"*******************")
  return await Listing.findByPk(listing_id);
}

async function deleteListing(listing_id) {
  console.log("***************", listing_id ,"*******************")
  const response = await Listing.destroy({
    where: { id: listing_id }
  });
  if (!response) return false
  return true
}

module.exports = {
  getCategoryListings,
  getUserListings,
  createListing,
  updateListing,
  getListing,
  deleteListing,
};
