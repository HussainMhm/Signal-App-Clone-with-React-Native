import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "@rneui/base";

const CustomListItem = ({ id, chatName, enterChatHandler  }) => {
    return (
        <ListItem>
            <Avatar
                rounded
                source={{
                    uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>YouTube Chat</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    This is a test subtitle for YouTube Chat App Clone in React Native This is a
                    test subtitle for YouTube Chat App Clone in React Native
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem;

const styles = StyleSheet.create({});
