import { View, Text, Button, TextInput, Alert } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";

const Profile = () => {

  const firebaseAuth = getAuth();
  const user = firebaseAuth.currentUser;

  const [name, setName] = useState();

  const updateUserProfile = () => {
    console.log("Updating...");
    updateProfile(user, {
      displayName: name
    }).then(() => {
      Alert.alert('Aplicativo', 'Perfil atualizado!', [
        { text: 'OK', onPress: () => { } },
      ]);
    }).catch((error) => {
      console.error(error);
      Alert.alert('Aplicativo', 'Não foi possível atualizar o perfil!', [
        { text: 'OK', onPress: () => { } },
      ]);
    })
  }

  return (
    <View>
      <Text>Perfil</Text>
      <TextInput
        value={user.displayName}
        onChangeText={setName}
      ></TextInput>
      <Button title="Salvar" onPress={updateUserProfile}></Button>
    </View>
  );
}

export default Profile;