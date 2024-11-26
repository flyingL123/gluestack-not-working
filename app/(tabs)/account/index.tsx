import { Keyboard, StyleSheet, SafeAreaView, ScrollView, View, Alert } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth';
import { showMessage } from 'react-native-flash-message';
import { Center } from "@/components/ui/center";
import { Button, ButtonText } from "@/components/ui/button";

export default function AccountRoute() {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const listener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const listener2 = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    
    return () => {
      listener.remove();
      listener2.remove();
    };
  }, []);

  function handleKeyboardShow(event) {
    setKeyboardIsVisible(true);
    setKeyboardHeight(event.endCoordinates.height);
  }

  function handleKeyboardHide(event) {
    setKeyboardIsVisible(false);
  }

  function onRegistrationSubmit(formData) {
    setIsSubmitting(true);
    setRegistrationError(null);

    authContext.register(formData)
      .catch((error) => {
        setRegistrationError(error)
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function onLoginSubmit(formData) {
    const { email, password } = formData;

    setIsSubmitting(true);
    setLoginError(null);

    authContext.signIn(email, password)
      .catch((error) => {
        setLoginError(error)
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (!authContext.user) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
        <Center className="flex-1">
          <Button>
            <ButtonText>Click me</ButtonText>
          </Button>
        </Center>
        </ScrollView>
      </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 20,
  },
});
