
import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity ,Image} from 'react-native'
import {connect} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {remove_user} from  '../store/action';
 class DrawerComponent extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })
logout(){
    console.log('loging out');
    this.props.removeUser();
    this.props.navigation.navigate('Auth');
    
}
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{flex:0.8,justifyContent:'flex-end',alignItems:'flex-end'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.closeDrawer()}>
                <Ionicons name='ios-close' size={40} color='white'/>
                </TouchableOpacity>
                </View>
                <Text style={{marginTop:20,fontSize:25,color:'white',fontWeight:'bold'}}>{this.props.user.firstName} {this.props.user.lastName}</Text>
                <Text style={{marginTop:20,fontSize:20,color:'white'}}>Blood Group : {this.props.user.bloodGroup}</Text>
            </View>
            <View style={styles.screenContainer}>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Home') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]} 
                    onPress={this.navigateToScreen('Home')}>Home</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Add Post') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Add Post') ? styles.selectedTextStyle : null]} 
                    onPress={this.navigateToScreen('Add Post')}>Add Post</Text>
                </View>
                <TouchableOpacity 
                 onPress={()=>this.logout()}
                style={[styles.screenStyle, (this.props.activeItemKey=='Logout') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=="Logout") ? styles.selectedTextStyle : null]}>Logout</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
        justifyContent:"center",
        alignItems:'center'

    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        marginBottom:10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 16,
        marginLeft: 20, 
        textAlign: 'center',
        color:"white"
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: 'white'
    },
    activeBackgroundColor: {
        backgroundColor: '#E4E4E4'
    }
});


const mapStateToProps=(state)=>{ 
    console.log("state",state);
  return {
    user:state.user,
  }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      removeUser:()=>dispatch(remove_user()),
    }
    }

export default connect(mapStateToProps,mapDispatchToProps)(DrawerComponent);