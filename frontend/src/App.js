import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginSplashPage from "./components/LoginSplashPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CategoryTiles from "./components/CategoryTiles";
import TryHosting from "./components/TryHosting";
import Footer from "./components/Footer";
import categories from './static_data/categories';
import CreateListing from "./components/CreateListing";
import CreateBooking from "./components/CreateBooking";
import Listings from "./components/Listings";
import ViewListing from "./components/ViewListing";
import ViewBooking from "./components/ViewBooking";
import UpdateListing from "./components/UpdateListing";
import UpdateBooking from "./components/UpdateBooking";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='page_wrapper'>
      <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Route path="/login">
            <LoginSplashPage />
          </Route>
        )}
      <Switch>
        <Route exact path="/">
          <div className='main_content'>
            <CategoryTiles categories={categories} />
            <TryHosting />
          </div>
        </Route>
        <Route path='/create-listing' >
          <CreateListing  />
        </Route>
        <Route path='/create-booking' >
          <CreateBooking  />
        </Route>
        <Route path='/profile/:user_id' >
          <Profile />
        </Route>
        <Route path='/listings/categories/:category_id' >
          <Listings />
        </Route>
        <Route exact path='/listings/:listing_id' >
          <ViewListing />
        </Route>
        <Route path='/listings/:listing_id/update' >
          <UpdateListing />
        </Route>
        <Route path='/bookings/:booking_id' >
          <ViewBooking />
        </Route>
        <Route path='/bookings/:booking_id/update' >
          <UpdateBooking />
        </Route>
        {/* <Route path='/login' >
          <LoginFormModal />
        </Route> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
