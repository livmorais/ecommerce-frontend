import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './style/Checkout.css';

const API_URL = 'http://localhost:8080';

interface CheckoutItemDTO {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface CheckoutDTO {
  id: string;
  fullName: string;
  phoneNumber: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  holderName: string;
  cardNumber: number;
  expirationDate: number;
  securityCode: number;
  cardType: string;
  checkoutDateTime: string; 
  items: CheckoutItemDTO[];
}

const Checkout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [checkoutData, setCheckoutData] = useState<CheckoutDTO[] | null>(null); // Atualize o tipo do estado para uma array de CheckoutDTO
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      const fetchCheckoutData = async () => {
        try {
          if (!token) {
            throw new Error('Invalid token');
          }
  
          const response = await axios.get<CheckoutDTO[]>(`${API_URL}/checkout/success`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setCheckoutData(response.data); // Atualiza o estado com o retorno da API
        } catch (error) {
          console.error('Error fetching checkout data:', error);
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCheckoutData();
    }, [navigate, token]); // Adiciona navigate e token como dependências
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };

    return (
      <div className="user-checkout">
  <div className="user-pages">
  <h2>Ecommerce</h2>
    <ol>
      <li><a href="/products">Products</a></li>
      <li><a href="/cart">Cart</a></li>
      <li><a href="/checkout/success">Orders</a></li>
      <li><button onClick={handleLogout}>Logout</button></li>
    </ol>
  </div>
  <h2>Checkout</h2>
  <Link to="/products">Return to Products</Link>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <>
      {checkoutData && checkoutData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
              <th>Holder Name</th>
              <th>Card Number</th>
              <th>Expiration Date</th>
              <th>Security Code</th>
              <th>Card Type</th>
              <th>Checkout Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {checkoutData.map((checkout) => (
              <tr key={checkout.id}>
                <td>{checkout.fullName}</td>
                <td>{checkout.phoneNumber}</td>
                <td>{checkout.street}</td>
                <td>{checkout.city}</td>
                <td>{checkout.state}</td>
                <td>{checkout.postalCode}</td>
                <td>{checkout.holderName}</td>
                <td>{checkout.cardNumber}</td>
                <td>{checkout.expirationDate}</td>
                <td>{checkout.securityCode}</td>
                <td>{checkout.cardType}</td>
                <td>{checkout.checkoutDateTime}</td>
                <td>
                  <ul>
                    {checkout.items.map((item) => (
                      <li key={item.productId}>
                        <p>Product Name: {item.productName}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No checkout data found.</p>
      )}
    </>
  )}
</div>
    );
  };
  
  export default Checkout;