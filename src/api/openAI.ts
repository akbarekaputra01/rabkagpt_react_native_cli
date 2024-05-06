import { apiKey } from '../constants';
import axios, { AxiosResponse } from 'axios';

interface Message {
    role: string;
    content: string;
}

interface ChatResponse {
    choices: { message: { content: string } }[];
}

interface DalleResponse {
    data: { url: string }[];
}

const client = axios.create({
    headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
    },
});

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt: string, messages: Message[]): Promise<{ success: boolean; data?: Message[]; msg?: string }> => {
    try {
        const res: AxiosResponse<ChatResponse> = await client.post(chatgptUrl, {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`,
                },
            ],
        });

        let isArt: string = res.data?.choices[0]?.message?.content ?? '';
        isArt = isArt.trim().toLowerCase();
        if (isArt.includes('yes')) {
            console.log('dalle api call');
            return dalleApiCall(prompt, messages);
        } else {
            console.log('chatgpt api call');
            return chatgptApiCall(prompt, messages);
        }
    } catch (err: any) {
        console.log('error: ', err);
        return { success: false, msg: err.message };
    }
};

const chatgptApiCall = async (prompt: string, messages: Message[]): Promise<{ success: boolean; data?: Message[]; msg?: string }> => {
    try {
        const res: AxiosResponse<ChatResponse> = await client.post(chatgptUrl, {
            model: 'gpt-3.5-turbo',
            messages,
        });

        let answer: string = res.data?.choices[0]?.message?.content ?? '';
        messages.push({ role: 'assistant', content: answer.trim() });
        return { success: true, data: messages };
    } catch (err: any) {
        console.log('error: ', err);
        return { success: false, msg: err.message };
    }
};

const dalleApiCall = async (prompt: string, messages: Message[]): Promise<{ success: boolean; data?: Message[]; msg?: string }> => {
    try {
        const res: AxiosResponse<DalleResponse> = await client.post(dalleUrl, {
            prompt,
            n: 1,
            size: '512x512',
        });

        let url: string = res?.data?.data[0]?.url ?? '';
        messages.push({ role: 'assistant', content: url });
        return { success: true, data: messages };
    } catch (err: any) {
        console.log('error: ', err);
        return { success: false, msg: err.message };
    }
};
