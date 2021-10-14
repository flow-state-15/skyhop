import "./UpdateListing.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateListingCreator } from "../../store/listings";
import { useHistory, useParams } from "react-router-dom";

const UpdateListing = () => {
  const { listing_id } = useParams()
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [location, setLocation] = useState("");
  const [img_url, setImg_url] = useState("");
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []

    if(!title) errors.push("Please enter a Title")
    if(!description) errors.push("Listing must have a description")
    if(!category_id) errors.push("Please select a category")
    if(!location) errors.push("Please provide an airport")
    if(!img_url) errors.push("Your listing needs a valid image url")

    setValidationErrors(errors)

  }, [title, description, category_id, location, img_url])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      listing_id,
      title,
      description,
      owner_id: user.id,
      category_id,
      location,
      img_url,
    };

    if(!validationErrors.length !== 0){
      dispatch(updateListingCreator(newListing));
      history.push(`/profile/${user.id}`);
    }
  };

  return (
    <div id="create_listing_component_wrapper">
      <span id='create_listing_banner'>
        Do you want to monetize your aircraft when you don't need them? Through
        The Hanger you can rent your aircraft to rigorously qualified
        instructors and pilots to take advantage of parking downtime.
      </span>
      <div id="form_container">
        <h2>Update this Listing</h2>
        <ul className="errors">
            { (validationErrors.length > 0 ) ?
            validationErrors.map( (error, index) => {
              return <li key={index+error}>{error}</li>
            }) : null }
        </ul>
        <form id='create_listing_form' onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="What are you listing?"
            name="title"
          />
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Describe your listing"
            name="description"
          />
          <label for="category">Choose aircraft category:</label>
          <select
            type="dropdown"
            onChange={(e) => setCategory_id(e.target.value)}
            value={category_id}
            name="category"
          >
            <option value="">--Please choose an option--</option>
            <option value={1}>Single Engine Prop</option>
            <option value={2}>Twin Engine Prop</option>
            <option value={3}>Light Jet</option>
            <option value={4}>Commercial</option>
            <option value={5}>Rotorcraft</option>
            <option value={6}>Other</option>
          </select>
          <label for='location'>Where is your aircraft parked?</label>
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Airport name"
            name="location"
          />
          <input
            type="text"
            onChange={(e) => setImg_url(e.target.value)}
            value={img_url}
            placeholder="Paste your image url here"
            name="img_url"
          />
          <button
            type="submit"
            disabled={validationErrors.length > 0}
          >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateListing;
