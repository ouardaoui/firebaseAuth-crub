import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';



const ShowScreen = ({ route, navigation }) => {
  const { user } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("EditScreen", { user })}>
          <Feather style={styles.header} name="edit" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  })


  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.info}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    marginRight: 20
  }
})
export default ShowScreen;