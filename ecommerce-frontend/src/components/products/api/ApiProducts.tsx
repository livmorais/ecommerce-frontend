import { useState } from "react";
import { useProductData } from "../../../hooks/useProductData";
import { ProductData } from "../../../interface/ProductData";
import { useProductDataDelete } from "../../../hooks/useProductDataDelete";
import { Card } from "./CardApiProducts";
import { EditModal } from "./UpdateProduct";
import { Link, useNavigate } from "react-router-dom";
import './style/ApiProducts.css';
import { useProductDataMutate } from "../../../hooks/useProductDataMutate";
import { useQueryClient } from "@tanstack/react-query";
import CreateModal from "./CreateProduct";

const API_URL = 'http://localhost:8080';

function ApiProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | undefined>(undefined); 
  const { handleDeleteProduct } = useProductDataDelete();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const queryClient = useQueryClient();
  const createProductMutation = useProductDataMutate();
  const { products, isLoading } = useProductData();


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: ProductData) => {
    setSelectedProduct(product);
  };
  const handleUpdateProduct = (updatedProduct: ProductData) => {
    const payload = {
      ...updatedProduct,
      token: localStorage.getItem('token') || '',
    };
  
    createProductMutation.mutate(payload);
  };

  const onDelete = (id?: number) => {
    if (id) {
      if (window.confirm('Tem certeza de que deseja excluir este produto?')) {
        handleDeleteProduct(id);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  
  const handleSubmitProduct = (productData: ProductData) => {
    createProductMutation.mutate(productData);
  };

  return (
    <div className="container">
      <div className="nav">
        <h2>Ecommerce</h2>
        <a>
      <Link to="/api/products">Products</Link>
      <Link to="/api/sales">Sales</Link>
      <button  onClick={handleLogout}>Logout</button>
        </a>
      </div>
      <h1>Products</h1>
      <div className="card-grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {products?.map((product) => (
              <Card
                key={product.id}
                img={product.img}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                onEdit={() => handleEditProduct(product)}
                onDelete={() => onDelete(product.id)}
              />
            ))}
          </>
        )}
      </div>
      <div className="handler">

      {isModalOpen && <CreateModal closeModal={() => setIsModalOpen(false)} onSubmit={handleSubmitProduct} />}
      {selectedProduct && (
        <EditModal productData={selectedProduct} closeModal={() => setSelectedProduct(undefined)} onUpdate={handleUpdateProduct} />
      )}
      <button  onClick={handleOpenModal}>Create</button>
      </div>
    </div>
  );
}

export default ApiProducts;

