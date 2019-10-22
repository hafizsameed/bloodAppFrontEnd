import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {Toast} from 'native-base'
import {connect} from 'react-redux';

class Home extends React.Component {
    state={
        posts:[]
    }
    getAllPosts(){
        console.log('getting posts');
        
        fetch('http://172.20.10.2:3001/posts/getAllPosts', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"data");
        this.setState({posts:data.result});
        })
        .catch(e=>console.log(e,'e'))
    }
    componentDidMount(){
        this.getAllPosts();
    }
    addVolunteer(post){
        if(post.volunteer.length==post.units){
            Toast.show({
                text: "max Volunteer reached",
                position: "bottom",
                type:"danger"
              })
        }
        else{
            
        console.log('adding as volunteer');
        const myId=this.props.user._id;
        fetch('http://172.20.10.2:3001/posts/updatePost', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({
               id:post._id,
               volunteer:{
                   id:myId,
                   firstName:this.props.user.firstName,
                   lastName:this.props.user.lastName,
                   bloodGroup:this.props.user.bloodGroup,
                   status:'Not Donated'
               }
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"post updated");
            this.getAllPosts();
            Toast.show({
                text:"volunteer added",
                position:"bottom",
                type:"success"
            })
        })
        .catch(e=>console.log(e,'e'))
    }
    }
    detailScreen(e){
        this.props.navigation.navigate('DetailedScreen',{id:e._id,volunteerLen:e.volunteer.length,comments:e.comments})
    }

    componentDidMount(){
        this.getAllPosts();
    }
  render(){
    return (
     <View style={{flex:1,marginTop:20}}>
         <View style={{flex:0.1,flexDirection:"row",backgroundColor:"#FF3333",justifyContent:'center',alignItems:'center'}}>
             <TouchableOpacity 
             onPress={()=>this.props.navigation.openDrawer()}
             style={{flex:0.1,paddingHorizontal:5}}>
            <Feather name="menu" size={40} color="white" />
             </TouchableOpacity>
             <View style={{flex:0.8,justifyContent:"center",alignItems:'center'}}>
                 <Text style={{fontSize:25,color:"white"}}>Feeds</Text>
             </View>
             <View style={{flex:0.1}}></View>
         </View>
        <ScrollView style={{flex:0.8,borderWidth:1}}>
            {this.state.posts.map((e,i)=>{
                return <TouchableOpacity 
                onPress={this.detailScreen.bind(this,e)}
                key={i} style={{margin:10,backgroundColor:'#F9F9F9',padding:10}}>
                <View  style={{padding:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>
                        {e.firstName} {e.lastName}
                    </Text>
                    <Text style={{fontSize:20}}>
                        {e.units} units of {e.bloodGroup} Blood required
                    </Text>
                    <Text style={{fontSize:20}}>
                        At {e.hospital} Hospital for my friend
                    </Text>
                    <Text style={{fontSize:20}}>
                       Contact No: {e.contact}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Additional detail: {e.detail}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Volunteers uptill now : {e.volunteer.length}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Current requirement :  {e.units-e.volunteer.length}
                    </Text>
                </View>
                <View style={{flex:0.1,flexDirection:'row',marginBottom:10}}>
            <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity 
               onPress={this.addVolunteer.bind(this,e)} 
                style={{backgroundColor:'#E4E4E4',width:'90%',justifyContent:'center',alignItems:'center',paddingVertical:10,padding:5}}>
                    <Text>
                    Volunteer
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity 
                onPress={this.detailScreen.bind(this,e)}
                style={{backgroundColor:'#E4E4E4',width:'90%',justifyContent:'center',alignItems:'center',paddingVertical:10,padding:5}}>
                    <Text>
                    Comment
                    </Text>
                </TouchableOpacity>
            </View>
                </View>
            </TouchableOpacity>
            })}
            
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
export default connect(mapStateToProps,)(Home);


