import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SignInSignup = ({ onClose, onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    if (isSignUp) {
      // Handle sign up logic here
      Alert.alert("Success", "Account created!");
      onAuthenticated();
    } else {
      // Handle sign in logic here
      Alert.alert("Success", "Logged in!");
      onAuthenticated();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>NearToWomen</Text>
          <Text style={styles.tagline}>Your Women's Wellness Destination</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</Text>
          <Text style={styles.subtitle}>
            {isSignUp ? "Join our community of women" : "Sign in to your account"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{isSignUp ? "Create Account" : "Sign In"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleForm} style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <Text style={styles.toggleLink}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#a8336e",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#a8336e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    color: "#666",
    fontSize: 14,
  },
  toggleLink: {
    color: "#a8336e",
    fontWeight: "bold",
  },
});

export default SignInSignup;
