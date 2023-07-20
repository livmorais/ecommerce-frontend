import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";


const API_URL = 'http://localhost:8080';

const deleteData = async (id: number, token: string): AxiosPromise<any> => {
  const response = await axios.delete(`${API_URL}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useProductDataDelete() {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) =>
    deleteData(id, localStorage.getItem('token') || '')
  );

  const handleDeleteProduct = async (id: number) => {
    await mutation.mutateAsync(id);
    queryClient.invalidateQueries(['products']);
  };

  return { handleDeleteProduct };
}
