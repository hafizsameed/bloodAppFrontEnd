import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import { Toast } from 'native-base';

class PostReq extends React.Component {
  constructor(){
      super();
        // this.countries = csc.getAllCountries();
      this.state={
        bloodGroup:'',
        bloodgroups:[{value:'A+'},{value:'A-'},{value:'B+'},{value:'B-'},{value:'AB+'},{value:'AB-'}],
        countries:[],
        relations:[{value:'Father'},{value:'Mother'},{value:'Friend'},{value:'Brother'},{value:'Neighbour'},
        {value:'Son'},{value:'None'}],
        loading:false,
        country:"Pakistan",
        city:'karachi',
        state:'sindh',
        urgency:'urgent',
        hospital:'aga khan',
        relation:'none',
        contactNo:'12345678',
        detail:'hello',
        units:'3'
  }
  }


    addPost(){
        console.log('adding post');
        this.setState({loading:true})
        var firstName = this.props.user.firstName
        var lastName= this.props.user.lastName
         const userId=this.props.user._id;
        const {units,hospital,country,city,state,detail,urgency,relation,contactNo,bloodGroup} = this.state;
        console.log(this.props.user.token,'token');
        fetch('http://172.20.10.2:3001/posts/addPost', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({
                firstName,
                lastName,
                units,
                country,
                hospital,
                city,
                state,
                detail,urgency,
                relation,userId,
                contact:contactNo,
                bloodGroup
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"data")
            this.setState({loading:false});
            Toast.show({
                text:"Post added successfully" ,
                position:"bottom",
                type:"success"
            })
            this.props.navigation.navigate('Home');
    })
        .catch((e)=>{
            console.log(e,'e');
            this.setState({loading:false});
            Toast,show({
                text:"Post failed" ,
                position:"bottom",
                type:"danger"
            })
        })
    }
    render(){
    return (
     <View style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
         <View style={{flex:0.1,flexDirection:"row",backgroundColor:"#FF3333",justifyContent:'center',alignItems:'center'}}>
             <TouchableOpacity 
             onPress={()=>this.props.navigation.openDrawer()}
             style={{flex:0.1,paddingHorizontal:5}}>
            <Feather name="menu" size={40} color="white" />
             </TouchableOpacity>
             <View style={{flex:0.8,justifyContent:"center",alignItems:'center'}}>
                 <Text style={{fontSize:25,color:"white"}}>Add Post</Text>
             </View>
             <View style={{flex:0.1}}></View>
         </View>
        <ScrollView style={{flex:0.8,width:'80%'}}>
            <View style={{flex:0.1,marginBottom:10}}>
            <Dropdown style={{padding:20}}
                        // value={this.state.bloodGroup}
                        selectedItemColor='#E4E4E4'
                        onChangeText={(text)=>this.setState({bloodGroup:text})}
                            label={this.state.bloodGroup}
                            data={this.state.bloodgroups}
                        />
            </View>
            <View style={{flex:0.2,marginBottom:10,borderWidth:1,padding:10}}>
                <TextInput 
                value={this.state.units}
                onChangeText={(text)=>this.setState({units:text})}
                style={{fontSize:17}}  placeholder='No of Units Required'/>
            </View>
            <View style={{flex:0.1,marginBottom:10}}>
            <Dropdown style={{padding:20}}
              value={this.state.urgency}
                        selectedItemColor='#E4E4E4'
                        onChangeText={(text)=>this.setState({urgency:text})}
                            label={this.state.urgency}
                            data={this.state.allurgencies}
                        />
            </View>
            <View style={{flex:0.2,marginBottom:10,borderWidth:1,padding:10}}>
                <TextInput 
                value={this.state.country}
                onChangeText={(text)=>this.setState({country:text})}
                style={{fontSize:17}}  placeholder='Country'/>
            </View>
            <View style={{flex:0.2,marginBottom:10,borderWidth:1,padding:10}}>
                <TextInput 
                value={this.state.state}
                onChangeText={(text)=>{this.setState({text})}}
                style={{fontSize:17}}  placeholder='State'/>
            </View>
            <View style={{flex:0.2,marginBottom:10,borderWidth:1,padding:10}}>
                <TextInput 
                value={this.state.city}
                onChangeText={(text)=>this.setState({city:text})}
                style={{fontSize:17}}  placeholder='City'/>
            </View>
            <View style={{flex:0.2,marginBottom:10,borderWidth:1,padding:10}}>
                <TextInput 
                value={this.state.hospital}
                onChangeText={(text)=>this.setState({hospital:text})}
                style={{fontSize:17}}  placeholder='Hospital'/>
            </View>
            <View style={{flex:0.1,marginBottom:10}}>
            <Dropdown style={{padding:20}}
                        value={this.state.relation}
                        selectedItemColor='#E4E4E4'
                        onChangeText={(text)=>{
                            this.setState({relation:text})
                            console.log(text,"text");
                    }}
                            label='Relation'
                            data={this.state.relations}
                        />
            </View>
            <View style={{flex:0.2,marginBottom:10,borderWidth:1,padding:10}}>
                <TextInput
                value={this.state.contactNo}
                onChangeText={(text)=>{this.setState({contactNo:text})}}
                style={{fontSize:17}}  placeholder='Contact Number'/>
            </View>
            <View style={{flex:0.5,marginBottom:10,borderWidth:1,padding:10}}>
                <TextInput 
                value={this.state.detail}
                onChangeText={(text)=>this.setState({detail:text})}
                multiline={true} numberOfLines={4} style={{fontSize:17}}  placeholder='Additional details'/>
            </View>
            <View style={{flex:0.1,width:'50%',alignSelf:"center"}}>
                <TouchableOpacity 
                disabled={this.state.loading}
                onPress={this.addPost.bind(this)}
                style={{backgroundColor:'#FF3333',justifyContent:'center',alignItems:'center'
            ,padding:10}}>
                    {!!this.state.loading?
                    <ActivityIndicator size='small' color='white' />
                    :<Text style={{fontSize:20,color:'white'}}>
                        Post
                    </Text>}
                </TouchableOpacity>
            </View>
            <View>
                    
            </View>
        </ScrollView>
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
export default connect(mapStateToProps,)(PostReq);

