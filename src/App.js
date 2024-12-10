import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QU4EwB02BAVk6JTlDqQFHiImoBPDsqbQXxliiOxTu5o1L9ZS5BE4ycseuoMMNdej5HvUPTBJsuOBJaVowmHBjwq00VzQgobd0"
);

function App() {
  const [{}, dispatch] = useStateValue();
  const [stripeLoaded, setStripeLoaded] = useState(false); // To track if Stripe is loaded

  useEffect(() => {
    // Will run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // User is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // User is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Ensure Stripe is loaded
    stripePromise.then(() => {
      setStripeLoaded(true); // Stripe has loaded
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header /> {/* Place Header outside of Routes */}

        {!stripeLoaded ? (
          <div>Loading Stripe...</div> // Loading state
        ) : (
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/payment"
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
