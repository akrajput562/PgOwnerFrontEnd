import React, {useRef,useState, useEffect} from "react";

//Stylerd compoents
import styled from "styled-components/native";
import {colors} from '../colors';
const {  secondary, tertiary, accent} = colors;

const CodeInputSection = styled.View`
flex: 1;
align-items: center;
justify-content: center;
margin-vertocal: 35px;
`;

const HiddentTextInput = styled.TextInput`
 position: absolute;
 width: 1px;
 height: 1px;
 opacity: 0;
 
`
const CodeInputsContainer = styled.Pressable`
 width: 70%;
 flex-direction: row;
 justify-content: space-between;

`
const CodeInput = styled.View`
  min-width: 15%;
  padding: 12px;
  border-bottom-width: 5px; 
  border-radius: 10px;
  border-color: ${secondary};

`
const CodeInputText = styled.Text`
 font-size: 22px;
 font-weight: bold;
 text-align: center;
 color: ${tertiary};

`
const CodeInputFocused = styled(CodeInput)`
 border-color: ${accent};
 

`

const StyledCodeInput = ({code, SetCode, maxLength, setPinReady }) => {
    const codeDigitsArray = new Array(maxLength).fill(0);

     const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

    //ref for text
    const textInputRef = useRef(null);

    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
   
    };

    const handleOnSubmitEditing = () => {

        setInputContainerIsFocused(false);
    };

    useEffect(() => {
        //toggel pinReady
        setPinReady(code.length === maxLength);
        return () => setPinReady(false);

    },[code]);

    const toCodeDigitInput = (value, index) => {
        const emptyInputChar = ' ';
        const digit = code[index] || emptyInputChar;

        //formatting
        const isCurrentDigit = index == code.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const StyledCodeInput = inputContainerIsFocused && isDigitFocused ? CodeInputFocused : CodeInput;

        return(
            <StyledCodeInput key={index}>
                <CodeInputText>{digit}</CodeInputText>

            </StyledCodeInput>
        );
    };


    return <CodeInputSection>
        <CodeInputsContainer onPress={handleOnPress}>{ codeDigitsArray.map(toCodeDigitInput) }</CodeInputsContainer>
        <HiddentTextInput
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          ref={textInputRef}
          value={code}
          onChangeText={SetCode}
          maxLength={maxLength}
          onSubmitEditing={handleOnSubmitEditing}
        
        /></CodeInputSection>;
};

export default StyledCodeInput;