import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import { SignUpScreens, StackNavigationProps } from 'types';
import { useAlert } from 'utils';
import { validateEmailAddress, validatePassword } from 'utils/authValidation';

import { Background, Box, Illustration } from 'components';
import { Header } from 'components/Header';
import { AuthForm } from 'components/AuthForm';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({ navigation }: StackNavigationProps<SignUpScreens, 'SignUp'>) => {
  const auth = getAuth();
  const alert = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { height } = Dimensions.get('window');

  const isEmailValid = email.length > 0 ? validateEmailAddress(email) : undefined;
  const isPasswordValid = password.length > 0 ? validatePassword(password) : undefined;
  const isButtonDisabled = [isEmailValid, isPasswordValid].some(c => !c) || loading;

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setLoading(false);
        alert(
          'Error',
          'The email and password you entered did not match our records. Please double check and try again.',
        );
      }
    }
  };

  return (
    <Background>
      <Header {...{ navigation }} title="Welcome Back!" colorMode="dark" />
      <Box alignItems="center" justifyContent="flex-end" height={height * 0.38}>
        <Illustration name="login" width="308" height={`${(height * 28) / 100}`} />
      </Box>
      <AuthForm
        {...{
          email,
          password,
          isEmailValid,
          isPasswordValid,
          loading,
          isButtonDisabled,
          showPassword,
        }}
        onEmailChange={v => setEmail(v)}
        onPasswordChange={v => setPassword(v)}
        onShowPasswordPress={() => setShowPassword(s => !s)}
        onNavigationToLoginOrSignUp={() => navigation.navigate('SignUp')}
        onSignUpPress={handleLogin}
        onForgotPasswordPress={() => true}
        submitButtonLabel="Login"
        bottomSectionLightTextLabel="Don't have an account?"
        bottomSectionAccentTextLabel="Sign Up"
      />
    </Background>
  );
};

export default SignUp;
