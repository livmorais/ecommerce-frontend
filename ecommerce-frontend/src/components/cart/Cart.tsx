import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { CartDTO } from "../../interface/CartData";
import axios from "axios";
import './style/Cart.css'

const API_URL = 'http://localhost:8080';

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchCartItems = async (): Promise<void> => {
    try {
      if (!token) {
        throw new Error('Invalid token');
      }

      const response = await axios.get<CartDTO>(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      if (!token) {
        throw new Error('Invalid token');
      }

      await axios.put(
        `${API_URL}/cart/${cartItemId}?quantity=${quantity}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualizar os dados do carrinho após a atualização da quantidade
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      if (!token) {
        throw new Error('Invalid token');
      }

      await axios.delete(`${API_URL}/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Atualizar os dados do carrinho após a remoção do item
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="user-cart">
      <div className="user-pages">
      <h2>Ecommerce</h2>
                <ol>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/cart">Cart</a></li>
                    <li><a href="/checkout/success">Orders</a></li>                                                                                       
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ol>
            </div>
      <h2>Cart</h2>
      <Link to="/products">Return to Products</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {cartData && cartData.cartItems && cartData.cartItems.length > 0 ? (
            <>
              <div className="user-cart-item">
                {cartData.cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
              <p>Total Price: {cartData.totalPrice}</p>
              <button className="cart-checkout" onClick={handleCheckout}>Checkout</button>
            </>
          ) : (
            <p>No items in cart.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;