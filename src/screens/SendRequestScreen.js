import React, {useState} from 'react'
import { StyleSheet, View, Platform, Alert } from 'react-native'
import styled from "styled-components";
import Text from '../components/Text';
import {MaterialIcons} from '@expo/vector-icons';
import NumberPad from '../components/NumberPad';
import info from './info';
import axios from 'axios';

const SendRequestScreen = () => {
    const [amount, setAmount] = useState("");
    const [rib, setRib] = useState("");

    const convertToMad = (currentAmount) => {

        const newAmount = currentAmount

        return newAmount.toLocaleString("en-US", {styled: "currency", currency: "MAD"});
    }

    const virement = () => {
      console.log(info)
     var date = new Date();
     var month = new Date().getMonth() + 1;
     var year = new Date().getFullYear();
     var a = parseFloat(amount+'.0');
     console.log(amount+'.0')
     var _date = year + '-' + month +'-' + date;

      if(rib !="" && amount != "" && info[0] != rib){
        axios.post('http://192.168.43.39:999/api/v1/virement/add', {

          "virement":date,
          "montant":amount+'.0',
          "compte_deb":{"id":parseInt(info[0])},
          "compte_cred":{"id":parseInt(rib)}
        })

        .then(function (response) {
          Alert.alert(
        "Success",
        "Votre virement a bien ete traité ",
        [

          { text: "OK" }
        ]
      );
      setVir(0);
      setRib(0);


        })
        .catch(function (error) {
            console.log(error);
        });
      }
      else{
        Alert.alert(
      "Attention",
      "Remplir tous les champs",
      [

        { text: "OK" }
      ]
    );
      }
    }
    const pressKey = (item, index) => {
        setAmount((prev) => {
            return index != 10 ? prev + item : prev.slice(0, prev.length - 1);
        })
    }

    return (
        <View style={styles.container}>

            <Amount>
                <Text title heavy>{convertToMad(amount)} MAD</Text>
                <Text bold color="#727479">Choose amount to send</Text>
            </Amount>

            <User>
                <ProfilePhoto source={require('../../assets/profile.png')} />
                <UserDetails>
                <SearchContainer>
                    <Search  onChangeText={rib => setRib(rib)} placeholder="RIB" />
                </SearchContainer>
                </UserDetails>
            </User>

            <Send onPress={virement}>
                <Text medium heavy>Send {convertToMad(amount)} MAD </Text>
            </Send>

            <NumberPad onPress={pressKey} />

            <StatusBar barStyle="light-content" />
        </View>
    )
}

const Amount = styled.View`
    margin-top: 50px;
    align-items: center;
    justify-content:center

`;

const ProfilePhoto = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 12px;
`;
const SearchContainer = styled.View`
    background-color: #3d3d3d;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    border-radius: 6px;
`;

const Search = styled.TextInput`
    flex: 1;
    padding: 8px 16px;
    color: #dbdbdb;
`;

const User = styled.View`
    margin: 32px 16px;
    flex-direction: row;
    align-items: center;
`;

const UserDetails = styled.View`
    flex: 1;
    margin: 0 16px;
`;

const Send = styled.TouchableOpacity`
    margin: 0 16px 16px 16px ;
    background-color: #5196f4;
    padding: 16px 32px;
    align-items: center;
    border-radius: 12px;
`;

const StatusBar = styled.StatusBar``;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        // alignItems: 'center',
        // justifyContent: 'center',
        //paddingTop: Platform.OS === "android" ? 22 : 0
      },
})

export default SendRequestScreen;
