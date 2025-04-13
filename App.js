import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to NearToWomenApp 👩‍⚕️💜</Text>
			<Text style={styles.subtitle}>
				Your health companion app begins here!
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#663399",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#555",
	},
});
