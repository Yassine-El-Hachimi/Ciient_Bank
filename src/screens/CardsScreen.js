import React from 'react'
import { StyleSheet, View } from 'react-native'
import styled from "styled-components";
import Text from '../components/Text';

const CardsScreen = () => {
    const myCards = [
        {
            id: "1",
            color: "#ffff",
            number: "Maroc telecom",
            exp: "10/2020",
            logo: require("../../assets/iam.png"),
        },
        {
            id: "2",
            color: "#9d3493",
            number: "Inwi",
            exp: "08/2022",
            logo: require("../../assets/inwi.jpg"),
        },
        {
            id: "3",
            color: "#ff6600",
            number: "Orange",
            exp: "04/2023",
            logo: require("../../assets/orange.jpg"),
        },
        {
            id: "4",
            color: "#974FF2",
            number: "Assurance",
            exp: "12/2020",
            logo: require("../../assets/mastercard2.png"),
        },
    ]

    const renderCard = ({item}) =>
        <CardContainer>
            <CardInfo>
                <CardLogoContainer bgColor={item.color}>
                    <CardLogo source={item.logo} resizeMode="contain" />
                </CardLogoContainer>
                <CardDetails>
                    <Text>
                        <Text medium heavy>{item.number}</Text>
                    </Text>
                </CardDetails>
                <Update>
                    <Text heavy>Effectuer</Text>
                </Update>
            </CardInfo>
        </CardContainer>;


    return (
        <View style={styles.container}>
            <Text center large heavy margin="20px 0 0 0">Recharge & Facture</Text>

            <Cards data={myCards} renderItem={renderCard} />

            <StatusBar barStyle="light-content" />
        </View>
    )
}

const Cards = styled.FlatList`
    padding: 0 8px;
    margin-top: 32px;
`;

const CardContainer = styled. View`
    background-color: #292929;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 8px;
`;

const CardInfo = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #393939;
    padding-bottom: 12px;
    margin-bottom: 12px;
`;

const StatusBar = styled.StatusBar``;

const CardLogoContainer = styled.View`
    width: 64px;
    height: 64px;
    background-color: ${(props) => props.bgColor};
    align-items: center;
    justify-content: center;
    border-radius: 32px;
`;

const CardLogo = styled.Image`
    width: 40px;
    height: 40px;
`;

const CardDetails = styled.View`
    flex: 1;
    margin: 15px;
    align-items: flex-start;
`;

const CardActions = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

const Remove = styled.TouchableOpacity`
    margin-right: 32px;
`;

const Update = styled.TouchableOpacity`
    background-color: #3d3d3d;
    padding: 8px 16px;
    border-radius: 6px;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        // alignItems: 'center',
        // justifyContent: 'center',
        //paddingTop: Platform.OS === "android" ? 20 : 0
      },
})

export default CardsScreen
