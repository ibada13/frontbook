import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { useRouter, useParams } from 'next/navigation'

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware?:"auth"|"guest"|"optional"|"limitedguest"|string;
  redirectIfAuthenticated?: string;
}) => {
  const router = useRouter();
  const params = useParams();

  const { data: user, error, mutate, isValidating } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response?.status !== 409) throw error;
        router.push('/verify-email');
      })
  );

  
  const isLoading = !user && !error && isValidating;

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    await csrf();
    await axios.post('/register', data);
    mutate();
  };

  const login = async (data: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    await csrf();
    await axios.post('/login', data);
    mutate();
  };

  const forgotPassword = async (data: { email: string }): Promise<AxiosResponse> => {
    await csrf();
    return await axios.post('/forgot-password', data);
  };

  const resetPassword = async (data: {
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    await csrf();
    const response = await axios.post('/reset-password', {
      ...data,
      token: params.token,
    });
    router.push('/login?reset=' + btoa(response.data.status));
  };

  const resendEmailVerification = async () => {
    return await axios.post('/email/verification-notification');
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate());
    }
    window.location.pathname = '/login';
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }
    if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at &&
      redirectIfAuthenticated
    ) {
      router.push(redirectIfAuthenticated);
    }
    if (middleware === "auth" && error) logout();
    if (middleware === "optional" || middleware === "limitedguest") {
      return;
    }
  }, [user, error, middleware, redirectIfAuthenticated]);

  return {
    user,
    isLoading, 
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
