import axios, { type AxiosError, type AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    timeout: 1000,
    headers: { 
        'Content-Type': 'application/json'
    },
});

export const ServerRequest = async<T,>(url: string, method: any, data?: any): Promise<T> => {
    console.log("Data: " + JSON.stringify(data))
    try {
        const response: AxiosResponse<T> = await instance({
            method: method,
            url: url,
            data: JSON.stringify(data)
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error(`API Error (${url}):`, axiosError.response?.data || axiosError.message);
        
        // Re-throw or return a custom error structure
        throw axiosError;
    }
};
