import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "@rneui/base";
import { StatusBar } from "expo-status-bar";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signInHandler() {
        console.log("Sign in");
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png",
                }}
                style={{ width: 200, height: 200, borderRadius: 20, margin: 20 }}
            />

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <Button containerStyle={styles.button} onPress={signInHandler} title="Login" />
            <Button
                containerStyle={styles.button}
                onPress={() => navigation.navigate("Register")}
                type="outline"
                title="Register"
            />

            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        marginTop: 10,
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
