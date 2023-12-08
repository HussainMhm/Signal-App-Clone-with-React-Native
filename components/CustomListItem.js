import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListItem, Avatar } from "@rneui/base";

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <TouchableOpacity onPress={() => enterChat(id, chatName)}>
            <ListItem key={id} bottomDivider>
                <Avatar
                    rounded
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "800" }}>{chatName}</ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                        Lorem Ipsum
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );
};

export default CustomListItem;

const styles = StyleSheet.create({});
