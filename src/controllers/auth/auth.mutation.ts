import { Customers } from '@/types/customers/customers';
import { axiosInstance } from '@/utils/instance';

export const login = async (data: { username: string; password: string }) => {
    const res = await axiosInstance.post<{ content: Customers[]; totalElements: number }>('auth/login', data);
    return res.data;
};
