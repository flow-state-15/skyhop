
import './ViewListing.css'
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOneListingCreator } from '../../store/listings';
import { createBookingCreator } from '../../store/bookings';

const ViewListing = () => {
    const { listing_id } = useParams();
    const dispatch = useDispatch();
    let [book_start, setBook_start] = useState('')
    let [book_end, setBook_end] = useState('')
    let [dispatched, setDispatched] = useState(false)


    const listing = useSelector(state => state?.listings?.listing?.listing)
    const user_id = useSelector(state => state?.session?.user?.id)

    // console.log("!!! in ViewListing Component, listing from State: ", listing)

    useEffect(() => {
        dispatch(getOneListingCreator(listing_id))
    }, [])

    const handleBookingSubmit = ( event ) => {
        event.preventDefault();
        book_start = new Date(book_start)
        book_end = new Date(book_end)
        // console.log("logging form dates", book_start, book_end, testDate)

        const form_data = {
            listing_id: listing.id,
            renter_id: user_id,
            book_start,
            book_end,
        }
        setDispatched(true)
        dispatch(createBookingCreator(form_data))
    }

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

            {/* i need to grab the value of this date */}
            <div >
                <form
                    className='calendar_container'
                    onSubmit={ handleBookingSubmit }
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
                        id="book_listing_button"
                        type='submit'
                        // disabled={()}
                    >
                        Book this listing
                    </button>
                </form>
                <div>
                    {
                        (dispatched) ? <span>You have successfully booked this listing</span> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewListing
