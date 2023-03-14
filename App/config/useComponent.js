import React, { useEffect, useRef } from 'react';

export default function useComponent(Component, props) {
    const propsRef = useRef(props);
    useEffect(() => {
        propsRef.current = null;
    }, []);
    return useRef(() => {
        const props = propsRef.current;
        if (props === null) {
            throw new Error(
                'Rendering error'
            );
        }
        return <Component {...props} />;
    }).current;
}