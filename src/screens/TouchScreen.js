import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import styled from 'styled-components';
import {Fontisto, MaterialIcons} from '@expo/vector-icons';
import Text from '../components/Text';


const TouchScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
        <Text center heavy title color="#3b5998" margin="60px 0 0 0">
            Bank of Africa
        </Text>

        <Touch onLongPress={() => navigation.navigate("Pin")} delayPressIn={0}>
            <Circle bgColor="#1e1e1e">
                <Circle bgColor="#5196f405">
                    <Circle bgColor="#5196f410">
                        <Circle bgColor="#5196f430">
                            <TouchButton>
                                <MaterialIcons name="fingerprint" size={64} color="#ffffff" />
                            </TouchButton>
                        </Circle>
                    </Circle>
                </Circle>
            </Circle>
        </Touch>

        <Text center heavy large>
            Touch ID sensor for access to{"\n"}your BMCE account.
        </Text>
        <Text center bold margin="16px 0 0 0" color="#9c9c9f">
            Please very your identity{"\n"}using Touch ID
        </Text>

        <PinAccess onPress={() => navigation.navigate("Pin")} delayPressIn={0}>
            <Fontisto name="locked" color="#964ff0" size={16} />
            <Text bold margin="0 0 0 8px" color="#964ff0">
                Enter Access PIN
            </Text>
        </PinAccess>

        <StatusBar barStyle="light-content" />
      </View>

  );
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #1e1e1e;
    padding-top: Platform.OS === "android" ? 20 : 0;
`;

const Circle = styled.View`
    background-color: ${props => props.bgColor};
    padding: 32px;
    border-radius: 999px;
`;

const Touch = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const TouchButton = styled.View`
    background-color: #5196f4;
    padding: 8px;
    border-radius: 100px;
`;

const PinAccess = styled.TouchableOpacity`
    margin-top: 16px;
    padding: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StatusBar = styled.StatusBar`

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

export default TouchScreen;
