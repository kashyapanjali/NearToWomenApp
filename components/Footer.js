import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Dimensions } from "react-native"

const Footer = ({ isWeb }) => {
  const currentYear = new Date().getFullYear()
  const windowWidth = Dimensions.get("window").width

  // Back to top button
  const backToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  // Use a more compact footer on mobile
  const isMobile = !isWeb || windowWidth < 768

  if (isMobile) {
    return (
      <View style={styles.mobileFooter}>
        <View style={styles.mobileLinks}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.mobileLink}>
              <Text style={styles.mobileLinkText}>Your Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mobileLink}>
              <Text style={styles.mobileLinkText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mobileLink}>
              <Text style={styles.mobileLinkText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mobileLink}>
              <Text style={styles.mobileLinkText}>About</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Text style={styles.mobileCopyright}>© {currentYear} NearToWomen</Text>
      </View>
    )
  }

  return (
    <View style={styles.footerContainer}>
      {isWeb && (
        <TouchableOpacity style={styles.backToTop} onPress={backToTop}>
          <Text style={styles.backToTopText}>Back to top</Text>
        </TouchableOpacity>
      )}

      <View style={styles.mainFooter}>
        <View style={styles.footerContent}>
          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Get to Know Us</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>About NearToWomen</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Careers</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Press Releases</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Connect With Us</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Instagram</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Make Money With Us</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sell products on NearToWomen</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Become an Affiliate</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Advertise Your Products</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Let Us Help You</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Your Account</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Your Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Shipping & Returns</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomFooter}>
        <View style={styles.bottomFooterContent}>
          <TouchableOpacity style={styles.logoContainer}>
            <Text style={styles.footerLogo}>NearToWomen</Text>
          </TouchableOpacity>

          <Text style={styles.copyright}>© {currentYear}, NearToWomen.com, Inc. or its affiliates</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    position: Platform.OS === "web" ? "relative" : "relative",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backToTop: {
    backgroundColor: "#c04d7c",
    padding: 15,
    alignItems: "center",
    transition: "all 0.3s ease",
    ...(Platform.OS === "web"
      ? {
          ":hover": {
            backgroundColor: "#a8336e",
          },
        }
      : {}),
  },
  backToTopText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  mainFooter: {
    backgroundColor: "#a8336e",
    padding: 40,
    paddingBottom: 50,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  footerColumn: {
    flex: 1,
    minWidth: 180,
    maxWidth: 250,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  columnTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  footerLink: {
    color: "#f8e5ee",
    fontSize: 14,
    marginBottom: 12,
    transition: "all 0.2s ease",
    ...(Platform.OS === "web"
      ? {
          ":hover": {
            color: "white",
            transform: "translateX(3px)",
          },
        }
      : {}),
  },
  mobileFooter: {
    backgroundColor: "#a8336e",
    padding: 20,
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingBottom: 30,
  },
  mobileLinks: {
    marginBottom: 15,
  },
  mobileLink: {
    marginRight: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  mobileLinkText: {
    color: "white",
    fontSize: 14,
  },
  mobileCopyright: {
    color: "#f8e5ee",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  bottomFooter: {
    backgroundColor: "#86285a",
    paddingVertical: 25,
    alignItems: "center",
  },
  bottomFooterContent: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 10,
  },
  footerLogo: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  copyright: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
})

export default Footer
