import { useEffect, useLayoutEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import { ListItem, Avatar } from "@rneui/base";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import CustomListItem from "../components/CustomListItem";

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    console.log(chats);

    function signOutHandler() {
        signOut(FIREBASE_AUTH).then(() => {
            navigation.replace("Login");
        });
    }

    function enterChatHandler(id, chatName) {
        navigation.navigate("Chat", {
            id,
            chatName,
        });
    }

    // Fetch chats from Firebase
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(FIREBASE_DB, "chats"));
                const fetchedChats = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setChats(fetchedChats);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [chats]);

    // Set navigation options
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutHandler}>
                        <Avatar
                            rounded
                            source={{
                                uri: FIREBASE_AUTH?.currentUser?.photoURL,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SimpleLineIcons
                            name="pencil"
                            size={24}
                            color="black"
                            onPress={() => navigation.navigate("AddChat")}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.length ? (
                    chats.map(({ id, data }) => (
                        <CustomListItem
                            key={id}
                            id={id}
                            chatName={data.chatName}
                            enterChat={enterChatHandler}
                        />
                    ))
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
