import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ArtistDetailView() {
    const {id, name, image } = useLocalSearchParams()

    return (
        <View style={styles.container}>
            <Image source={{ uri: image.toString() }} style={styles.image} testID="artist-image" />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.details}>ID: {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    details: {
        fontSize: 16,
        color: "#666",
    },
});
