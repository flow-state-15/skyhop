import { csrfFetch } from "./csrf";

const ALL_BOOKINGS = "bookings/getAllBookings";
const GET_BOOKING = "bookings/getOneBooking";
const CREATE_BOOKING = "bookings/createBooking";
const UPDATE_BOOKING = "bookings/updateBooking";
const DELETE_BOOKING = "bookings/deleteBooking";

function toObject(array) {
  // console.log("IN CONVERTER, ARRAY", array)
  const newObject = {};
  for (let i = 0; i < array.length; ++i) {
    if (array[i] !== undefined) {
      newObject[array[i].id] = array[i];
    }
  }
  // console.log("IN CONVERTER, newObject:", newObject)
  return newObject;
}

//actions
const getAllBookings = (all_bookings) => {
  // console.log("!!! in getAllBookings ACTION: ", all_bookings)
  return {
    type: ALL_BOOKINGS,
    all_bookings,
  };
};

const getOneBooking = (booking) => {
  return {
    type: GET_BOOKING,
    booking,
  };
};

const createBooking = (booking) => {
  booking[booking.data.id] = { ...booking.data };
  const target_object = {};
  target_object[booking.data.id] = { ...booking.data };
  const return_object = {
    type: CREATE_BOOKING,
  };
  return_object.payload = target_object;
  return return_object;
};

const updateBooking = (booking) => {
  // console.log("IN UPDATE booking ACTION: ", booking)
  return {
    type: UPDATE_BOOKING,
    booking,
  };
};

const deleteBooking = (booking_id) => {
  // console.log("IN DELETE BOOKING ACTION, booking_id: ", booking_id);
  return {
    type: DELETE_BOOKING,
    booking_id,
  };
};

//action creators
export const getAllBookingsCreator = (user_id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/bookings/${user_id}/`);
    let { all_bookings } = await response.json();
    // console.log("in getAllBookingsCreator, before conversion: ", all_bookings)
    all_bookings = toObject(all_bookings);
    dispatch(getAllBookings(all_bookings));
    return all_bookings;
   } catch(e) {  }
  // console.log("in getAllBookingsCreator")
};

export const getOneBookingCreator =
  (user_id, booking_id) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/bookings/${user_id}/${booking_id}`);
      const { booking } = await response.json();
      dispatch(getOneBooking(booking));
      return response;

    } catch(e) {

    }
  };

export const createBookingCreator = (form_data) => async (dispatch) => {
  try {
    const { listing_id, renter_id, book_start, book_end } = form_data;
    const response = await csrfFetch(`/api/bookings/${renter_id}/`, {
      method: "POST",
      body: JSON.stringify({
        listing_id,
        renter_id,
        book_start,
        book_end,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(createBooking(data));
    } else {
      // console.log("!!! createBookingCreator fetch failed !!!", data);
    }
    return data;

  } catch(e) {}
};

export const updateBookingCreator = (form_data) => async (dispatch) => {
  try {
    // console.log("within update booking creator, form_data:", form_data)
    const { booking_id, listing_id, renter_id, book_start, book_end } = form_data;
    const response = await csrfFetch(`/api/bookings/${renter_id}/${booking_id}`, {
      method: "PUT",
      body: JSON.stringify({
        booking_id,
        listing_id,
        renter_id,
        book_start,
        book_end,
      }),
    });
    const { data } = await response.json();
    if (response.ok) {
      // console.log("within updateBookingCreator, data: ", data)
      dispatch(updateBooking(data));
    } else {
      // console.log("!!! updateListingCreator fetch failed !!!", data)
    }
    return data;

  } catch(e) {}
};

export const deleteBookingCreator =
  (user_id, booking_id) => async (dispatch) => {
    try {
      // user_id = user_id.toString()
      // console.log("IN DELETE BOOKING CREATOR, user_id, booking_id", user_id, typeof user_id, booking_id, typeof booking_id)
      const response = await csrfFetch(`/api/bookings/${user_id}/${booking_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });

      dispatch(deleteBooking(booking_id));
      return response;


    } catch(e) {}
  };

//reducer function
const bookingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ALL_BOOKINGS:
      // console.log("!!! in bookingsReducer, action: ", action)
      newState = Object.assign({}, state);
      newState.all_bookings = action.all_bookings;
      // console.log("!!! in bookingsReducer, newState: ", newState)
      return newState;
    case GET_BOOKING:
      newState = Object.assign({}, state);
      newState.single_booking = action.booking;
      return newState;
    case UPDATE_BOOKING:
      newState = Object.assign({}, state);
      newState.updated_booking = action.booking;
      return newState;
    case CREATE_BOOKING:
      newState = Object.assign({}, state);
      // console.log("in CREATE_BOOKING switch, state copy: ", newState)
      newState.all_bookings = { ...newState.all_bookings, ...action.payload };
      // console.log("in CREATE_BOOKING switch, state after all_bookings reassigned: ", newState)
      return newState;
    case DELETE_BOOKING:
      newState = Object.assign({}, state);
      // console.log("!!! in reducer BEFORE delete, newState: ", newState)
      delete newState.all_bookings[action.booking_id];
      // console.log("!!! in reducer after delete, newState: ", newState)
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
