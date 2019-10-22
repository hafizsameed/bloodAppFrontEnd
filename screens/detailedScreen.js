import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import { Feather,MaterialIcons } from '@expo/vector-icons';
import {Toast} from 'native-base'
import {connect} from 'react-redux';

class DetailedScreen extends React.Component {
    state={
        posts:[],
        post:{}
    }
  sendComment(){
    const postId = this.props.navigation.getParam('id');
      const message=this.state.message;
    console.log('sending comment')
        const myId=this.props.user._id;
        fetch('http://172.20.10.2:3001/posts/addComment', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({
               id:postId,
               comment:{
                   id:myId,
                   firstName:this.props.user.firstName,
                   lastName:this.props.user.lastName,
                   message:message,
               }
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"comment sent");
            Toast.show({
                text:"comment sent",
                position:"bottom",
                type:"success"
            })
        })
        .catch(e=>{
            console.log(e,'e');
            Toast.show({
                text:"comment not sent",
                position:"bottom",
                type:"danger"
            })
        })
  }
    componentDidMount(){
        this.getPost();
        console.log(this.props.user)
    }
    getPost(){
        const postId = this.props.navigation.getParam('id');
        const volLen = this.props.navigation.getParam('volunteerLen');
        console.log(volLen,'vol len');
            this.setState({volLen})
        console.log(postId,'postId');
        fetch('http://172.20.10.2:3001/posts/getPost', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({id:postId})
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.result[0].comments,"comments");
        this.setState({post:data.result[0]});
        })
        .catch(e=>console.log(e,'e'))
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
                 <Text style={{fontSize:25,color:"white"}}>Detailed Screen</Text>
             </View>
             <View style={{flex:0.1}}></View>
         </View>
         {!!this.state.post?
        <ScrollView style={{flex:0.7,borderWidth:1}}>
    
                 <View  style={{margin:10,backgroundColor:'#F9F9F9',padding:10}}>
                <View  style={{padding:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>
                        {this.state.post.firstName} {this.state.post.lastName}
                    </Text>
                    <Text style={{fontSize:20}}>
                        {this.state.post.units} units of {this.state.post.bloodGroup} Blood required
                    </Text>
                    <Text style={{fontSize:20}}>
                        At {this.state.post.hospital} Hospital for my friend
                    </Text>
                    <Text style={{fontSize:20}}>
                       Contact No: {this.state.post.contact}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Additional detail: {this.state.post.detail}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Volunteers uptill now : {this.state.volLen}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Current requirement :  {this.state.post.units-this.state.volLen}
                    </Text>
                </View>
            </View>
            <View style={{flex:0.1,flexDirection:'row',marginBottom:10,paddingHorizontal:20,justifyContent:'center'
        ,alignItems:'center'}}>
                    <Text style={{fontSize:20}}>Volunteers</Text>
                </View>
            <View style={{margin:10,backgroundColor:'#F9F9F9',padding:10}}>
                {!!this.state.post.volunteer && this.state.post.volunteer.map((e,i)=>{
                    return <View key={i} style={{borderWidth:1,padding:20,marginBottom:10}}>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>{e.firstName} {e.lastName}</Text>
                            <Text>Blood: {e.bloodGroup}</Text>
                            <Text style={{fontSize:20}}>{e.status}</Text>
                        </View>
                })}
            </View>
            <View style={{flex:0.1,flexDirection:'row',marginBottom:10,paddingHorizontal:20,justifyContent:'center'
        ,alignItems:'center'}}>
                    <Text style={{fontSize:20}}>Comments</Text>
                </View>
                <View style={{margin:10,backgroundColor:'#F9F9F9',padding:10}}>
                   {this.state.post.comments.map((e)=>{
                       return <View style={{flex:0.2,padding:20}}>
                            <Text>{e.firstName} {e.lastName} </Text>
                            <Text>{e.message}</Text>
                           </View>
                   })}
                    </View>
        </ScrollView>
        :<View>
<ActivityIndicator  size='large' color='black'/>
            </View>}
            <View style={{flex:0.1,borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:0.9}}>
                    <TextInput 
                    onChangeText={(text)=>this.setState({message:text})}
                    style={{width:'100%'}} placeholder='add comment' />
                </View>
                <View>
                    <TouchableOpacity onPress={this.sendComment.bind(this)}>
                <MaterialIcons name='send' size={30} color='#FF3333'/>
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
export default connect(mapStateToProps,)(DetailedScreen);


