import "./Profile.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserListingsCreator,
  deleteListingCreator,
} from "../../store/listings";
import {
  getAllBookingsCreator,
  deleteBookingCreator,
} from "../../store/bookings";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const user_id = useSelector((state) => state.session?.user?.id);
  let user_listings = useSelector((state) => state.listings?.user_listings);
  let all_bookings = useSelector((state) => state.bookings?.all_bookings);
  let [count, setCount] = useState(0)

  if (user_listings) {
    user_listings = Object.values(user_listings);
  }
  if (all_bookings) {
    all_bookings = Object.values(all_bookings);
    // console.log("ALL BOOKINGS AFTER IF IN COMPONENT: ", all_bookings)
  }
  // console.log("after: ", user_listings)

  useEffect(() => {
    dispatch(getUserListingsCreator(user_id));
    dispatch(getAllBookingsCreator(user_id));
    return setCount(1)
  }, [count]);

  // console.log("**checking state**", user_id);
  // console.log("**checking user_listings**", user_listings);

  const handleClickListing = (e) => {
    // console.log("**** handleClick event target: ", e.target.value);
    dispatch(deleteListingCreator(user_id, e.target.value));
    dispatch(getUserListingsCreator(user_id));
    setCount(prev => prev + 1)
  };

  const handleDeleteBooking = (e) => {
    // console.log("**** handleClick event target: ", e.target.value);
    dispatch(deleteBookingCreator(user_id, e.target.value));
    dispatch(getAllBookingsCreator(user_id));
    setCount(prev => prev + 1)
  };

  if (+params.user_id !== user_id) {
    return (
      <div>
        <span className="unauthorized">
          <h1>You are not authorized to view this resource</h1>
        </span>
      </div>
    );
  } else
    return (
      <div>
        <div id="user_listings_component_wrapper">
          <h2>Your Listings</h2>

          <ul>
            {user_listings?.map((listing, index) => (
              <li key={index}>
                <div className="listing_container">
                  <h3>{listing.title}</h3>
                  <p>{listing.description}</p>
                  <h5>Airport: {listing.location}</h5>
                  <Link to={`/listings/${listing.id}`}>
                    <img src={listing.img_url} alt={listing.title} />
                  </Link>
                  <button
                    id="delete_listing_button"
                    onClick={(e) => handleClickListing(e)}
                    value={listing.id}
                  >
                    Delete this listing
                  </button>
                  <Link to={`/listings/${listing.id}/update`}>
                    <button id="update_listing_button">
                      Update this listing
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id="user_bookings_component_wrapper">
        <h2>Your Bookings</h2>
          <ul>
            {all_bookings?.map((booking, index) => (
              <li key={index+booking.id}>
                <div className="listing_container">
                  {/* <h3>You are booking: {booking}</h3> */}
                  <h5>Booking ID: {booking.id}</h5>
                  <Link to={`/listings/${booking.listing_id}`}>
                    No Image Yet
                    <img src={``} alt={`improper source atm`} />
                  </Link>

                  {/* <div className="book_start">{new Date(booking.book_start).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                  <div className="book_end">{new Date(booking.book_end).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div> */}

                  <button
                    id="delete_booking_button"
                    onClick={ handleDeleteBooking }
                    value={booking.id}
                  >
                    Delete this booking
                  </button>
                  <Link to={`/bookings/${booking.id}/update`}>
                    <button id="update_booking_button">
                      Update this booking
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <h1>TRYING TO SOLVE GIT MERGE PROBLEM</h1>
      </div>
    );
};

export default Profile;
