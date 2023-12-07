import React, { useLayoutEffect } from "react";
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

import { FIREBASE_AUTH } from "../firebase";
import { signOut } from "firebase/auth";

import CustomListItem from "../components/CustomListItem";

const HomeScreen = ({ navigation }) => {
    function signOutHandler() {
        signOut(FIREBASE_AUTH).then(() => {
            navigation.replace("Login");
        });
    }

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
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
