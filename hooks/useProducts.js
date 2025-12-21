import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import toast from 'react-hot-toast';

// هوک اصلی برای دریافت تمام محصولات یکجا
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('/products'); 
      return data;
    },
    staleTime: 5 * 60 * 1000, 
  });
};

// هوک برای افزودن محصول
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct) => api.post('/products', newProduct),
    onSuccess: () => {
      toast.success('محصول با موفقیت اضافه شد.');
      queryClient.invalidateQueries({ queryKey: ['products'] }); 
    },
    onError: () => {
      toast.error('خطا در افزودن محصول.');
    },
  });
};

// هوک برای ویرایش محصول
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updatedProduct }) => api.put(`/products/${id}`, updatedProduct),
    onSuccess: () => {
      toast.success('محصول با موفقیت ویرایش شد.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      toast.error('خطا در ویرایش محصول.');
    },
  });
};

// هوک برای حذف یک محصول
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      toast.success('محصول با موفقیت حذف شد.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      toast.error('خطا در حذف محصول.');
    },
  });
};

// هوک برای حذف چندتایی محصول
export const useBulkDeleteProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids) => api.delete('/products', { data: { ids } }), 
    onSuccess: () => {
      toast.success('محصولات انتخاب شده با موفقیت حذف شدند.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      toast.error('خطا در حذف محصولات.');
    },
  });
};