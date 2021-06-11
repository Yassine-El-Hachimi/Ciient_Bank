//import { Header } from '@react-navigation/stack';
import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import Text from "../components/Text";
import {FontAwesome5, MaterialIcons, AntDesign} from "@expo/vector-icons";
import purchasesData from "../../purchasesData";
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';
import Consts from '../../Consts';
import Moment from 'moment';
import info from './info';


const HomeScreen = ({navigation}) => {

    const [solde, setSolde] = useState("");
    const [user, setUser] = useState([]);
    const [vir, setVir] = useState("");
    const [nom, setNom] = useState("");

    useEffect(()=>{
      const unsubscribe = navigation.addListener('focus', () => {
        axios.get("http://192.168.43.39:999/api/v1/client/find/compte/3").then(res =>{
            const compte = res.data;
            setUser(compte);
        }).catch(error => {console.log(error)});
        axios.get("http://192.168.43.39:999/api/v1/compte/find/virement/5").then(res =>{
            const virement = res.data;
            setVir(virement);
        }).catch(error => {console.log(error)});


      });
      return unsubscribe;
    },[navigation])
    const setVariable = ()=>{
      info.pop();
      info.push(user.id);
      return(
        <Header>
            <ProfilePhoto source={require('../../assets/bank.png')} />
            <Welcome>
                <Text heavy medium>Welcome </Text>
                <Text>Bank of Afirica</Text>
            </Welcome>
            <FontAwesome5 name="sign-out-alt" size={24} color="#565656"  onPress={() => navigation.navigate('Pin')} />
        </Header>
      )
    }

    const renderPurchases = ({item}) => {

        return(
            <Purchase>
                <PurchaseInfo>
                    <Text heavy>{item.compte_cred.client.nom} {item.compte_cred.client.prenom}</Text>
                    <Text bold margin="2px 0 2px 0">{ Moment(item.virement).format('DD MMM YYYY HH:mm')}</Text>
                </PurchaseInfo>
                <Text heavy>{item.montant} MAD</Text>
            </Purchase>
        );
    };

    return (
        <View style={styles.container}>
            {setVariable()}
            <Text center title black>{user.solde} MAD</Text>

            <Purchases
                ListHeaderComponent={
                    <>
                        <TransactionsHeader>
                            <Text> Historique des Transactions</Text>
                            <MaterialIcons name="sort" size={24} color="#5196f4" />
                        </TransactionsHeader>
                        <SearchContainer>
                            <AntDesign name="search1" size={18} color="#5196f4" />
                            <Search placeholder="Search Transactions" />
                        </SearchContainer>
                    </>
                }
                data={vir}
                renderItem={renderPurchases}
                showsVerticalScrollIndicator={false}
            />

            <StatusBar StatusBar="light-content" />
        </View>
    )
}

const StatusBar = styled.StatusBar``;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 16px 16px 32px 16px;
`;

const ProfilePhoto = styled.Image`
    width: 40px;
    height: 40px;
    margin-top: 40px;
    border-radius: 20px;
`;

const Welcome = styled.View`
    flex: ;
    margin-top: 40px;
`;

const Chart = styled.View`
    margin: 20px 0;
`;

const Purchases = styled.FlatList`
    background-color: #2c2c2c;
    padding: 16px;
`;

const TransactionsHeader = styled.View`
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
`;

const SearchContainer = styled.View`
    background-color: #3d3d3d;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    border-radius: 6px;
    margin: 16px 0;
`;

const Search = styled.TextInput`
    flex: 1;
    padding: 8px 16px;
    color: #dbdbdb;
`;

const Purchase = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #393939;
    padding-bottom: 12px;
    margin-bottom: 12px;
`;

const PurchaseInfo = styled.View``;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    //   alignItems: 'center',
    //   justifyContent: 'center',
      //paddingTop: Platform.OS === "android" ? 20 : 0
    },
});

export default HomeScreen;
