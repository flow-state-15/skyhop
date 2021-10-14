import { csrfFetch } from "./csrf";

const All_BOOKINGS = "bookings/getAllBookings";
const GET_BOOKING = "bookings/getOneBooking";
const CREATE_BOOKING = "bookings/createBooking";
const UPDATE_BOOKING = "bookings/createBooking";
const DELETE_BOOKING = "bookings/createBooking";

function toObject(array) {
  const newObject = {};
  for (let i = 0; i < array.length; ++i){
    if (array[i] !== undefined) {
      newObject[array[i].id] = array[i]
    };
  }
  return newObject;
}

//actions
const getAllBookings = (bookings) => {
  return {
    type: All_BOOKINGS,
    all_bookings: toObject(bookings),
  };
};

const getOneBooking = (booking) => {
  return {
    type: GET_BOOKING,
    booking,
  };
};

const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking
  };
};

const updateBooking = (booking) => {
  return {
    type: UPDATE_BOOKING,
    booking
  };
};

const deleteBooking = (booking_id) => {
  return {
    type: DELETE_BOOKING,
    booking_id
  };
};

//action creators
export const getAllBookingsCreator = (user_id) => async (dispatch) => {
    console.log("in getAllBookingsCreator")
  const response = await csrfFetch(`/api/bookings/${user_id}/`);
  const { all_bookings } = await response.json();
  console.log("in getAllBookingsCreator. fetch return after .json(): ", all_bookings)
  dispatch(getAllBookings(all_bookings))
  return all_bookings;
};

export const getOneBookingCreator = (user_id, booking_id) => async dispatch => {
  const response = await fetch(`/api/bookings/${user_id}/${booking_id}`);
  const { booking } = await response.json();
  dispatch(getOneBooking(booking));
  return response;
};

export const createBookingCreator = (form_data) => async (dispatch) => {
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
  const { data } = await response.json();
  if(response.ok) {
    console.log("within createBookingCreator, data: ", data)
    dispatch(createBooking(data))
  } else {
    console.log("!!! createBookingCreator fetch failed !!!", data)
  }
  return data;
};

export const updateBookingCreator = (form_data) => async (dispatch) => {
  console.log("within update booking creator, form_data:", form_data)
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
  if(response.ok) {
    console.log("within updateBookingCreator, data: ", data)
    dispatch(updateBooking(data))
  } else {
    console.log("!!! updateListingCreator fetch failed !!!", data)
  }
  return data;
};

export const deleteBookingCreator = (user_id, booking_id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${user_id}/${booking_id}`, {
    method: "DELETE",
  });
  const status = await response.json();

  dispatch(deleteBooking(booking_id));
  return response;
};

//reducer function
const bookingsReducer = ( state = {} , action) => {
  let newState;
  switch (action.type) {
    case All_BOOKINGS:
      newState = Object.assign({}, state);
      newState.all_bookings = { ...action.all_bookings };
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
      newState.all_bookings[action.booking.id] = { ...action.booking };
      return newState;
    case DELETE_BOOKING:
      newState = Object.assign({}, state);
      console.log("!!! in reducer BEFORE delete, newState: ", newState)
      delete newState.all_bookings[action.booking_id];
      console.log("!!! in reducer after delete, newState: ", newState)
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
