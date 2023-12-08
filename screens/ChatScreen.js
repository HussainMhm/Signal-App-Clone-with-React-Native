import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    SafeAreaView,
    TextInput,
    Keyboard,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";

// import firebase from "firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
    const { id, chatName } = route.params;
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                title: chatName,
                headerBackTitleVisible: false,

                headerLeft: () => (
                    <TouchableOpacity>
                        <Ionicons
                            name="arrow-back"
                            size={30}
                            color="white"
                            onPress={navigation.goBack}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 80,
                        }}
                    >
                        <TouchableOpacity>
                            <FontAwesome name="video-camera" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="call" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ),
            },
            [navigation]
        );
    });

    useLayoutEffect(() => {
        const chatId = id;

        const q = query(
            collection(FIREBASE_DB, `chats/${chatId}/messages`),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        return unsubscribe;
    }, [id]);

    async function sendMessageHandler() {
        Keyboard.dismiss();

        const user = FIREBASE_AUTH.currentUser;

        if (user) {
            const docRef = await addDoc(collection(FIREBASE_DB, `chats/${id}/messages`), {
                timestamp: serverTimestamp(),
                message: input,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
        }

        setInput("");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={90}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ padding: 20 }}>
                            {messages.map(({ id, data }) =>
                                data.email === FIREBASE_AUTH.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-15}
                                            right={-15}
                                            rounded
                                            //WEB
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-15}
                                            left={-15}
                                            rounded
                                            //WEB
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                left: -5,
                                            }}
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            )}
                        </ScrollView>

                        <View style={styles.footer}>
                            <TextInput
                                placeholder="Signal Message"
                                style={styles.textInput}
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessageHandler}
                            />
                            <TouchableOpacity onPress={sendMessageHandler}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        flex: 1,
        bottom: 0,
        height: 40,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#286BE6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
});
