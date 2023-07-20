import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const API_URL = 'http://localhost:8080';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
  userEmail: string;
}

interface ProductsProps {
  token: string;
}

const Products: React.FC<ProductsProps> = ({ token }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({});
  const [quantityExceeded, setQuantityExceeded] = useState<boolean>(false);
  const [productsAddedToCart, setProductsAddedToCart] = useState<{ [key: string]: boolean }>({});


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          throw new Error('Invalid token');
        }

        const response = await axios.get<Product[]>(`${API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddToCart = async (productId: string) => {
    const quantity = selectedQuantities[productId] || 1;

    try {
      const response = await axios.post(
        `${API_URL}/cart/${productId}`,
        {},
        {
          params: {
            quantity: quantity,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductsAddedToCart((prevProductsAddedToCart) => ({
        ...prevProductsAddedToCart,
        [productId]: true,
      }));
      // Feedback de sucesso ou redirecionamento para a página do carrinho
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Feedback de erro ou tratamento de erro adicional
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    setSelectedQuantities((prevQuantities) => {
      const prevQuantity = prevQuantities[productId] || 1;
      const newQuantity = Math.max(prevQuantity - 1, 1);
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const handleIncreaseQuantity = (productId: string) => {
    setSelectedQuantities((prevQuantities) => {
      const prevQuantity = prevQuantities[productId] || 1;
      const product = products.find((product) => product.id === productId);
      const newQuantity = Math.min(prevQuantity + 1, product?.quantity || 1);
  
      if (product && newQuantity > product.quantity) {
        setQuantityExceeded(true);
      } else {
        setQuantityExceeded(false);
      }
  
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  return (
    <div className="products-container">
            <div className="user-pages">
            <h2>Ecommerce</h2>
                <ol>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/cart">Cart</a></li>
                    <li><a href="/checkout/success">Orders</a></li>                                                                                       
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ol>
            </div>
      <h2>Products</h2>
      <div className="products-card">
  {loading ? (
    <p>Loading...</p>
  ) : (
    <>
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <img src={product.img} alt={product.name} />
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Seller: {product.userEmail}</p>
                <p className='quantity-button'>
                  Quantity:
                  <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                  {selectedQuantities[product.id] || 1}
                  <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                </p>
              {quantityExceeded && <p>Quantity exceeds available stock.</p>}
              {productsAddedToCart[product.id] && <p>Product added to cart.</p>}
              <button className='add-to-cart-button' onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </div>
          ))}
        </>
      ) : (
        <p>No products found.</p>
      )}
    </>
  )}
</div>

      </div>
  );
};

export default Products;