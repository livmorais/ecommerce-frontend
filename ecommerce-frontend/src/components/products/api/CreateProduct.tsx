import { useState } from "react";
import { useProductDataMutate } from "../../../hooks/useProductDataMutate";
import { ProductData } from "../../../interface/ProductData";
import './style/CreateProduct.css';

interface CreateModalProps {
    closeModal(): void;
    onSubmit(productData: ProductData): void;
  }
  
  const CreateModal: React.FC<CreateModalProps> = ({ closeModal, onSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [img, setImg] = useState('');
  
    const handleSubmit = () => {
      const productData: ProductData = {
        name,
        price,
        quantity,
        img,
      };
      onSubmit(productData);
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-body">
          <h2>Register a new product</h2>
          <form className="input-container">
            <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div>
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div>
            <label>Image:</label>
            <input value={img} onChange={(e) => setImg(e.target.value)}></input>
            </div>
            <button className="btn-secondary" onClick={handleSubmit}>Create</button>
            <button className="btn-secondary" onClick={closeModal}>Close</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default CreateModal;

