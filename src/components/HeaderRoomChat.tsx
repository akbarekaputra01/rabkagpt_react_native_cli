import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { isLoadingStore, isSpeakingStore, aiMessagesStore } from '../zustandStore';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tts from 'react-native-tts';

export default function HeaderRoomChat() {
    const { isLoading, setIsLoading } = isLoadingStore();
    const { isSpeaking, setIsSpeaking } = isSpeakingStore();
    const { aiMessages, setAiMessages } = aiMessagesStore();

    const stopSpeaking = () => {
        Tts.stop();
        setIsSpeaking(false);
    };

    const clear = () => {
        Tts.stop();
        setIsSpeaking(false);
        setIsLoading(false);
        setAiMessages([]);
    };

    const navigation = useNavigation();
    return (
        <View
            className="flex flex-row items-center px-2 pt-1 pb-2 justify-between"
            style={{ height: hp(7), width: wp(100) }}>
            <View className='flex flex-row items-center'>
                <TouchableOpacity
                    onPress={() => {
                        clear();
                        navigation.navigate('Welcome' as never)
                    }}>
                    <Image
                        source={require('../../assets/images/arrowLeft.png')}
                        style={{ height: hp(2), width: hp(2), tintColor: 'white' }}
                        className="mr-2"
                    />
                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/bot_admin.png')}
                    style={{ height: hp(5), width: hp(5) }}
                    className="mr-2"
                />
                <View>
                    <Text className="font-bold text-lg text-white">RabkaGPT</Text>
                    {isLoading ? (
                        <Text className="font-bold text-white text-xs opacity-75">
                            Loading...
                        </Text>
                    ) : (
                        <Text className="font-bold text-white text-xs opacity-75">
                            Your Assistant
                        </Text>
                    )}
                </View>
            </View>
            <View className='flex flex-row justify-center items-center'>
                {isSpeaking && (
                    <TouchableOpacity onPress={stopSpeaking}>
                        <Image
                            source={require('../../assets/images/mute.png')}
                            style={{ height: hp(3), width: hp(3), tintColor: 'white' }}
                            className="mr-2"
                        />
                    </TouchableOpacity>
                )}
                {aiMessages.length > 0 && (
                    <TouchableOpacity onPress={clear}>
                        <Image
                            source={require('../../assets/images/trash.png')}
                            style={{ height: hp(3), width: hp(3), tintColor: 'white' }}
                            className="mr-2"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
