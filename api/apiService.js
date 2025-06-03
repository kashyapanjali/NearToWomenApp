// src/api/apiService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api'; // For iOS simulator
// Use 'http://10.0.2.2:3000/api' for Android emulator

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Authentication APIs
  login: (email, password) => 
    api.post('/users/login', { email, password }),

  register: (userData) => 
    api.post('/users/register', userData),

  // Product APIs
  getProducts: () => 
    api.get('/products'),

  getProduct: (id) => 
    api.get(`/products/${id}`),

  getProductsByType: (type) => 
    api.get(`/products/type/${type}`),

  getProductsByCategory: (categoryId) => 
    api.get(`/products?categories=${categoryId}`),

  // Cart APIs
  getCart: (userId) => 
    api.get(`/cart/${userId}`),

  addToCart: (userId, productId, quantity) => 
    api.post('/cart', { userId, productId, quantity }),

  updateCartItem: (userId, productId, quantity) => 
    api.put(`/cart/${userId}`, { productId, quantity }),

  removeFromCart: (userId, productId) => 
    api.delete(`/cart/${userId}`, { data: { productId } }),

  clearCart: (userId) => 
    api.delete(`/cart/clear/${userId}`),

  // Purchase APIs
  purchaseFromCart: (purchaseData) => 
    api.post('/purchase/cart-purchase', purchaseData),

  buyNow: (purchaseData) => 
    api.post('/purchase/buy-now', purchaseData),

  getMyOrders: (userId) => 
    api.get(`/purchase/my-orders/${userId}`),

  // Category APIs
  getCategories: () => 
    api.get('/category'),

  getCategory: (id) => 
    api.get(`/category/${id}`),

  // User Profile APIs
  getUserProfile: (userId) => 
    api.get(`/users/${userId}`),

  updateUserProfile: (userId, userData) => 
    api.put(`/users/${userId}`, userData),
};

// Example usage in components:

// 1. Product Listing
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    // Your product list UI
  );
};

// 2. Cart Management
const CartScreen = () => {
  const [cart, setCart] = useState(null);
  const userId = 'current_user_id';

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await apiService.addToCart(userId, productId, quantity);
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handlePurchase = async () => {
    try {
      const purchaseData = {
        userId,
        shippingAddress: 'user_address',
        city: 'user_city',
        zip: 'user_zip',
        phone: 'user_phone'
      };
      const response = await apiService.purchaseFromCart(purchaseData);
      // Handle successful purchase
    } catch (error) {
      console.error('Error purchasing:', error);
    }
  };

  return (
    // Your cart UI
  );
};

// 3. Quick Purchase
const ProductCard = ({ product }) => {
  const handleBuyNow = async () => {
    try {
      const purchaseData = {
        userId: 'current_user_id',
        productId: product._id,
        quantity: 1,
        shippingAddress: 'user_address',
        city: 'user_city',
        zip: 'user_zip',
        phone: 'user_phone'
      };
      const response = await apiService.buyNow(purchaseData);
      // Handle successful purchase
    } catch (error) {
      console.error('Error buying now:', error);
    }
  };

  return (
    // Your product card UI
  );
};

// 4. Order History
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = 'current_user_id';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiService.getMyOrders(userId);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    // Your order history UI
  );
};

// 5. User Profile
const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const userId = 'current_user_id';

  const updateProfile = async (userData) => {
    try {
      const response = await apiService.updateUserProfile(userId, userData);
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    // Your profile UI
  );
};