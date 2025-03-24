import { Customers } from '@/types/customers/customers';
import { axiosInstance } from '@/utils/instance';

export const getAllCustomers = async (page = 0, size = 20) => {
    const res = await axiosInstance.get<{ content: Customers[]; totalElements: number }>('customers', {
        params: { page, size },
    });
    const maxPages = res.data.totalElements % size === 0 ? res.data.totalElements / size : Math.floor(res.data.totalElements / size) + 1;
    return {
        data: res.data.content,
        totalElements: res.data.totalElements,
        maxPages,
    };
};
