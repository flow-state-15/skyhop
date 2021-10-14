import "./Profile.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserListingsCreator,
  deleteListingCreator,
} from "../../store/listings";
import { Link, useParams } from "react-router-dom";

const Listings = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const user_id = useSelector((state) => state.session?.user?.id);
  let user_listings = useSelector((state) => state.listings?.user_listings);

  // console.log("before: ", user_listings)

  if (user_listings) {
    user_listings = Object.values(user_listings);
  }
  // console.log("after: ", user_listings)

  useEffect(() => {
    dispatch(getUserListingsCreator(user_id));
  }, [user_id]);

  // console.log("**checking state**", user_id);
  // console.log("**checking user_listings**", user_listings);

  const handleClick = (e) => {
    // console.log("**** handleClick event target: ", e.target.value);
    dispatch(deleteListingCreator(user_id, e.target.value));
    dispatch(getUserListingsCreator(user_id));
  };

  if( +params.user_id !== user_id) {
    return (
      <div>
        <span className="unauthorized">
          <h1>
            You are not authorized to view this resource
          </h1>
        </span>
      </div>
    )
  } else return (
    <div id="user_listings_component_wrapper">
      <h2>testing PROFILE component</h2>

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
                onClick={(e) => handleClick(e)}
                value={listing.id}
              >
                Delete this listing
              </button>
              <Link to={`/listings/${listing.id}/update`}>
                <button
                    id='update_listing_button'
                >Update this listing</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listings;
