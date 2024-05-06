import React, { useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';
import { isRecordingStore, isSpeakingStore, userMessagesStore } from '../zustandStore';
import HeaderRoomChat from '../components/HeaderRoomChat';
import BodyRoomChat from '../components/BodyRoomChat';
import UserInput from '../components/UserInput';

export default function HomeScreen() {
  const { setUserMessages } = userMessagesStore();
  const { setIsRecording } = isRecordingStore();
  const { setIsSpeaking } = isSpeakingStore();

  const speechStartHandler = (e: any) => {
    console.log('speech start event', e);
  };
  const speechEndHandler = (e: any) => {
    setIsRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = (e: any) => {
    console.log('speech event: ', e);
    const text = e.value[0];
    setUserMessages(text);
  };
  const speechErrorHandler = (e: any) => {
    console.log('speech error: ', e);
  };

  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    // text to speech events
    Tts.setDefaultLanguage('en-US');
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {
      console.log('finish', event);
      setIsSpeaking(false);
    });
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <SafeAreaView className="bg-primaryColor">
      {/* header */}
      <HeaderRoomChat />

      <ImageBackground
        source={require('../../assets/images/bg-rc.png')}
        style={{ height: hp(93), width: wp(100) }}
        resizeMode="cover">
        <View
          style={{ height: hp(83), width: wp(100) }}
          className='flex justify-between'
        >
          {/* chat box */}
          <BodyRoomChat />

          {/* user input */}
          <UserInput />
        </View>
      </ImageBackground >
    </SafeAreaView >
  );
}
