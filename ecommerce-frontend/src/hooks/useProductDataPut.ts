import axios, { AxiosPromise } from "axios";
import { ProductData } from "../interface/ProductData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const putData = async (id: number, data: ProductData, token: string): AxiosPromise<any> => {
  const response = await axios.put(`${API_URL}/api/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useProductDataPut() {
  const queryClient = useQueryClient();

  const mutation = useMutation((payload: { id: number, data: ProductData, token: string }) =>
    putData(payload.id, payload.data, payload.token)
  , {
    onSuccess: (newData, variables) => {
      queryClient.setQueryData(['products'], (oldData?: ProductData[]) => {
        if (oldData) {
          const updatedData = oldData.map((product) => {
            if (product.id === variables.id) {
              return { ...product, ...variables.data };
            }
            return product;
          });
          return updatedData;
        }
        return oldData;
      });
    },
  });

  return mutation;
}
