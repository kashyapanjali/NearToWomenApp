import { View, Text, StyleSheet, Platform, Dimensions } from "react-native"

const Footer = ({ isWeb }) => {
  const currentYear = new Date().getFullYear()
  const windowWidth = Dimensions.get("window").width
  const isMobile = !isWeb || windowWidth < 768

  return (
    <View style={[styles.footer, isMobile && styles.mobileFooter]}>
      <View style={styles.footerContent}>
        <Text style={[styles.footerText, isMobile && styles.mobileText]}>
          NearToWomen
        </Text>
        <Text style={[styles.copyright, isMobile && styles.mobileCopyright]}>
          © {currentYear} NearToWomen. All rights reserved.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#a8336e",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mobileFooter: {
    height: 50,
  },
  footerContent: {
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  mobileText: {
    fontSize: 14,
  },
  copyright: {
    color: "#f8e5ee",
    fontSize: 13,
  },
  mobileCopyright: {
    fontSize: 12,
  }
})

export default Footer
