// src/api/apiService.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, API_TIMEOUT, ENDPOINTS } from "./config";

// Create a public API instance for endpoints that don't require authentication
const publicApi = axios.create({
	baseURL: API_URL,
	timeout: API_TIMEOUT,
	headers: {
		"Content-Type": "application/json",
	},
});

// Create an authenticated API instance
const api = axios.create({
	baseURL: API_URL,
	timeout: API_TIMEOUT,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor for adding auth token
api.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for handling common errors
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			// Handle unauthorized access
			await AsyncStorage.removeItem("token");
			await AsyncStorage.removeItem("user");
		}
		return Promise.reject(error);
	}
);

export const apiService = {
	// Auth APIs - using publicApi for registration and login
	auth: {
		login: (email, password) => 
			publicApi.post(ENDPOINTS.AUTH.LOGIN, { email, password }),
		
		register: (userData) => 
			publicApi.post(ENDPOINTS.AUTH.REGISTER, userData),
	},

	// Product APIs
	products: {
		getAll: (params) => 
			api.get(ENDPOINTS.PRODUCTS.BASE, { params }),
		
		getById: (id) => 
			api.get(`${ENDPOINTS.PRODUCTS.BASE}/${id}`),
		
		getByType: (type) => 
			api.get(`${ENDPOINTS.PRODUCTS.BY_TYPE}/${type}`),
		
		getByCategory: (categoryId) => 
			api.get(ENDPOINTS.PRODUCTS.BY_CATEGORY, { params: { categories: categoryId } }),
		
		search: (query) => 
			api.get(`${ENDPOINTS.PRODUCTS.SEARCH}/${query}`),
		
		getFeatured: (count) => 
			api.get(`${ENDPOINTS.PRODUCTS.FEATURED}/${count}`),
		
		getQuickDelivery: () => 
			api.get(ENDPOINTS.PRODUCTS.QUICK_DELIVERY),
		
		getSubscriptionAvailable: () => 
			api.get(ENDPOINTS.PRODUCTS.SUBSCRIPTION),
		
		getOnSale: () => 
			api.get(ENDPOINTS.PRODUCTS.ON_SALE),
		
		addReview: (productId, reviewData) => 
			api.post(`${ENDPOINTS.PRODUCTS.BASE}/${productId}/reviews`, reviewData),
	},

	// Category APIs
	categories: {
		getAll: () => 
			api.get(ENDPOINTS.CATEGORIES.BASE),
		
		getById: (id) => 
			api.get(`${ENDPOINTS.CATEGORIES.BASE}/${id}`),
		
		initialize: () => 
			api.post(ENDPOINTS.CATEGORIES.INITIALIZE),
	},

	// Order APIs
	orders: {
		create: (orderData) => 
			api.post(ENDPOINTS.ORDERS.BASE, orderData),
		
		getAll: () => 
			api.get(ENDPOINTS.ORDERS.BASE),
		
		getById: (id) => 
			api.get(`${ENDPOINTS.ORDERS.BASE}/${id}`),
		
		getUserOrders: (userId) => 
			api.get(`${ENDPOINTS.ORDERS.USER_ORDERS}/${userId}`),
		
		updateStatus: (id, status) => 
			api.put(`${ENDPOINTS.ORDERS.BASE}/${id}`, { status }),
		
		delete: (id) => 
			api.delete(`${ENDPOINTS.ORDERS.BASE}/${id}`),
		
		getTotalSales: () => 
			api.get(ENDPOINTS.ORDERS.TOTAL_SALES),
		
		getCount: () => 
			api.get(ENDPOINTS.ORDERS.COUNT),
	},

	// User APIs
	users: {
		getAll: () => 
			api.get(ENDPOINTS.USERS.BASE),
		
		getById: (id) => 
			api.get(`${ENDPOINTS.USERS.BASE}/${id}`),
		
		getCount: () => 
			api.get(ENDPOINTS.USERS.COUNT),
		
		delete: (id) => 
			api.delete(`${ENDPOINTS.USERS.BASE}/${id}`),
		
		update: (id, userData) => 
			api.put(`${ENDPOINTS.USERS.BASE}/${id}`, userData),
	},
};
