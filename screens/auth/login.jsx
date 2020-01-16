import React from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView, ScrollView, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';


//login and register actions
import {registerUser,login,socialLogin} from '../../store/actions/authActions';
import { connect } from 'react-redux';


const mapActions={
  registerUser,
  login,
  socialLogin
}

class LoginScreen extends React.Component{
  
  render(){
    console.log(this.props)
    return (
      <View style={styles.container}>
      <LinearGradient
      colors={['#33FFB8','#CE33FF']}
      style={styles.linearGradient}>
        <KeyboardAvoidingView  style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}} >
          <View style={styles.card} >
            <TextInput style={styles.input} placeholder='email' ></TextInput>
            <TextInput style={styles.input} placeholder='password'></TextInput>
            <View style={styles.buttonContainer} >
              <Button title="login"  color='#CE33FF'></Button>
            </View>
            <View style={styles.buttonContainer} >
              <Button title={"switch to signup"}  color='#33FFB8'></Button>
            </View>
          </View>
          <View style={{marginTop:9}}>
          <Text style={{color:'white',textAlign:'center',fontWeight:'700'}} >Or login with </Text>
          <View style={{flexDirection:'row',justifyContent:'space-around',alignSelf:'center'}}>
            <TouchableOpacity onPress={()=>this.props.socialLogin('facebook')} >
              <Ionicons size={44} name='logo-facebook' style={styles.icon}  ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.socialLogin('google')} >
              <Ionicons size={44} name='logo-google' style={styles.icon}  ></Ionicons>
            </TouchableOpacity>
          </View>
          </View>
          
        </KeyboardAvoidingView>
      </LinearGradient>
      </View>
    )
  }
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'green',
    width:'100%',
  },
  linearGradient:{
    flex:1,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center'
  },
  card:{
    backgroundColor:'transparent',
    width:'80%',
    maxHeight:400,
    maxWidth:400,
  },
  input:{
    backgroundColor:'white',
    marginTop:4,
    borderRadius:5,
    padding:7,
    borderBottomWidth:2,
  },
  buttonContainer:{
    width:'100%',
    alignSelf:'center',
    justifyContent:'space-between',
    marginTop:10,
  },
  icon:{
    color:'white',
    paddingHorizontal:8,
  }
})


export default connect(null,mapActions)(LoginScreen)