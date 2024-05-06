import React, { useEffect } from 'react'
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import {
    isLoadingStore,
    isRecordingStore,
    isSpeakingStore,
    isUpdateScrollViewStore,
    aiMessagesStore,
    userMessagesStore
} from '../zustandStore';
import { apiCall } from '../api/openAI';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';

export default function UserInput() {
    const { userMessages, setUserMessages } = userMessagesStore();
    const { setIsLoading } = isLoadingStore();
    const { aiMessages, setAiMessages } = aiMessagesStore();
    const { setIsUpdateScrollView } = isUpdateScrollViewStore();
    const { setIsSpeaking } = isSpeakingStore();
    const { isRecording, setIsRecording } = isRecordingStore();

    const handleTextInputChange = (text: string) => {
        setUserMessages(text);
    };

    const startRecording = async () => {
        setIsRecording(true);
        Tts.stop();
        try {
            await Voice.start('en-US'); // en-US
            // await Voice.start('es_US', { RECOGNIZER_ENGINE: 'GOOGLE', EXTRA_PARTIAL_RESULTS: true, });
        } catch (error) {
            console.log('error', error);
        }
    };
    const stopRecording = async () => {
        try {
            await Voice.stop();
            setIsRecording(false);
            sendUserMessage();
        } catch (error) {
            console.log('error', error);
        }
    };

    const sendUserMessage = () => {
        if (userMessages.trim().length > 0) {
            setIsLoading(true);
            let newMessages = [...aiMessages];
            newMessages.push({ role: 'user', content: userMessages.trim() });
            setAiMessages([...newMessages]);

            // scroll after sending messages
            setIsUpdateScrollView(true);

            // fetching response from chatGPT with our prompt and old messages
            apiCall(userMessages.trim(), newMessages).then(res => {
                console.log('got api data');
                setIsLoading(false);
                if (res.success) {
                    if (res.data) {
                        setAiMessages([...res.data]);
                        setUserMessages('');

                        // scroll after got messages
                        setIsUpdateScrollView(true);

                        // now play the response to user
                        startTextToSpeach(res.data[res.data.length - 1]);
                    }
                } else {
                    Alert.alert('Error', res.msg);
                }
            });
        }
    };

    const startTextToSpeach = (message: any) => {
        if (!message.content.includes('https')) {
            setIsSpeaking(true);
            Tts.speak(message.content, {
                iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
                rate: 0.5,
                androidParams: {
                    KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 0.5,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
        }
    };

    return (
        <View
            className="pt-1"
            style={{ height: hp(10) }}>
            <View className="flex flex-row w-full justify-center">
                <View className='flex flex-row bg-secondaryColor rounded-xl'>

                    <TextInput
                        placeholder="Type your message..."
                        placeholderTextColor="rgba(255, 255, 255, 0.75)"
                        className=" text-white"
                        style={{
                            padding: 10,
                            height: hp(10),
                            width: wp(80),
                        }}
                        multiline
                        value={userMessages}
                        onChangeText={handleTextInputChange}
                    />

                    {
                        userMessages.trim().length > 0 && !isRecording ?
                            (
                                <TouchableOpacity className="space-y-2" onPress={sendUserMessage}>
                                    <View
                                        className="bg-secondaryColor rounded-full flex justify-center items-center"
                                        style={{ width: hp(5), height: hp(5) }}>
                                        <Image
                                            source={require('../../assets/images/sendIcon.png')}
                                            style={{ width: hp(3), height: hp(3), tintColor: 'white' }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ) : isRecording ?
                                (
                                    <TouchableOpacity className="space-y-2" onPress={stopRecording}>
                                        <Animatable.View
                                            animation="pulse"
                                            easing="ease-out"
                                            iterationCount="infinite">
                                            <View
                                                className="bg-secondaryColor50 rounded-full flex justify-center items-center"
                                                style={{ width: hp(5), height: hp(5) }}>

                                                <View
                                                    className="bg-secondaryColor rounded-full flex justify-center items-center"
                                                    style={{ width: hp(4), height: hp(4) }}>
                                                    <Image
                                                        source={require('../../assets/images/mic.png')}
                                                        style={{ width: hp(3), height: hp(3), tintColor: 'white' }}
                                                    />
                                                </View>
                                            </View>

                                        </Animatable.View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity className="space-y-2" onLongPress={startRecording} onPress={() => Alert.alert('Hold to record, release to send')}>
                                        <View
                                            className="bg-secondaryColor rounded-full flex justify-center items-center"
                                            style={{ width: hp(5), height: hp(5) }}>
                                            <Image
                                                source={require('../../assets/images/mic.png')}
                                                style={{ width: hp(3), height: hp(3), tintColor: 'white' }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )
                    }

                </View>
            </View>
        </View>
    )
}

