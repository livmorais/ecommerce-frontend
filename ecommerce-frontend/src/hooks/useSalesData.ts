import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const API_URL = 'http://localhost:8080';

export function useSalesData() {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<CheckoutDTO[]>(`${API_URL}/api/sales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log('Error fetching sales:', error);
      throw error;
    }
  };

  const { data: sales, isLoading, refetch } = useQuery<CheckoutDTO[]>(['sales'], fetchData);

  useEffect(() => {
    if (sales) {
      queryClient.setQueryData(['sales'], sales);
    }
  }, [sales, queryClient]);

  return { sales, isLoading, refetch };
}