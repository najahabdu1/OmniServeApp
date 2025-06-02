import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/images/start.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>WELCOME TO OMNISERVE</Text>
          <Text style={styles.subtitle}>
            Discover everything you need in one place{"\n"}
            products service and more.
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 24,
    paddingHorizontal: 18,
    width: 340,
    alignItems: "center",
    shadowColor: "#",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    //elevation: 5,
  },
  image: {
    width: 300,
    height: 520,
    borderRadius: 16,
    marginBottom: 24,
  },
  content: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 36,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#444",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#222",
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#159A8C",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});