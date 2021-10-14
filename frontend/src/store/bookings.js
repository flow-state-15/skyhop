import { csrfFetch } from "./csrf";

const CATEGORY_LISTINGS = "listings/getCategoryListings";
const GET_LISTING = "listings/getOneListing";
const CREATE_LISTING = "listings/createListing";
const UPDATE_LISTING = "listings/updateListing";
const DELETE_LISTING = "listings/deleteListing";

//actions
const getCategoryListings = (category_listings) => {
  return {
    type: CATEGORY_LISTINGS,
    category_listings,
  };
};

const getOneListing = (listing_id) => {
  return {
    type: GET_LISTING,
    listing_id,
  };
};

const createListing = (listing) => {
  return {
    type: CREATE_LISTING,
    listing
  };
};

const updateListing = (listing) => {
  return {
    type: UPDATE_LISTING,
    listing
  };
};

const deleteListing = (listing_id) => {
  return {
    type: DELETE_LISTING,
    listing_id
  };
};

//action creators
export const getCategoryListingsCreator = (category_id) => async (dispatch) => {
    console.log("in getCategoryListingsCreator")
  const response = await fetch(`/api/listings/${category_id}`);
  const category_listings = await response.json();
  console.log("in getCategoryListingsCreator. fetch return after .json(): ", category_listings)
  dispatch(getCategoryListings(category_listings))
  return category_listings;
};

export const getOneListingCreator = (listing_id) => async dispatch => {
  const response = await fetch(`/api/listings/${listing_id}`);
  const data = await response.json();
  dispatch(getOneListing(data.user));
  return response;
};

export const createListingCreator = (form_data) => async (dispatch) => {
  const { title, description, owner_id, category_id, location, img_url } = form_data;
  const response = await csrfFetch(`/api/listings`, {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      owner_id,
      category_id,
      location,
      img_url
    }),
  });
  const data = await response.json();
  //returns all listings in created listing's category
  if(response.ok) {
    console.log("within createListingCreator, data.category_id: ", data)
    dispatch(getCategoryListingsCreator(data.data.category_id))
  } else {
    console.log("!!! createListingCreator fetch failed !!!", data)
  }
  return data;
};

//reducer function
const bookingsReducer = ( state = {} , action) => {
  let newState;
  switch (action.type) {
    case CATEGORY_LISTINGS:
      newState = action.category_listings;
      return newState;
    case GET_LISTING:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case CREATE_LISTING:
      newState = action.category_listings;
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
