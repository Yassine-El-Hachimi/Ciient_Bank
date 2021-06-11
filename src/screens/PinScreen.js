import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Platform, TextInput } from 'react-native'
import styled from 'styled-components';
import {Fontisto} from '@expo/vector-icons';
import Text from '../components/Text';
import NumberPad from '../components/NumberPad';
import axios from 'axios';

const code = []

const PinScreen = ({navigation}) => {
    const [pinCount, setPinCount] = useState(0);
    const totalPins = 6;
    let codeString ="";
    useEffect(() => {
        if(pinCount === totalPins){
          for(let i = 0;i<code.length;i++){
              codeString+=code[i];
          }
          console.log(codeString);
          axios.post('http://192.168.1.6:999/api/v1/login', {
            log: 'client1',
            pas: codeString,
            typ:'client'
          })
          .then(function (response) {
            if(response.data != -1){
              navigation.navigate("Tabs")
            }
            else{
                navigation.navigate("Pin")
            }

          })
          .catch(function (error) {
            console.log(error);
          });
        }
    }, [pinCount])
    const renderPins = () => {
        const pins = []
        for(let x = 1; x <= totalPins; x++){
            pins.push(
                x <= pinCount ? (
                    <PinContainer key={x}>
                        <Pin />
                    </PinContainer>
                ) : (
                    <PinContainer key={x} />
                )
            )
        }

        return pins;
    };

    const pressKey = (_, index) => {
        setPinCount(prev => {
          if(index == 10){
            code.pop();
          }
          else{
              code.push(_);
          }
          if(prev<0){
            prev = 0;
          }


          return index != 10 ? prev + 1 : prev - 1
        })
    }

    return (
        <View style={styles.container}>
            <Text center heavy title color="#3b5998" margin="60px 0 0 20px">
                Bank Of Africa
            </Text>
            <User>
                <UserDetails>
                <SearchContainer>
                    <Search placeholder="RIB" />
                </SearchContainer>
                </UserDetails>
            </User>


            <AccessPin>
                {renderPins()}
            </AccessPin>



            <NumberPad onPress={pressKey} />
        </View>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
    padding-top: Platform.OS === "android" ? 20 : 0;
`;

const AccessPin = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 32px 64px 16px 64px;
`;


const SearchContainer = styled.View`
    background-color: #3d3d3d;
    flex-direction: row;
    align-items: center;
    padding: 0 0px;
    border-radius: 6px;
`;

const Search = styled.TextInput`
    flex: 1;
    padding: 13px 16px;
    color: #dbdbdb;
`;
const UserDetails = styled.View`
    flex: 1;
    margin: 0 20px;
`;

const User = styled.View`
    margin: 20px 10px;
    flex-direction: row;
    align-items: center;
`;
const UseTouch = styled.TouchableOpacity`
    margin: 32px 0 64px 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const PinContainer = styled.View`
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border-width: 1px;
    border-color: #5196f4;
    align-items: center;
    justify-content: center;

`;

const Pin = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #5196f4;
`;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e1e1e',
      //alignItems: 'center',
      //justifyContent: 'center',
      paddingTop: Platform.OS === "android" ? 20 : 0
    },
});


export default PinScreen;
