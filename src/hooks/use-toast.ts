import { toast, ToastOptions } from 'react-toastify';

export const toaster = ({ description = '', options }: { description: string; options?: ToastOptions }) => {
    return toast(description, { type: 'success', theme: 'light', autoClose: 3000, ...options });
};
