// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();
const CART_STORAGE_KEY = "@cart_items";

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);

	// Load cart items from storage on mount
	useEffect(() => {
		loadCartItems();
	}, []);

	const loadCartItems = async () => {
		try {
			const storedItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
			if (storedItems) {
				setCartItems(JSON.parse(storedItems));
			}
		} catch (error) {
			console.error("Error loading cart items:", error);
		} finally {
			setLoading(false);
		}
	};

	// Save cart items to storage whenever they change
	useEffect(() => {
		saveCartItems();
	}, [cartItems]);

	const saveCartItems = async () => {
		try {
			await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
		} catch (error) {
			console.error("Error saving cart items:", error);
		}
	};

	const addToCart = (product, quantity = 1) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === product.id);
			if (existingItem) {
				return prevItems.map((item) =>
					item.id === product.id ?
						{ ...item, quantity: item.quantity + quantity }
					:	item
				);
			}
			return [...prevItems, { ...product, quantity }];
		});
	};

	const removeFromCart = (productId) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
	};

	const updateQuantity = (productId, quantity) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		);
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const getCartTotal = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartTotal,
				loading,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
