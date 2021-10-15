const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { process } = require("../../utils/process");
const BookingsRepository = require("../../db/bookings-repository");

const router = express.Router();

console.log(BookingsRepository);

router.get(
  "/:user_id/",
  asyncHandler(async (req, res, next) => {
    const renter_id = req.params.user_id;
    // console.log("********** testing /api/bookings/:user_id")

    const all_bookings = await BookingsRepository.getAllBookings(renter_id);
    // console.log("**** in /:user_id/, param: ", renter_id, typeof renter_id, "*** all_bookings: ", all_bookings, typeof all_bookings);
    return res.json({
      all_bookings,
    });
  })
);

//ViewBooking
router.get(
  "/:user_id/:booking_id",
  asyncHandler(async (req, res, next) => {
    const booking_id = req.params.booking_id;
    const booking = await BookingsRepository.getBooking(booking_id);

    // console.log(
    //   "in ViewBooking endpoint: ",
    //   booking,
    //   typeof booking_id
    // );
    return res.json({
      booking,
    });
  })
);

//CreateListing
router.post(
  "/:user_id/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const form_data = req.body;
    const response = await BookingsRepository.createBooking(form_data);
    // const data = await response.json()
    // console.log(
    //   "** !!! in listings POST route, return from listing repo: ",
    //   response
    // );
    return res.json({
      data: response.dataValues,
    });
  })
);

//EditListing
router.put(
  "/:user_id/:booking_id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const form_data = req.body;
    // console.log(
    //   "** !!! in listings PUT route, form_data in req: ",
    //   form_data
    // );
    const response = await BookingsRepository.updateBooking(form_data);
    // const data = await response.json()
    return res.json({
      data: response,
    });
  })
);


router.delete(
  "/:user_id/:booking_id",
  asyncHandler(async (req, res, next) => {
    console.log("!!! IN BOOKINGS DELETE ROUTE !!!")
    const booking_id = req.params.booking_id;
    const response = await BookingsRepository.deleteBooking(booking_id);
    // const data = await response.json()
    // console.log(
    //   "** !!! in bookings DELETE route, return from bookings repo: ",
    //   response
    // );
    if(response) {
      return res.json({
        status: response
      })
    } else { console.log(" !!! DELETE FAILED !!! ") }
  })
);

module.exports = router;
