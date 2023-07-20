import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardType, setCardType] = useState('');

  const handleCreateCheckout = async () => {
    try {
      const checkoutData = {
        fullName,
        phoneNumber,
        street,
        city,
        state,
        postalCode,
        holderName,
        cardNumber,
        expirationDate,
        securityCode,
        cardType,
      };

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Invalid token');
      }

      await axios.post(`${API_URL}/checkout`, checkoutData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Feedback de sucesso ou redirecionamento para página de confirmação

      navigate('/checkout/success'); // Redireciona para a página de confirmação após a criação do checkout
    } catch (error) {
      console.error('Error creating checkout:', error);
      // Feedback de erro ou tratamento de erro adicional
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <div className="user-pages">
      <h2>Ecommerce</h2>
                <ol>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/cart">Cart</a></li>
                    <li><a href="/checkout/success">Orders</a></li>                                                                                       
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ol>
            </div>
      <h2>Checkout Form</h2>
      <div className="card-checkout">

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <input
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Holder Name"
        value={holderName}
        onChange={(e) => setHolderName(e.target.value)}
      />
      <input
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <input
        placeholder="Security Code"
        value={securityCode}
        onChange={(e) => setSecurityCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Card Type"
        value={cardType}
        onChange={(e) => setCardType(e.target.value)}
      />
      <button onClick={handleCreateCheckout}>Create Checkout</button>
      </div>
    </div>
  );
};

export default CheckoutForm;