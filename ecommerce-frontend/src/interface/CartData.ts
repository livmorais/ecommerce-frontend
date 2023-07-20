// CartDTO.ts
export interface CartDTO {
    cartItems: CartItemDTO[];
    totalPrice: number;
}
  
// CartItemDTO.ts
export interface CartItemDTO {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
}