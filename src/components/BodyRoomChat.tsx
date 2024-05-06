import React, { useEffect, useRef } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from './Features';
import { isUpdateScrollViewStore, aiMessagesStore } from '../zustandStore';

export default function BodyRoomChat() {
    const { aiMessages } = aiMessagesStore();
    const { isUpdateScrollView, setIsUpdateScrollView } = isUpdateScrollViewStore();

    const scrollViewRef = useRef<any>(null);
    // function <ScrollView/> scroll to end
    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    // updateScrollView() if there are any changes at isUpdateScrollView
    useEffect(() => {
        if (isUpdateScrollView) {
            updateScrollView();
            setIsUpdateScrollView(false);
        }
    }, [isUpdateScrollView]); // effect will be triggered when any changes at isUpdateScrollView

    return (
        <ScrollView
            ref={scrollViewRef}
            bounces={false}
            showsVerticalScrollIndicator={false}>

            {/* is there a chat? if yes, swhowing the chatbox. if no, showing the features */}
            {aiMessages.length > 0 ?
                aiMessages.map((aiMessage, index) => {

                    // if role is assistant
                    if (aiMessage.role == 'assistant') {

                        // and the messages of assistant is includes 'https'
                        if (aiMessage.content.includes('https')) {
                            return (
                                <View key={index} className="flex flex-row mb-3 pl-2">
                                    <View
                                        className="bg-secondaryColor flex justify-center items-center rounded-full mr-2"
                                        style={{ height: hp(4), width: hp(4) }}>
                                        <Image
                                            source={require('../../assets/images/bot_admin.png')}
                                            style={{ height: hp(3), width: hp(3) }}
                                        />
                                    </View>
                                    <View
                                        className="bg-white p-2 rounded-xl rounded-tl-none">
                                        <Image
                                            source={{ uri: aiMessage.content }}
                                            className="rounded-2xl"
                                            resizeMode="contain"
                                            style={{ height: wp(60), width: wp(60) }}
                                        />
                                    </View>
                                </View>
                            );
                        } else { // the messages of assistant isn't includes 'https'
                            return (
                                <View key={index} className="flex flex-row mb-3 pl-2">
                                    <View
                                        className="bg-secondaryColor flex justify-center items-center rounded-full mr-2"
                                        style={{ height: hp(4), width: hp(4) }}>
                                        <Image
                                            source={require('../../assets/images/bot_admin.png')}
                                            style={{ height: hp(3), width: hp(3) }}
                                        />
                                    </View>
                                    <View
                                        style={{ width: wp(70) }}
                                        className="bg-white p-2 rounded-xl rounded-tl-none">
                                        <Text className="text-neutral-800" style={{ fontSize: wp(4) }}>
                                            {aiMessage.content}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }
                    } else { //if role is not assistant exactly is user
                        return (
                            <View key={index} className="flex flex-row justify-end mb-3 pr-2">
                                <View
                                    style={{ width: wp(70) }}
                                    className="bg-white p-2 rounded-xl rounded-tr-none">
                                    <Text className="text-neutral-800" style={{ fontSize: wp(4) }}>
                                        {aiMessage.content}
                                    </Text>
                                </View>
                                <View
                                    className="bg-secondaryColor flex justify-center items-center rounded-full ml-2"
                                    style={{ height: hp(4), width: hp(4) }}>
                                    <Image
                                        source={require('../../assets/images/userIcon.png')}
                                        style={{ height: hp(2), width: hp(2) }}
                                    />
                                </View>
                            </View>
                        );
                    }
                }) : (
                    <Features />
                )
            }
        </ScrollView>
    )
}
