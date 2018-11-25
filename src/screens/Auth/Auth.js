import React from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import validate from "../../utility/validation";
import backgroundImage from "../../../assets/AuthBackground.jpg";
class Auth extends React.Component{
    state={
        authMode:"login",
        controls:{
            userName :{
                value:"",
                valid : false,
                validationRules:{
                    isName: true
                },
                touched : false
                },
            nationalId:{
                value:"",
                valid : false,
                validationRules:{
                    isNationalId: true,
                    minLength : 10
                },
                touched : false
            },
            email:{
                value:"",
                valid: false,
                validationRules:{
                    isEmail: true ,

                },
                touched: false
            },
            password:{
                value:"",
                valid: false,
                validationRules:{
                    minLength: 6
                },
                touched: false

            },
            confirmPassword:{
                value:"",
                valid: false,
                validationRules:{
                    equalTo : 'password'
                },
                touched: false
            },
        }
    };
    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
    }
    switchAuthModeHandler = ()=>{
        this.setState(prevState=>{
            return{
                authMode: prevState.authMode==="login" ? "signup" : "login"

            };
        });
    };
    authHandler = ( ) =>{
        alert("Point")
    };
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true

                    }
                }
            };
        });
    };

    render(){
        let confirmPassControl = null;
        let signupControlInfo = null;
        let headText = null;
        let submitButton =(
            <ButtonWithBackground
                onPress={this.authHandler}
                color="#29aaf4"
                disabled={
                    !this.state.controls.userName.valid && this.state.authMode ==="signup" ||
                    !this.state.controls.confirmPassword.valid && this.state.authMode==="signup" ||
                    !this.state.controls.email.valid && this.state.authMode==="signup" ||
                    !this.state.controls.nationalId.valid ||
                    !this.state.controls.password.valid
                }
            >
                Submit
            </ButtonWithBackground>

        );
        if(this.state.authMode ==="login"){
        headText=(
            <MainText>
                <HeadingText>Login</HeadingText>
            </MainText>
        );
        }
        if(this.state.authMode==="signup"){
            signupControlInfo=(
                <View>
                    <MainText>
                        <HeadingText>Sign Up</HeadingText>
                    </MainText>
                    <DefaultInput placeholder="User Name"
                                  style={styles.input}
                                  value={this.state.controls.userName.value}
                                  onChangeText={val=>this.updateInputState("userName",val)}
                                  valid={this.state.controls.userName.valid}
                                  touched={this.state.controls.userName.touched}
                                  autoCorrect={false}
                    />
                    <DefaultInput placeholder="Your E-mail Address"
                                  style={styles.input}
                                  value={this.state.controls.email.value}
                                  onChangeText={val=>this.updateInputState("email",val)}
                                  valid={this.state.controls.email.valid}
                                  touched={this.state.controls.email.touched}
                                  autoCorrect={false}
                                  keyboardType="email-address"
                    />
                </View>
            );

            confirmPassControl=(
                <View>
                    <DefaultInput placeholder="Confirm Password"
                                  style={styles.input}
                                  value={this.state.controls.confirmPassword.value}
                                  onChangeText={val=>this.updateInputState("confirmPassword",val)}
                                  valid={this.state.controls.confirmPassword.valid}
                                  touched={this.state.controls.confirmPassword.touched}
                                  secureTextEntry
                    />
                </View>
            );
        }
        return(
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.switchAuthModeHandler}
                    >
                        Switch To {this.state.authMode==="login" ? "signup" : "login"}
                    </ButtonWithBackground>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={styles.inputContainer}>
                            { signupControlInfo}
                            {headText}
                            <DefaultInput placeholder="Your National ID"
                                          style={styles.input}
                                          value={this.state.controls.nationalId.value}
                                          onChangeText={val=>this.updateInputState("nationalId",val)}
                                          valid={this.state.controls.nationalId.valid}
                                          touched={this.state.controls.nationalId.touched}
                                          autoCorrect={false}
                                          keyboardType="number-pad"
                            />
                            <View>
                                <View>
                                    <DefaultInput placeholder="Password"
                                                  style={styles.input}
                                                  value={this.state.controls.password.value}
                                                  onChangeText={val=>this.updateInputState("password",val)}
                                                  valid={this.state.controls.password.valid}
                                                  touched={this.state.controls.password.touched}
                                                  secureTextEntry

                                    />
                                </View>
                                {confirmPassControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {submitButton}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    inputContainer:{
        width:"80%",

    },
    input:{
        backgroundColor:"#eee",
        borderColor:"#bbb",

    },
    backgroundImage:{
        width:"100%",
        flex:1,
    },
});

export default Auth;
