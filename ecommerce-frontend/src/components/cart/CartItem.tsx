import { CartItemDTO } from "../../interface/CartData";


interface CartItemProps {
    item: CartItemDTO;
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onRemoveItem: (itemId: string) => void;
  }
  
  const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemoveItem,
  }) => {
    const handleDecreaseQuantity = () => {
      onUpdateQuantity(item.id, item.quantity - 1);
    };
  
    const handleIncreaseQuantity = () => {
      onUpdateQuantity(item.id, item.quantity + 1);
    };
  
    const handleRemoveItem = () => {
      onRemoveItem(item.id);
    };
  
    return (
      <div className="user-cart-itens">
        <p>Name: {item.name}</p>
        <p>Price: {item.price}</p>
        <p className="quantity-item-cart">
          Quantity: 
          <button onClick={handleDecreaseQuantity}>-</button>
          {item.quantity}
          <button onClick={handleIncreaseQuantity}>+</button>
        </p>
        <button onClick={handleRemoveItem}>Remove</button>
      </div>
    );
  };
  
  export default CartItem;