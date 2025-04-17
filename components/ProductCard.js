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

  // Determine image dimensions based on layout and screen
  const getImageDimensions = () => {
    if (horizontal) {
      return {
        width: 150,
        height: 150,
      }
    }

    if (isWeb) {
      if (windowWidth > 1400) return { height: 200, width: "100%" }
      if (windowWidth > 1100) return { height: 180, width: "100%" }
      return { height: 160, width: "100%" }
    }

    return { height: 140, width: "100%" }
  }

  const imageDimensions = getImageDimensions()

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
          style={[styles.image, imageDimensions]}
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
        <TouchableOpacity onPress={() => setShowQuickShop(true)}>
          <Text style={styles.name} numberOfLines={horizontal ? 2 : 2}>
            {product.name}
          </Text>
        </TouchableOpacity>

        {formatPrice(product.price)}

        {!horizontal && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}

        <View style={styles.footer}>
          {product.stock <= 10 && <Text style={styles.lowStockText}>Only {product.stock} left</Text>}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.quickViewButton} onPress={() => setShowQuickShop(true)}>
              <Icon name="eye" size={14} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
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
    margin: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  verticalCard: {
    flex: 1,
    maxWidth: "100%",
  },
  horizontalCard: {
    flexDirection: "row",
    width: 320,
    marginRight: 16,
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
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "relative",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  horizontalImageContainer: {
    width: 150,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
  },
  image: {
    resizeMode: "contain",
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
    padding: 16,
  },
  horizontalInfoContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#f0f0f0",
  },
  name: {
    fontSize: 15,
    color: "#c04d7c",
    marginBottom: 8,
    lineHeight: 22,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  priceCurrency: {
    fontSize: 13,
    fontWeight: "normal",
    color: "#e84a80",
    marginTop: 2,
  },
  priceWhole: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e84a80",
  },
  priceCents: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#e84a80",
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
    lineHeight: 19,
  },
  footer: {
    marginTop: "auto",
  },
  lowStockText: {
    color: "#e84a80",
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
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
})

export default ProductCard
