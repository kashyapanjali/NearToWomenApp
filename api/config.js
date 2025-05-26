import { Platform } from 'react-native';

// API Configuration
const DEV_API_URL = "http://localhost:3000/api/v1"; // Using localhost for all platforms in development
const PROD_API_URL = "https://api.nearwomen.com/api/v1"; // Replace with your actual production API URL

// Determine the appropriate API URL based on environment
const getApiUrl = () => {
  return __DEV__ ? DEV_API_URL : PROD_API_URL;
};

export const API_URL = getApiUrl();

// API Timeout configuration
export const API_TIMEOUT = 30000; // 30 seconds

// API Endpoints
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
    },
    PRODUCTS: {
        BASE: '/products',
        BY_TYPE: '/products/type',
        BY_CATEGORY: '/products',
        SEARCH: '/products/search',
        FEATURED: '/products/get/Featured',
        QUICK_DELIVERY: '/products/quick-delivery',
        SUBSCRIPTION: '/products/subscription-available',
        ON_SALE: '/products/on-sale',
        REVIEWS: '/products/:id/reviews',
    },
    CATEGORIES: {
        BASE: '/category',
        INITIALIZE: '/category/initialize',
    },
    ORDERS: {
        BASE: '/orders',
        USER_ORDERS: '/orders/get/userorders',
        TOTAL_SALES: '/orders/get/totalsales',
        COUNT: '/orders/get/count',
    },
    USERS: {
        BASE: '/users',
        COUNT: '/users/get/count',
    }
};
