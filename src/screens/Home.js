import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { getAuth } from "firebase/auth";

const Home = () => {

  const navigation = useNavigation();
  const firebaseAuth = getAuth();
  const user = firebaseAuth.currentUser;

  const signOut = async () => {
    await SecureStore.deleteItemAsync("user");
    await firebaseAuth.signOut();
  }

  const goToProfile = () => {
    navigation.navigate("Profile");
  }

  return (
    <View>
      <Text>Home</Text>
      { user && <Text>{user.email}</Text> }
      <Button title="Atualizar Perfil" onPress={goToProfile}></Button>
      <Button title="Sair" onPress={signOut}></Button>
    </View>
  );
}

export default Home;