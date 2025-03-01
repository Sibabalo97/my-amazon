import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Footer from "./Footer/Footer ";

function Checkout() {
  const [{ basket, user}, dispatch] = useStateValue();
  return (
    <>
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://www.reviewfantasy.com/wp-content/uploads/2019/09/Screenshot-2019-09-23-at-5.05.13-PM-1024x192.png"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
    <div>
      <Footer/>
    </div>
    </>
  );
}

export default Checkout;
