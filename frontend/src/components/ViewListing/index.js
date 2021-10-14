
import './ViewListing.css'
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOneListingCreator } from '../../store/listings';

const ViewListing = () => {
    const { listing_id } = useParams();
    const dispatch = useDispatch();


    const listing = useSelector(state => state?.listings?.listing?.listing)

    console.log("!!! in ViewListing Component, listing from State: ", listing)

    useEffect(() => {
        dispatch(getOneListingCreator(listing_id))
    }, [])

    // console.log(category_listings.listings)

    return (
        <div id='listings_component_wrapper'>
            <h2>testing ViewListing component</h2>


            <div className='listing_container'>
                <h3>{listing?.title}</h3>
                <p>{listing?.description}</p>
                <h5>Airport: {listing?.location}</h5>
                <img src={listing?.img_url} alt={listing?.title} />
                
            </div>
        </div>
    )
}

export default ViewListing
