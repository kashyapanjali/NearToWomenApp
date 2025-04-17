import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const Banner = ({ isWeb }) => {
  const windowWidth = Dimensions.get("window").width
  const bannerHeight = isWeb ? (windowWidth > 1200 ? 350 : windowWidth > 768 ? 280 : 200) : 180

  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1607006483731-fc2a35965d33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        }}
        style={[styles.banner, { height: bannerHeight }]}
        resizeMode="cover"
        imageStyle={styles.bannerImage}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.subtitle}>EXCLUSIVE OFFERS</Text>
            <Text style={styles.title}>Women's Essentials</Text>
            <Text style={styles.description}>Wellness & safety products at great prices</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Shop now</Text>
              <Icon name="arrow-right" size={14} color="white" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {isWeb && (
        <View style={styles.indicators}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
      )}

      {isWeb && (
        <View style={styles.navButtons}>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="chevron-left" size={16} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="chevron-right" size={16} color="#555" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    position: "relative",
    marginBottom: 30,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  banner: {
    width: "100%",
    justifyContent: "center",
  },
  bannerImage: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: "rgba(168, 51, 110, 0.15)",
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  content: {
    maxWidth: 550,
  },
  subtitle: {
    color: "#e84a80",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  title: {
    color: "#a8336e",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textShadow: "0 1px 2px rgba(255,255,255,0.8)",
  },
  description: {
    color: "#555",
    fontSize: 18,
    marginBottom: 25,
    textShadow: "0 1px 1px rgba(255,255,255,0.8)",
    maxWidth: 400,
  },
  button: {
    backgroundColor: "#e6799f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 8,
  },
  buttonIcon: {
    marginTop: 1,
  },
  indicators: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#a8336e",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
  },
  navButtons: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
})

export default Banner
