
import './Listings.css'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategoryListingsCreator } from '../../store/listings';
import { Link } from 'react-router-dom';

const Listings = () => {
    const { category_id } = useParams();
    const dispatch = useDispatch();


    const category_listings = useSelector(state => state.listings.category_listings)
    const test = useSelector( state => state )

    useEffect(() => {
        dispatch(getCategoryListingsCreator(category_id))
    }, [])

    console.log("**checking state**", test)

     // console.log(category_listings.listings)

    return (
        <div id='listings_component_wrapper'>
            <h2>testing Listings component</h2>

            <ul>
                {category_listings?.listings?.map((listing, index) => (
                    <li key={index}>
                        <div className='listing_container'>
                            <h3>{listing.title}</h3>
                            <p>{listing.description}</p>
                            <h5>Airport: {listing.location}</h5>
                            <Link to={`/listings/${listing.id}`}>
                                <img src={listing.img_url} alt={listing.title} />
                            </Link>
                        </div>
                    </li>
                ) )}
            </ul>
        </div>
    )
}

export default Listings
