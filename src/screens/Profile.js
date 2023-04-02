import { View, Text, Button, TextInput, Alert, Image, Platform} from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';

  



const Profile = () => {
  const [image, setImage] = useState(null);
  const firebaseAuth = getAuth();
  const user = firebaseAuth.currentUser;
  const [name, setName] = useState();
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
}

  const updateUserProfile = () => {
    console.log("Updating...");
    updateProfile(user,image, {
      displayName: name,
      displayName: image,
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
  };

  return (
    <View>
      <Text>Perfil</Text>
   
      <TextInput
        value={user.displayName}
        onChangeText={setName}
      ></TextInput>
      {image && <Image source={{ uri: image }} style={{ width: 120, height: 120}} />}
    
      <Button title="Selecione uma imagem da sua galeria" onPress={pickImage} />
      
      <Button title="Salvar" onPress={updateUserProfile}></Button>
      
    </View>
  );
}

export default Profile;