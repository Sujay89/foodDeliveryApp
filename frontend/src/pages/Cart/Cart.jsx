import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const applyPromoCode = () => {
    if (promoCode === 'FIRST') {
      setDiscount(5);
      toast.success('Congrats! You got a $5 discount!');
    } else if (promoCode === 'SECOND') {
      setDiscount(3);
      toast.success('Congrats! You got a $3 discount!');
    } else if (promoCode === 'THIRD') {
      setDiscount(1);
      toast.success('Congrats! You got a $1 discount!');
    } else {
      setDiscount(0);
      toast.error('Invalid Promo Code');
    }
  };

  const totalCartAmount = getTotalCartAmount();
  const deliveryCharges = totalCartAmount === 0 ? 0 : 2;
  const finalTotal = totalCartAmount + deliveryCharges - discount;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalCartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>${deliveryCharges}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className="cart-total-details">
                  <p>Promocode Discount</p>
                  <p>-${discount}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>${finalTotal < 0 ? 0 : finalTotal}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='PROMOCODE' value={promoCode} onChange={(e) => setPromoCode(e.target.value)}/>
              <button onClick={applyPromoCode}>Apply Promocode</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Cart;
