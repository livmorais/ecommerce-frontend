import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ProductData } from "../interface/ProductData";
import { useEffect } from "react";

const API_URL = "http://localhost:8080";

export function useProductData() {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Invalid token');
      }

      const response = await axios.get<ProductData[]>(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Error fetching products:', error);
      throw error;
    }
  };

  const { data: products, isLoading, refetch } = useQuery<ProductData[]>(['products'], fetchData);

  useEffect(() => {
    if (products) {
      queryClient.setQueryData(['products'], products);
    }
  }, [products, queryClient]);

  return { products, isLoading, refetch };
}

