// import { useEffect } from 'react'
import { Link } from "react-router-dom";
import './CategoryTiles.css'


const CategoryTiles = ({ categories }) => {

    // useEffect(() => {

    //     console.log("IN CategoryTiles COMPONENT. categories = ", categories, typeof categories)

    // }, [])

    return (
        <div>
            {/* <div>
                <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1634095238/shipshape-project/ribbon_test_asset_d8oald.png'  alt='' />
            </div> */}
            <h3 id='get_in_the_air'>Get in the air</h3>
            <div id='category_tiles_container'>
                {categories.map((category, index) => (
                    <div key={index} className='category_tile'>
                        <Link
                        to={`/listings/categories/${category.id}`}
                        >
                            <img
                                src={category.url}
                                alt={category.name}
                                className='category_img'
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryTiles;
