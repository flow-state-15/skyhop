import { csrfFetch } from "./csrf";

const CATEGORY_LISTINGS = "listings/getCategoryListings";
const USER_LISTINGS = "listings/getUserListings";
const CREATE_LISTING = "listings/createListing";
const GET_LISTING = "listings/getOneListing";
const UPDATE_LISTING = "listings/updateListing";
const DELETE_LISTING = "listings/deleteListing";

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
const getCategoryListings = (category_listings) => {
  return {
    type: CATEGORY_LISTINGS,
    category_listings,
  };
};

const getUserListings = (user_listings) => {
  return {
    type: USER_LISTINGS,
    user_listings: toObject(user_listings),
  };
};

const getOneListing = (listing) => {
  return {
    type: GET_LISTING,
    listing,
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
  const response = await fetch(`/api/listings/categories/${category_id}`);
  const category_listings = await response.json();
  console.log("in getCategoryListingsCreator. fetch return after .json(): ", category_listings)
  dispatch(getCategoryListings(category_listings))
  return category_listings;
};

export const getUserListingsCreator = (user_id) => async (dispatch) => {
    console.log("in getUserListingsCreator", user_id)
  const response = await csrfFetch(`/api/listings/${user_id}/all`);
  const { listings } = await response.json();
  console.log("in getUserListingsCreator. fetch return after .json(): ", listings)
  dispatch(getUserListings(listings))
  return listings;
};

export const getOneListingCreator = (listing_id) => async dispatch => {
  const response = await fetch(`/api/listings/${listing_id}`);
  const data = await response.json();
  dispatch(getOneListing(data));
  return response;
};

export const createListingCreator = (form_data) => async (dispatch) => {
  const { title, description, owner_id, category_id, location, img_url } = form_data;
  const response = await csrfFetch(`/api/listings/`, {
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

export const updateListingCreator = (form_data) => async (dispatch) => {
  console.log("within update listing creator, form_data:", form_data)
  const { listing_id, title, description, owner_id, category_id, location, img_url } = form_data;
  const response = await csrfFetch(`/api/listings/${owner_id}/${listing_id}`, {
    method: "PUT",
    body: JSON.stringify({
      listing_id,
      title,
      description,
      owner_id,
      category_id,
      location,
      img_url
    }),
  });
  const { data } = await response.json();
  if(response.ok) {
    console.log("within updateListingCreator, data.category_id: ", data)
    dispatch(updateListing(data))
  } else {
    console.log("!!! updateListingCreator fetch failed !!!", data)
  }
  return data;
};

export const deleteListingCreator = (user_id, listing_id) => async dispatch => {
  const response = await csrfFetch(`/api/listings/${user_id}/${listing_id}`, {
    method: "DELETE",
  });
  const status = await response.json();

  dispatch(deleteListing(listing_id));
  return response;
};

//reducer function
const listingsReducer = ( state = {} , action) => {
  let newState;
  switch (action.type) {
    case CATEGORY_LISTINGS:
      newState = Object.assign({}, state);
      newState.category_listings = action.category_listings;
      return newState;
    case USER_LISTINGS:
      newState = Object.assign({}, state);
      newState.user_listings = { ...action.user_listings };
      return newState;
    case GET_LISTING:
      newState = Object.assign({}, state);
      newState.listing = action.listing;
      return newState;
    case UPDATE_LISTING:
      newState = Object.assign({}, state);
      newState.listing = action.listing;
      return newState;
    case CREATE_LISTING:
      newState = action.category_listings;
      return newState;
    case DELETE_LISTING:
      newState = Object.assign({}, state);
      console.log("!!! in reducer BEFORE delete, newState: ", newState)
      delete newState.user_listings[action.listing_id];
      console.log("!!! in reducer after delete, newState: ", newState)
      return newState;
    default:
      return state;
  }
};

export default listingsReducer;
