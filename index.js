import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC7RNTB3QtSzkUS79oKINK28AOU0aeQ0JQ",
    authDomain: "siriusproject2019-6ce50.firebaseapp.com",
    databaseURL: "https://siriusproject2019-6ce50.firebaseio.com",
    projectId: "siriusproject2019-6ce50",
    storageBucket: "siriusproject2019-6ce50.appspot.com",
    messagingSenderId: "930560241351"
};
firebase.initializeApp(config);

export default class Forgot extends React.Component {
  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = ( email, password ) => {

    try {
      if(this.state.password.length<6)
      {
        alert('パスワードが短いよー 6文字以上にしてくれー')
        return;
      }

      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)

    } catch (error) {
      console.log(error.toString());
    }

  }

  loginUser = ( email, password ) => {

    try {
      firebase.auth().signInAndRetrieveDataWithCredential(email, password).then(function (user) {
        console.log(user); 
      })
    } catch (error) {
       console.log(error.toString());
    }

  }

  async loginWithFacebook() {

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('284047535824568', { permissions: ['public_profile'] })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then((res)=>{
          console.log(res)
      })
      
      .catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View>
            <Text>Email</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })} 
            />
          </View>

          <View>
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </View>

          <TouchableOpacity style={{ marginTop: 10, backgroundColor:'green', padding:10 }}
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 10, backgroundColor:'green', padding:10 }}
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 10, backgroundColor:'green', padding:10 }}
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: 'white' }}>Login with Facebook</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
