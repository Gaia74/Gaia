import react from "react";
import {View, Text}  from "react-native";
import styled from "styled-components/native"

const MainContainer = styled(View)`
    flex: 1;
    align-items: center;
    justifyContent: center;
    background-color: #F5FCFF;
`

export default function register() {

    return (
        <MainContainer>
            <Text>Register Page</Text>
        </MainContainer>
    );
}