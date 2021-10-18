// import { useEffect } from 'react'
import { Link } from "react-router-dom";
import "./CategoryTiles.css";

const CategoryTiles = ({ categories }) => {
  // useEffect(() => {

  //     console.log("IN CategoryTiles COMPONENT. categories = ", categories, typeof categories)

  // }, [])

  return (
    <div>
      <h2 id="get_in_the_air">Get in the air</h2>
      <div id="category_tiles_container">
        {categories.map((category, index) => (
          <div key={index} className="category_tile">
            <Link to={`/listings/categories/${category.id}`}>
              <img
                src={category.url}
                alt={category.name}
                className="category_img"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTiles;
