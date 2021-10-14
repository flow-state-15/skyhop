const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { process } = require("../../utils/process");
const ListingsRepository = require("../../db/listings-repository");

const router = express.Router();

console.log(ListingsRepository);

router.get(
  "/:category_id",
  asyncHandler(async (req, res, next) => {
    const category_id = req.params.category_id;

    console.log("in endpoint, param: ", category_id, typeof category_id);

    const listings = await ListingsRepository.getCategoryListings(category_id);
    return res.json({
      listings,
    });
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const form_data = req.body;
    const response = await ListingsRepository.createListing(form_data);
    // const data = await response.json()
    console.log(
      "** !!! in listings post route, return from listing repo: ",
      response
    );
    return res.json({
      data: response.dataValues,
    });
  })
);

router.put(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const form_data = req.body;
    const response = await ListingsRepository.createListing(form_data);
    // const data = await response.json()
    console.log(
      "** !!! in listings post route, return from listing repo: ",
      response
    );
    return res.json({
      data: response.dataValues,
    });
  })
);

router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const form_data = req.body;
    const response = await ListingsRepository.createListing(form_data);
    // const data = await response.json()
    console.log(
      "** !!! in listings post route, return from listing repo: ",
      response
    );
    return res.json({
      data: response.dataValues,
    });
  })
);

module.exports = router;
