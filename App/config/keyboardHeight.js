import {useEffect, useRef, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

const useKeyboardHeight = (platforms = ['ios', 'android']) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const showSubs = useRef(null);
    const hideSubs = useRef(null);
    useEffect(() => {
        if(isEventReq(platforms)) {
            showSubs.current = Keyboard.addListener('keyboardDidShow',keyboardDidShow);
            hideSubs.current = Keyboard.addListener('keyboardDidHide',keyboardDidHide);

            return () => {
                showSubs.current?.remove();
                hideSubs.current?.remove();
            };
        } else {
            return () => {};
        }
    }, []);

    const isEventReq = (platforms) => {
        try {
            return (
                platforms?.map((p) => p?.toLowerCase()).indexOf(Platform.OS) !== -1 || !platforms
            );
        }catch(error){}
        return false;
    };

    const keyboardDidShow = (frames) => {
        setKeyboardHeight(frames.endCoordinates.height);
    };

    const keyboardDidHide = () => {
        setKeyboardHeight(0);
    };
    
    return keyboardHeight;
};

export default useKeyboardHeight;