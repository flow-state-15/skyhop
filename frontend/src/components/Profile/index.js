import "./Profile.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { restoreUser } from "../../store/session";
import {
  getUserListingsCreator,
  deleteListingCreator,
} from "../../store/listings";
import {
  getAllBookingsCreator,
  deleteBookingCreator,
  updateBookingCreator,
  getOneBookingCreator,
} from "../../store/bookings";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const user_id = useSelector((state) => state?.session?.user?.id);
  let user_listings = useSelector((state) => state?.listings?.user_listings);
  let all_bookings = useSelector((state) => state?.bookings?.all_bookings);
  let single_booking = useSelector((state) => state?.bookings?.single_booking);
  let [count, setCount] = useState(0);
  let [book_start, setBook_start] = useState("");
  let [book_end, setBook_end] = useState("");
  let [dispatched, setDispatched] = useState(false);
  let [update_clicked, setUpdate_click] = useState(false);
  let [booking_id, setBooking_id] = useState('');

  // useEffect( () => {
  //   const restore = async () => {
  //     return await dispatch(restoreUser())
  //   }
  //   const response = restore().json()
  //   console.log('in profile, RUNNING RESTORE, restoreUser response: ', response)
  // }, [])

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
    // dispatch(getOneBookingCreator(user_id, booking_id));
    // console.log("IN USE EFFECT, booking_id:", booking_id)
    return setCount(1);
  }, [count, update_clicked, booking_id, user_id, dispatch]);

  // console.log("**checking state**", user_id);
  // console.log("**checking user_listings**", user_listings);

  const handleDeleteListing = (e) => {
    // console.log("**** handleClick event target: ", e.target.value);
    dispatch(deleteListingCreator(user_id, e.target.value));
    dispatch(getUserListingsCreator(user_id));
    setCount((prev) => prev + 1);
  };

  const handleDeleteBooking = (e) => {
    // console.log("**** handleClick event target: ", e.target.value);
    dispatch(deleteBookingCreator(user_id, e.target.value));
    dispatch(getAllBookingsCreator(user_id));
    setCount((prev) => prev + 1);
  };

  const handleUpdateBooking = (e) => {
    e.preventDefault();
    // dispatch(getOneBookingCreator(user_id, e.target.value));

    book_start = new Date(book_start);
    book_end = new Date(book_end);

    const form_data = {
      booking_id: single_booking?.id,
      listing_id: single_booking?.Listing?.id,
      renter_id: user_id,
      book_start,
      book_end,
    };
    // console.log("!!!! logging form_data", form_data);
    dispatch(updateBookingCreator(form_data));
    dispatch(getAllBookingsCreator(user_id));
    setDispatched(true);
    setCount((prev) => prev + 1);
    setUpdate_click(false);
  };

  if (user_id && user_listings && all_bookings) {

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
                  <h3>{listing?.title}</h3>
                  <p>{listing?.description}</p>
                  <h5>Airport: {listing?.location}</h5>
                  <Link to={`/listings/${listing?.id}`}>
                    <img src={listing?.img_url} alt={listing?.title} />
                  </Link>
                  <button
                    id="delete_listing_button"
                    onClick={(e) => handleDeleteListing(e)}
                    value={listing?.id}
                  >
                    Delete this listing
                  </button>
                  <Link to={`/listings/${listing?.id}/update`}>
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
              <li key={index + booking?.id}>
                <div className="listing_container">
                  <h3>You are booking: </h3>
                  <p>{booking?.Listing?.title}</p>
                  <p>Booking ID: {booking?.id}</p>
                  <Link to={`/listings/${booking?.listing_id}`}>
                    <img src={booking?.Listing?.img_url} alt="" />
                  </Link>

                  <div className="book_start">
                    <span>Your booking starts on:</span>
                    <span>
                      {new Date(booking.book_start).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="book_end">
                    <span>Your booking ends on:</span>
                    <span>
                      {new Date(booking?.book_end).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div>
                    {dispatched ? (
                      <span>You have successfully updated this booking</span>
                    ) : null}
                  </div>

                  <button
                    id="delete_booking_button"
                    onClick={handleDeleteBooking}
                    value={booking?.id}
                  >
                    Delete this booking
                  </button>
                  <button
                    id="update_booking_button"
                    value={booking?.id}
                    onClick={(e) => {
                      dispatch(getOneBookingCreator(user_id, booking?.id));
                      setBooking_id(booking?.id)
                      if (update_clicked) return setUpdate_click(false);
                      setUpdate_click(true);
                    }}
                  >
                    Update this booking
                  </button>
                  {(update_clicked && single_booking?.id === booking?.id) ? (
                    <div>
                      <form
                        className="calendar_container"
                        onSubmit={handleUpdateBooking}
                      >
                        <label for="book_start">Start date:</label>
                        <input
                          type="date"
                          id="book_start"
                          name="book_start"
                          value={book_start}
                          onChange={(e) => setBook_start(e.target.value)}
                        />
                        <label for="book_end">End date:</label>
                        <input
                          type="date"
                          id="book_end"
                          name="book_end"
                          value={book_end}
                          onChange={(e) => setBook_end(e.target.value)}
                        />
                        <button
                          id="booking_update_button"
                          type="submit"
                          value={booking?.id}
                          // disabled={()}
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    dispatch(restoreUser())
    return (
      <h3>Loading . . .</h3>
    )
  }
};

export default Profile;
