const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { process } = require("../../utils/process");
const ListingsRepository = require("../../db/listings-repository");

const router = express.Router();


//CategoryListings
router.get(
  "/categories/:category_id",
  asyncHandler(async (req, res, next) => {
    const category_id = req.params.category_id;

    console.log("in GET CATEGORIES endpoint, param: ", category_id, typeof category_id);

    const listings = await ListingsRepository.getCategoryListings(category_id);
    return res.json({
      listings,
    });
  })
);

//UserListings
router.get(
  `/:user_id/all`,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.user_id;

    console.log("in GET USER LISTINGS endpoint, user_id: ", user_id, typeof user_id);

    const listings = await ListingsRepository.getUserListings(user_id);
    return res.json({
      listings,
    });
  })
);

//ViewListing
router.get(
  "/:listing_id",
  asyncHandler(async (req, res, next) => {
    const listing_id = req.params.listing_id;
    const listing = await ListingsRepository.getListing(listing_id);

    // console.log(
    //   "in ViewListing endpoint, param: ",
    //   listing,
    //   typeof listing_id
    // );
    return res.json({
      listing,
    });
  })
);

//CreateListing
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const form_data = req.body;
    const response = await ListingsRepository.createListing(form_data);
    // const data = await response.json()
    console.log(
      "** !!! in listings POST route, return from listing repo: ",
      response
    );
    return res.json({
      data: response.dataValues,
    });
  })
);

//EditListing
router.put(
  "/:user_id/:listing_id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const form_data = req.body;
    console.log(
      "** !!! in listings PUT route, form_data in req: ",
      form_data
    );
    const response = await ListingsRepository.updateListing(form_data);
    // const data = await response.json()
    return res.json({
      data: response,
    });
  })
);


router.delete(
  "/:user_id/:listing_id",
  asyncHandler(async (req, res, next) => {
    console.log("!!! IN DELETE ROUTE !!!")
    const listing_id = req.params.listing_id;
    const response = await ListingsRepository.deleteListing(listing_id);
    // const data = await response.json()
    console.log(
      "** !!! in listings DELETE route, return from listing repo: ",
      response
    );
    if(response) {
      return res.json({
        status: response
      })
    } else { console.log(" !!! FETCH FAILED WITH DELETE !!! ") }
  })
);

module.exports = router;
