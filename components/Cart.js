import { useState, useEffect } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Platform, Alert } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { API, apiService } from "../api/endpoints"

const Cart = ({ closeCart, isWeb }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get user ID from localStorage
  const userId = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user'))?.id : null

  useEffect(() => {
    if (userId) {
      fetchCart()
    }
  }, [userId])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await apiService.request(API.cart.getCart(userId))
      setCart(response.items || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      Alert.alert("Error", "Failed to fetch cart items")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (product) => {
    try {
      await apiService.request(API.cart.addToCart, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          productId: product.id,
          quantity: 1
        })
      })
      fetchCart() // Refresh cart after adding
    } catch (err) {
      Alert.alert("Error", "Failed to add item to cart")
    }
  }

  const handleRemoveFromCart = async (productId) => {
    try {
      await apiService.request(API.cart.removeFromCart(userId), {
        method: 'DELETE',
        body: JSON.stringify({ productId })
      })
      fetchCart() // Refresh cart after removing
    } catch (err) {
      Alert.alert("Error", "Failed to remove item from cart")
    }
  }

  const handleClearCart = async () => {
    try {
      await apiService.request(API.cart.clearCart(userId), {
        method: 'DELETE'
      })
      setCart([])
    } catch (err) {
      Alert.alert("Error", "Failed to clear cart")
    }
  }

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await apiService.request(API.cart.updateCart(userId), {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity: newQuantity })
      })
      fetchCart() // Refresh cart after updating quantity
    } catch (err) {
      Alert.alert("Error", "Failed to update quantity")
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const windowWidth = Dimensions.get("window").width
  const cartWidth = isWeb ? (windowWidth > 768 ? 420 : windowWidth * 0.8) : windowWidth

  if (loading) {
    return (
      <View style={[styles.overlay, isWeb && styles.webOverlay]}>
        <View style={[styles.cartContainer, { width: cartWidth }]}>
          <Text style={styles.loadingText}>Loading cart...</Text>
        </View>
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.overlay, isWeb && styles.webOverlay]}>
        <View style={[styles.cartContainer, { width: cartWidth }]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.overlay, isWeb && styles.webOverlay]}>
      <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={closeCart} />
      <View style={[styles.cartContainer, isWeb && styles.webCartContainer, { width: isWeb ? cartWidth : "100%" }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeCart}>
            <Icon name="times" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <View style={styles.emptyCartIconContainer}>
              <Icon name="shopping-cart" size={50} color="#e6799f" />
            </View>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtext}>Add items to get started</Text>
            <TouchableOpacity style={styles.continueButton} onPress={closeCart}>
              <Text style={styles.continueButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView style={styles.itemsContainer}>
              {cart.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image || "https://placehold.co/100x100" }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Icon name="minus" size={10} color="#a8336e" />
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Icon name="plus" size={10} color="#a8336e" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => handleRemoveFromCart(item.id)}
                  >
                    <Icon name="trash" size={14} color="#e84a80" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.cartFooter}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
              </View>
              <Text style={styles.taxNote}>Taxes and shipping calculated at checkout</Text>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                <Icon name="arrow-right" size={14} color="white" style={styles.checkoutIcon} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.clearCartButton} 
                onPress={handleClearCart}
              >
                <Text style={styles.clearCartText}>Clear Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueShoppingButton} onPress={closeCart}>
                <Text style={styles.continueShoppingText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },
  backdropTouchable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  webOverlay: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  cartContainer: {
    backgroundColor: "white",
    borderRadius: Platform.OS === "web" ? 0 : 20,
    overflow: "hidden",
    maxHeight: "100%",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      },
    }),
  },
  webCartContainer: {
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    paddingVertical: 60,
  },
  emptyCartIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(230, 121, 159, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: "#777",
    marginBottom: 30,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#e6799f",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemsContainer: {
    maxHeight: "70%",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#f9f9f9",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  itemPrice: {
    color: "#a8336e",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: 70,
    textAlign: "right",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f0f5",
    borderRadius: 20,
    padding: 5,
    alignSelf: "flex-start",
  },
  quantityButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  quantity: {
    marginHorizontal: 12,
    fontWeight: "bold",
    fontSize: 14,
  },
  cartFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    padding: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a8336e",
  },
  taxNote: {
    fontSize: 13,
    color: "#888",
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: "#a8336e",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
  checkoutIcon: {
    marginTop: 1,
  },
  continueShoppingButton: {
    padding: 12,
    alignItems: "center",
  },
  continueShoppingText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#e84a80',
    padding: 20,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  clearCartButton: {
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  clearCartText: {
    color: '#e84a80',
    fontSize: 14,
    fontWeight: '500',
  },
})

export default Cart
