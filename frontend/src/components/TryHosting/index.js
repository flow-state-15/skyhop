import "./TryHosting.css";
import { Link } from "react-router-dom";

const TryHosting = () => {
  return (
    <div id="try_hosting_container">
      <div id="try_hosting_text_container">
        <h3 className="try_hosting_text">Try Hosting</h3>
        <p className="try_hosting_text">
          Earn extra income and unlock new opportunites by sharing your aircraft
        </p>
        <Link to="/create-listing">
          <button id="hosting_learn_more_button" className="try_hosting_text">
            Learn More
          </button>
        </Link>
      </div>
      <div id="try_hosting_img_container">
        <img
          id="try_hosting_img"
          src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633987037/shipshape-project/try_hosting_img_1_cloi5b.jpg"
          alt="try hosting"
        />
      </div>
    </div>
  );
};

export default TryHosting;
