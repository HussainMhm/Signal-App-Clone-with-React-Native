import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";

import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase";

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);

    async function createChatHandler() {
        await addDoc(collection(FIREBASE_DB, "chats"), {
            chatName: input,
        })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => alert(error.message));
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                autoFocus
                onSubmitEditing={createChatHandler}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon
                        name="wechat"
                        type="antdesign"
                        size={24}
                        color="black"
                        style={{ marginLeft: 10, marginRight: 10 }}
                    />
                }
            />
            <Button disabled={!input} title="Create new Chat" onPress={createChatHandler} />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
    },
});
