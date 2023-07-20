import { useEffect, useState } from "react";
import { ProductData } from "../../../interface/ProductData";
import { useProductDataPut } from "../../../hooks/useProductDataPut";
import './style/UpdateProduct.css';


interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
  }   
  
  interface EditModalProps {
    productData: ProductData;
    closeModal(): void;
    onUpdate(updatedProduct: ProductData): void;
  }
  
  const Input = ({ label, value, updateValue }: InputProps) => {
    return (
      <>
        <label>{label}</label>
        <input value={value} onChange={event => updateValue(event.target.value)}></input>
      </>
    );
  }
  
  export function EditModal({ productData, closeModal }: EditModalProps){
    const [name, setName] = useState(productData.name);
    const [price, setPrice] = useState(productData.price);
    const [quantity, setQuantity] = useState(productData.quantity);
    const [img, setImg] = useState(productData.img);
    const { mutate, isLoading } = useProductDataPut();
  
  const submit = () => {
    if (!productData?.id) {
    return; // Abortar a função submit se o ID não estiver definido
  }
    
  const updatedProductData: ProductData = {
    id: productData.id,
    name,
    price,
    quantity,
    img
  };
    
  const payload = {
    id: productData.id,
    data: updatedProductData,
    token: localStorage.getItem("token") || ""
  };
  
  mutate(payload, {
    onSuccess: () => {
      closeModal();
    },
  });
  };
  
  useEffect(() => {
    // ...
  }, [closeModal]);
  
    return (
      <div className="modal-overlay">
        <div className="modal-body">
          <h2>Update product</h2>
          <form className="input-container">
            <Input label="name" value={name} updateValue={setName} />
            <Input label="price" value={price} updateValue={setPrice} />
            <Input label="quantity" value={quantity} updateValue={setQuantity} />
            <Input label="img" value={img} updateValue={setImg} />
          </form>
          <button onClick={submit} className="btn-secondary">
            {isLoading ? 'Atualizando...' : 'Update'}
          </button>
          <button className="btn-secondary" onClick={closeModal}>Close</button>
        </div>
      </div>
    );
  }