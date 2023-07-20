import axios from "axios";
import { ProductData } from "../interface/ProductData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";


export function useProductData() {
  const token = localStorage.getItem("token");

  return useQuery(['products'], async () => {
    const response = await axios.get<ProductData[]>(`${API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
}

export function useProductDataMutate() {
  const queryClient = useQueryClient();

  const mutation = useMutation((data: ProductData) =>
    axios.post(`${API_URL}/api/products`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => response.data)
  , {
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], (oldProducts: ProductData[] | undefined) => {
        if (oldProducts) {
          return [...oldProducts, newProduct];
        }
        return [newProduct];
      });
    },
  });

  return mutation;
}
