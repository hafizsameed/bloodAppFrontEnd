import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {update_user} from  '../store/action';
import { Toast } from 'native-base';
class Login extends React.Component {
      state={
          loading:false,
          email:'',
          password:'',
      }
      componentDidMount(){
          if(this.props.user){
              this.props.navigation.navigate('Home');
          }
      }
      login(){
          const {email,password} = this.state;
          console.log("login");
          if(email!==''&&password!==''&&email!==' '&&password!==" "){

          fetch("http://172.20.10.2:3001/users/login",
          {
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({email,password})
          }
          )
          .then((res)=>res.json())
          .then(data=>{
              this.setState({loading:false})
              console.log(data,"data")
              fetch("http://172.20.10.2:3001/users/getUser",
              {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:data.email})
              })
              .then((userjson)=>userjson.json())
              .then((user)=>{console.log(user.result[0],"user")
                this.props.store_user(user.result[0])
                this.props.navigation.navigate('drawer');
            })
              .catch((e)=>{console.log(e,'e')})

          
              
          })
          .catch((err)=>{
              this.setState({loading:false})
              console.log(err,'err');
          })
        }else{
            Toast.show({
                text:"Field cannot be left empty",
                position:"bottom",
                type:"danger"
            })
        }
      }
    render() {
        return (
            <View style={{marginTop:20,flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{flex:0.1,marginBottom:40,justifyContent:"center",alignItems:'center',backgroundColor:"#FF3333",width:'100%'}}>
                    <Text style={{fontSize:40,color:'white'}}>SignIn</Text>
                   </View>
                <View style={{flex:0.9,alignItems:'center',width:'70%',marginTop:50,}}>
                    <View style={{width:'100%',marginBottom:30,borderRadius:5}}>
                        <TextInput 
                        value={this.state.email}
                        onChangeText={(text)=>this.setState({email:text})}
                        style={{borderWidth:1,borderColor:'#E4E4E4',padding:20,borderRadius:5}} placeholder='Email' />
                    </View>
                    <View style={{width:'100%',marginBottom:30,borderRadius:5}}>
                        <TextInput 
                        value={this.state.password}
                          onChangeText={(text)=>this.setState({password:text})}
                        style={{borderWidth:1,borderColor:'#E4E4E4',padding:20,borderRadius:5}} secureTextEntry={true} placeholder='password' />
                    </View>
                    <View style={{marginTop:20}}>
                        <TouchableOpacity 
                        onPress={this.login.bind(this)}
                        style={{width:'50%',backgroundColor:"#E4E4E4",paddingHorizontal:20
                        ,paddingVertical:10
                    }}>
                            <Text style={{fontSize:20}}>
                                SignIn
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <ActivityIndicator style={this.state.loading?{}:{display:"none"}} size='large' color='black'/>
                    </View>
                    <View style={{marginTop:30}}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('signup')}>
                            <Text style={{fontSize:20,color:"blue"}}>or create a new account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          );
    }
}

const mapStateToProps=(state)=>{ 
    console.log("state",state);
  return {
    user:state.user,
  }
  }
  const mapDispatchToProps=(dispatch)=>{
  return {
    store_user:(user)=>dispatch(update_user(user)),
  }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);

