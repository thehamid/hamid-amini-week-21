import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
    const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (credentials) => api.post('/auth/login', credentials),
    onSuccess: (response) => {
      const { token, user } = response.data;
      login(token, user);
      toast.success('ورود با موفقیت انجام شد!');
       router.push('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'خطا در ورود');
    },
  });
};

export const useRegisterMutation = () => {
    const router = useRouter();

  return useMutation({
    mutationFn: (userData) => api.post('/auth/register', userData),
    onSuccess: () => {
      toast.success('ثبت‌نام با موفقیت انجام شد!');
       router.push('/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'خطا در ثبت‌نام');
    },
  });
};