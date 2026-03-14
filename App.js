import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = () => {
    const regex = /^0[0-9]{9}$/;

    const cleaned = phone.replace(/\s/g,'');

    if (!regex.test(cleaned)) {
      alert("Số điện thoại không đúng định dạng");
    } else {
      navigation.navigate("Home", { phone: cleaned });
    }
  };

  const formatPhone = (text) => {

    const cleaned = text.replace(/\D/g,'');

    let formatted = cleaned;

    if (cleaned.length > 3 && cleaned.length <= 6)
      formatted = cleaned.slice(0,3) + " " + cleaned.slice(3);

    else if (cleaned.length > 6 && cleaned.length <= 8)
      formatted = cleaned.slice(0,3) + " " + cleaned.slice(3,6) + " " + cleaned.slice(6);

    else if (cleaned.length > 8)
      formatted = cleaned.slice(0,3) + " " + cleaned.slice(3,6) + " " + cleaned.slice(6,8) + " " + cleaned.slice(8,10);

    setPhone(formatted);

    const regex = /^0[0-9]{9}$/;

    if (!regex.test(cleaned)) {
      setError("Số điện thoại không đúng định dạng");
    } else {
      setError("");
    }

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        value={phone}
        onChangeText={formatPhone}
      />

      {error !== '' && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Button
        title="Tiếp tục"
        onPress={validatePhone}
      />

      <StatusBar style="auto" />

    </View>
  );
}

function HomeScreen({ route }) {

  const { phone } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
      <Text>Số điện thoại: {phone}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Đăng nhập" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

container:{
  flex:1,
  justifyContent:'center',
  padding:20,
  backgroundColor:'#f5f5f5'
},

title:{
  fontSize:24,
  marginBottom:20,
  color:'black'
},

input:{
  borderWidth:1,
  padding:10,
  marginBottom:10,
  borderColor:'#ccc',
  color:'black'
},

error:{
  color:'red',
  marginBottom:10
}

});