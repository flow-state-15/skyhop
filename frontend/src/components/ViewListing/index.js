
import './ViewListing.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOneListingCreator } from '../../store/listings';
import { createBookingCreator, getAllBookingsCreator } from '../../store/bookings';

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
    }, [listing_id, dispatch])

    // useEffect(() => {
    //     console.log(
    //         "CHECK CALENDAR DATA: book_start:", book_start,
    //         "CHECK CALENDAR DATA: book_end:", book_end,
    //     )
    // }, [book_start, book_end])

    let date_start;
    let date_end;

    const handleBookingSubmit = ( event ) => {
        event.preventDefault();
        date_start = new Date(book_start.toString())
        date_end = new Date(book_end.toString())
        // console.log("logging form dates, start", date_start)
        // console.log("logging form dates, end", date_end)

        const form_data = {
            listing_id: listing.id,
            renter_id: user_id,
            book_start: date_start,
            book_end: date_end,
        }
        setDispatched(true)
        dispatch(createBookingCreator(form_data))
        dispatch(getAllBookingsCreator(user_id))
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
