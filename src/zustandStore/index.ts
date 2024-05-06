import { create } from 'zustand';

interface IsLoadingStore {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
export const isLoadingStore = create<IsLoadingStore>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading: isLoading })),
}))

interface IsSpeakingStore {
    isSpeaking: boolean;
    setIsSpeaking: (isSpeaking: boolean) => void;
}
export const isSpeakingStore = create<IsSpeakingStore>((set) => ({
    isSpeaking: false,
    setIsSpeaking: (isSpeaking) => set(() => ({ isSpeaking: isSpeaking })),
}))

interface AiMessagesStore {
    aiMessages: any[];
    setAiMessages: (newAIMessages: any[]) => void;
}
export const aiMessagesStore = create<AiMessagesStore>((set) => ({
    aiMessages: [],
    setAiMessages: (newAIMessages) => set({ aiMessages: newAIMessages }),
}));

interface IsUpdateScrollViewStore {
    isUpdateScrollView: boolean;
    setIsUpdateScrollView: (isUpdateScrollView: boolean) => void;
}
export const isUpdateScrollViewStore = create<IsUpdateScrollViewStore>((set) => ({
    isUpdateScrollView: false,
    setIsUpdateScrollView: (isUpdateScrollView) => set(() => ({ isUpdateScrollView: isUpdateScrollView })),
}))

interface UserMessagesStore {
    userMessages: string;
    setUserMessages: (newUserMessages: string) => void;
}
export const userMessagesStore = create<UserMessagesStore>((set) => ({
    userMessages: '',
    setUserMessages: (newUserMessages) => set({ userMessages: newUserMessages }),
}))

interface IsRecordingStore {
    isRecording: boolean;
    setIsRecording: (isRecording: boolean) => void;
}
export const isRecordingStore = create<IsRecordingStore>((set) => ({
    isRecording: false,
    setIsRecording: (isRecording) => set(() => ({ isRecording: isRecording })),
}))