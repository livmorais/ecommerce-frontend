import { ReactNode } from "react";

interface CheckoutItemDTO {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }
  
  interface CheckoutDTO {
    checkoutDateTime: ReactNode;
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
    items: CheckoutItemDTO[];
  }