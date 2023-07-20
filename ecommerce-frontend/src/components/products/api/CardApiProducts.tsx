import './style/CardApiProducts.css';

interface ProductProps {
    id?: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
    onEdit: () => void;
    onDelete: () => void;
  }
  
  export function Card({ name, price, quantity, img, onEdit, onDelete}: ProductProps) {
    return (
      <div className="card">
        <img src={img}></img>
        <h2>{name}</h2>
        <p>
          <b>Price:</b>
          {price}
        </p>
        <p>
          <b>Quantity:</b>
          {quantity}
        </p>
        <button className="card-button" onClick={onEdit}>
          Update
        </button>
        <button className="card-button" onClick={onDelete}>
          Delete 
        </button>
        </div>
    );
  }
  
  
  
  
  
  
  