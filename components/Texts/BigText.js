import React from "react";

//Stylerd compoents
import styled from "styled-components/native";
import {colors} from '../colors';
const {tertiary} = colors;

const StyledText = styled.Text`
 font-size: 30px;
 color: ${tertiary};
 text-align: center;
`;
const BigText = (props) => {
    return <StyledText {...props}>{ props.children }</StyledText>
};

export default BigText;