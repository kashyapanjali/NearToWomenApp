"use client"

// components/ProductCard.js
import { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Modal, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const ProductCard = ({ product, addToCart, isWeb, windowWidth: propWindowWidth, horizontal = false }) => {
  const [showQuickShop, setShowQuickShop] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // Use propWindowWidth if provided, otherwise get the screen width
  const windowWidth = propWindowWidth || Dimensions.get("window").width

  // Define dynamic styles based on window width and platform
  const dynamicStyles = {
    quickShopContent: {
      flexDirection: isWeb && windowWidth > 480 ? "row" : "column",
    },
    quickShopImageContainer: isWeb && windowWidth > 480 ? {
      flex: 1,
      height: undefined,
      marginBottom: 0,
      marginRight: 20,
    } : {},
    quickShopInfo: isWeb && windowWidth > 480 ? {
      flex: 1,
    } : {},
  }

  const cardStyles = [styles.card, horizontal ? styles.horizontalCard : styles.verticalCard, isWeb && styles.webCard]

  // Format price
  const formatPrice = (price) => {
    const dollars = Math.floor(price)
    const cents = Math.round((price - dollars) * 100)
    return (
      <View style={styles.priceContainer}>
        <Text style={styles.priceCurrency}>$</Text>
        <Text style={styles.priceWhole}>{dollars}</Text>
        <Text style={styles.priceCents}>{cents.toString().padStart(2, "0")}</Text>
      </View>
    )
  }

  // Get badge for category
  const getCategoryBadge = () => {
    switch (product.category) {
      case "menstrual":
        return { label: "Menstrual", color: "#e84a80" }
      case "safety":
        return { label: "Safety", color: "#4a7de8" }
      case "wellness":
        return { label: "Wellness", color: "#4acce8" }
      case "food":
        return { label: "Health Food", color: "#7de84a" }
      default:
        return null
    }
  }

  const categoryBadge = getCategoryBadge()

  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Add to cart with selected quantity
  const handleAddToCart = () => {
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }

    // Reset and close
    setQuantity(1)
    setShowQuickShop(false)
  }

  return (
    <View style={cardStyles}>
      <TouchableOpacity
        style={[styles.imageContainer, horizontal && styles.horizontalImageContainer]}
        activeOpacity={0.9}
        onPress={() => setShowQuickShop(true)}
      >
        <Image
          source={{ uri: product.image || "https://via.placeholder.com/200" }}
          style={styles.image}
          resizeMode="contain"
        />
        {categoryBadge && !horizontal && (
          <View style={[styles.categoryBadge, { backgroundColor: categoryBadge.color }]}>
            <Text style={styles.categoryBadgeText}>{categoryBadge.label}</Text>
          </View>
        )}

        {isWeb && (
          <View style={styles.quickShopButtonContainer}>
            <TouchableOpacity style={styles.quickShopButton} onPress={() => setShowQuickShop(true)}>
              <Text style={styles.quickShopButtonText}>Quick Shop</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      <View style={[styles.infoContainer, horizontal && styles.horizontalInfoContainer]}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => setShowQuickShop(true)}>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>
          </TouchableOpacity>

          {formatPrice(product.price)}

          {!horizontal && (
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          {product.stock <= 10 && <Text style={styles.lowStockText}>Only {product.stock} left</Text>}

          {isWeb ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.quickViewButton} onPress={() => setShowQuickShop(true)}>
                <Icon name="eye" size={14} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.mobileButtonContainer}>
              <TouchableOpacity 
                style={styles.mobileQuickViewButton} 
                onPress={() => setShowQuickShop(true)}
                activeOpacity={0.8}
              >
                <Icon name="eye" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.mobileAddButton} 
                onPress={() => addToCart(product)}
                activeOpacity={0.8}
              >
                <View style={styles.mobileAddButtonContent}>
                  <Icon name="shopping-cart" size={18} color="#fff" />
                  <Text style={styles.mobileAddButtonText}>Add to Cart</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Quick Shop Modal */}
      <Modal
        visible={showQuickShop}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQuickShop(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.quickShopModal}>
            <View style={styles.quickShopHeader}>
              <Text style={styles.quickShopTitle}>Quick Shop</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowQuickShop(false)}>
                <Icon name="times" size={18} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={[styles.quickShopContent, dynamicStyles.quickShopContent]}>
              <View style={[styles.quickShopImageContainer, dynamicStyles.quickShopImageContainer]}>
                <Image
                  source={{ uri: product.image || "https://via.placeholder.com/200" }}
                  style={styles.quickShopImage}
                  resizeMode="contain"
                />
              </View>

              <View style={[styles.quickShopInfo, dynamicStyles.quickShopInfo]}>
                <Text style={styles.quickShopName}>{product.name}</Text>
                <Text style={styles.quickShopPrice}>${product.price.toFixed(2)}</Text>

                {product.stock <= 10 && <Text style={styles.quickShopStockText}>Only {product.stock} left</Text>}

                <Text style={styles.quickShopDescription}>{product.description}</Text>

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <View style={styles.quantitySelector}>
                    <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity} disabled={quantity <= 1}>
                      <Icon name="minus" size={12} color={quantity <= 1 ? "#ccc" : "#e6799f"} />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                      <Icon name="plus" size={12} color="#e6799f" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.quickShopAddButton} onPress={handleAddToCart}>
                  <Text style={styles.quickShopAddButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    margin: 0,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    height: Platform.OS === "web" ? 420 : 300,
    width: "100%",
    maxWidth: "100%",
  },
  verticalCard: {
    flex: 1,
  },
  horizontalCard: {
    flexDirection: "row",
    width: 320,
    height: 180,
    marginRight: 24,
    borderRadius: 12,
  },
  webCard: {
    transition: "all 0.3s ease",
    cursor: "pointer",
    ...(Platform.OS === "web" && {
      ":hover": {
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        transform: "translateY(-6px)",
      },
    }),
  },
  imageContainer: {
    padding: Platform.OS === "web" ? 20 : 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "relative",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: Platform.OS === "web" ? 220 : 150,
  },
  horizontalImageContainer: {
    width: 150,
    height: 180,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    maxHeight: "100%",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 1,
  },
  categoryBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  quickShopButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
    opacity: 0,
    transition: "all 0.3s ease",
    ...(Platform.OS === "web" && {
      ":hover": {
        opacity: 1,
      },
    }),
  },
  quickShopButton: {
    backgroundColor: "rgba(168, 51, 110, 0.9)",
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
  },
  quickShopButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  infoContainer: {
    padding: Platform.OS === "web" ? 20 : 12,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: Platform.OS === "web" ? 200 : 170,
  },
  horizontalInfoContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#f0f0f0",
    height: 180,
  },
  name: {
    fontSize: Platform.OS === "web" ? 15 : 13,
    color: "#c04d7c",
    marginBottom: 4,
    lineHeight: Platform.OS === "web" ? 22 : 18,
    fontWeight: "600",
    height: Platform.OS === "web" ? 44 : 36,
    overflow: "hidden",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Platform.OS === "web" ? 10 : 4,
  },
  priceCurrency: {
    fontSize: Platform.OS === "web" ? 13 : 11,
    fontWeight: "normal",
    color: "#e84a80",
    marginTop: 2,
  },
  priceWhole: {
    fontSize: Platform.OS === "web" ? 18 : 16,
    fontWeight: "700",
    color: "#e84a80",
  },
  priceCents: {
    fontSize: Platform.OS === "web" ? 12 : 10,
    fontWeight: "normal",
    color: "#e84a80",
    marginTop: 2,
  },
  description: {
    fontSize: Platform.OS === "web" ? 13 : 11,
    color: "#666",
    marginBottom: Platform.OS === "web" ? 12 : 6,
    lineHeight: Platform.OS === "web" ? 19 : 16,
    height: Platform.OS === "web" ? 38 : 32,
    overflow: "hidden",
  },
  footer: {
    width: "100%",
    marginTop: "auto",
    paddingTop: Platform.OS === "web" ? 8 : 10,
    paddingHorizontal: Platform.OS === "web" ? 0 : 8,
  },
  lowStockText: {
    color: "#e84a80",
    fontSize: Platform.OS === "web" ? 12 : 10,
    marginBottom: Platform.OS === "web" ? 10 : 6,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Platform.OS === "web" ? 10 : 6,
  },
  quickViewButton: {
    backgroundColor: "#c04d7c",
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    backgroundColor: "#e6799f",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    height: 38,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  mobileButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  mobileQuickViewButton: {
    backgroundColor: "#c04d7c",
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  mobileAddButton: {
    backgroundColor: "#e6799f",
    borderRadius: 8,
    flex: 1,
    height: 42,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  mobileAddButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 12,
  },
  mobileAddButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  cartIcon: {
    marginRight: 6,
  },

  // Quick Shop Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(5px)",
  },
  quickShopModal: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "90%",
    maxWidth: 500,
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  quickShopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  quickShopTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  quickShopContent: {
    flexDirection: "column",
    padding: 20,
  },
  quickShopImageContainer: {
    height: 220,
    marginBottom: 20,
  },
  quickShopImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  quickShopInfo: {
    paddingHorizontal: 5,
  },
  quickShopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c04d7c",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  quickShopPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e84a80",
    marginBottom: 10,
  },
  quickShopStockText: {
    color: "#e84a80",
    fontSize: 14,
    marginBottom: 15,
    fontWeight: "500",
    backgroundColor: "rgba(232, 74, 128, 0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  quickShopDescription: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
    lineHeight: 22,
  },
  quantityContainer: {
    marginBottom: 25,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    justifyContent: "space-between",
    backgroundColor: "#f9f0f5",
    borderRadius: 8,
    padding: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  quickShopAddButton: {
    backgroundColor: "#e6799f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  quickShopAddButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
  },
})

export default ProductCard
