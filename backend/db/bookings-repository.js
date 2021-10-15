const { Op } = require("sequelize");
const { Booking } = require("./models");

async function getAllBookings(renter_id) {
  // console.log("!!! in getAllBookings !!!")
  const bookings = await Booking.findAll({
    where: {
      renter_id: renter_id,
    },
  });

  // console.log("*** in getAllBookings repo, bookings: ", bookings)

  return bookings
}

async function getBooking(booking_id) {
  return await Booking.findByPk(booking_id);
}

async function createBooking(form_data) {
  const newBooking = await Booking.create({ ...form_data });
  // console.log("******************in booking repo, newBooking: ", newBooking);
  return newBooking;
}

async function updateBooking(form_data) {
  const id = form_data.booking_id;
  delete form_data.booking_id;
  const response = await Booking.update(form_data, {
    where: { id },
    returning: true,
    plain: true,
  });
  return response;
}

async function deleteBooking(booking_id) {
  // console.log("***************", booking_id ,"*******************")
  const booking = await Booking.findByPk(booking_id)

  const response = await booking.destroy()

  // const response = await Booking.destroy({
  //   where: { id: booking_id }
  // });

  if (!response) return false
  return true
}

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
