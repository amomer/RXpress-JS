import React, { useEffect } from 'react';
import { useComponent }  from '../config/index';
import { View } from 'react-native';
import { useStorage } from '../config/index';

const Main = ({
    // eslint-disable-next-line react/prop-types
    children, backgroundColor = '#FFFFFF', ...rest }) => {
        const init = useStorage((store) => store.init);
        useEffect(() => {
            init();
        }, []);
        return (
            <View style = {{flex: 1, backgroundColor}}
            {...rest}
            >
                {children}
            </View>
        );
    };
    export default function AppView(props) {
        const SafeView = useComponent(Main, props);
        return <SafeView />
    }
