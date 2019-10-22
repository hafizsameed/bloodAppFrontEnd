import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Toast } from 'native-base';

class Signup extends React.Component {
    state = {
        bloodGroup: '',
        firstName:"",
        lastName:'',
        email:'',
        password:'',
        bloodgroups:[{value:'A+'},{value:'A-'},{value:'B+'},{value:'B-'},{value:'AB+'},{value:'AB-'},{value:'O+'}],
        loading:false
    }
    signup(){
        const {firstName,lastName,email,password,bloodGroup} = this.state;
        console.log("signing up",bloodGroup,"blodgroup");
        if(firstName!==''&&lastName!==""&&email!==""&&password!==''&&bloodgroups!==''){
            this.setState({loading:true})
        fetch("http://172.20.10.2:3001/users/register",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({firstName,lastName,email,password,bloodGroup})
        }
        )
        .then((res)=>res.json())
        .then(data=>{
            this.setState({loading:false})
            console.log(data,"data")
            Toast.show({
                text:"SignUp successfully",
                position:'bottom',
                type:'success'
            })
            this.props.navigation.navigate('login');
        })
        .catch((err)=>{
            Toast.show({
                text:err.message,
                position:'bottom',
                type:'danger'
            })
            this.setState({loading:false})
            console.log(err,'err');
        })
    }else{
        Toast.show({
            text:"fields cannot be left empty",
            position:'bottom',
            type:'danger'
        })
    }
    }
    render() {
        return (
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <View style={{ marginBottom:30,flex: 0.1, width:'100%',alignItems: 'center', justifyContent: "center",backgroundColor:'#FF3333' }}>
                    <Text style={{ fontSize: 40 ,color:'white'}}>
                        SignUp
                    </Text>
                </View>
                <View style={{ flex: 0.8, alignItems: 'center', width: '50%' }}>
                    <View style={{ flex: 0.1, width: '100%', marginBottom: 20 ,color:'black'}}>
                        <TextInput 
                        value={this.state.firstName}
                       onChangeText={(text)=>this.setState({firstName:text})}
                       style={{ borderWidth: 1,borderColor:'#E4E4E4', width: "100%",padding:10,color:'black' }} placeholder='First Name' />
                    </View>
                    <View style={{ flex: 0.1, width: '100%', marginBottom: 20 }}>
                        <TextInput 
                        value={this.state.lastName}
                        onChangeText={(text)=>this.setState({lastName:text})}
                        style={{ borderWidth: 1,borderColor:'#E4E4E4', width: "100%", padding: 10 }} placeholder='Last Name' />
                    </View>
                    <View style={{ flex: 0.1, width: '100%', marginBottom: 20 }}>
                        <TextInput 
                        value={this.state.email}
                        onChangeText={(text)=>this.setState({email:text})}
                        style={{ borderWidth: 1,borderColor:'#E4E4E4', width: "100%", padding: 10 }} placeholder='Email' />
                    </View>
                    <View style={{ flex: 0.1, width: '100%', marginBottom: 20 }}>
                        <Dropdown style={{padding:20}}
                        selectedItemColor='#E4E4E4'
                        onChangeText={(text)=>this.setState({bloodGroup:text})}
                            label='Blood Group'
                            value={this.state.bloodGroup}
                            data={this.state.bloodgroups}
                        />
                    </View>
                    <View style={{ flex: 0.1,borderColor:'#E4E4E4', width: '100%', marginBottom: 20 ,marginTop:10}}>
                        <TextInput 
                        value={this.state.password}
                        onChangeText={(text)=>this.setState({password:text})}
                        style={{ borderWidth: 1,borderColor:'#E4E4E4', width: "100%", padding: 10 }} placeholder='Password' />
                    </View>
                    <View style={{flex: 0.1, width: '100%', marginBottom: 20,justifyContent:'center',alignItems:'center' }}>
                        <TouchableOpacity 
                        onPress={this.signup.bind(this)}
                        style={{flex:1,backgroundColor:"#E4E4E4",justifyContent:'center',paddingVertical:10,paddingHorizontal:20}}>
                            <Text style={{fontSize:20}}>
                                Signup
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <ActivityIndicator style={this.state.loading?{}:{display:'none'}} size='large' color='black' />
                    </View>
                </View>
            </View> 
        );
    }
}

export default Signup;

