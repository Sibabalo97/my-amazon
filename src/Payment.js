import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";
import Footer from './Footer/Footer ';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false); // Change the initial state to boolean
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            try {
                const response = await axios.post(
                    `/payments/create?total=${getBasketTotal(basket) * 100}` // Ensure total is in cents
                );

                if (response.data.clientSecret) {
                    setClientSecret(response.data.clientSecret);
                } else {
                    console.error("Client secret not received.");
                }
            } catch (error) {
                console.error("Error getting client secret:", error);
                setError("Failed to get payment secret. Please try again.");
            }
        };

        if (basket.length > 0) {
            getClientSecret();
        }
    }, [basket]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements || !clientSecret) {
            setError("Stripe is not properly loaded. Please try again.");
            setProcessing(false);
            return;
        }

        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (error) {
                setError(error.message);
                setProcessing(false);
                return;
            }

            // Payment success
            await db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({ type: 'EMPTY_BASKET' });

            navigate.replace('/orders');
        } catch (error) {
            setError("Payment failed. Please try again.");
            setProcessing(false);
        }
    };

    const handleChange = event => {
        // Listen for changes in the CardElement and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <>
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>

                {/* Payment section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>pune , Pimple saudgar</p>
                        <p>Maharstra</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => <h3>Order Total: {value}</h3>}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rs"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div className="payment__error">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
        </>
    );
}

export default Payment;
