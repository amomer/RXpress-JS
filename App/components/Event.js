import React from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    Main: {
        position: 'absolute',
        top: 100,
        width: 327,
        alignSelf: 'center',
        zIndex: 1000,
        elevation: 1000,
        paddingBottom: 54
    },
    card: {
        width: 327,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    btnContainer: ({pressed}) => ({
        position: 'absolute',
        alighSelf: 'center',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#ffffff',
        height: 44,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1
    }),
    textContainer: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500'
    }
});
export default class Event extends React.Component {
    render() {
        const {isModalVisible, children, setModalVisible} = this.props;
        return (
            <Modal
                animationType="none"
                transparent
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
                >
                    <View
                        style = {[
                            styles.container,
                            {
                                ...Platform.select({
                                    android: {

                                    }
                                })
                            }
                        ]}
                        >
                            <View style = {styles.Main}>
                                <View style = {styles.card}>{children}</View>
                                <Pressable
                                    style = {styles.btnContainer}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style = {styles.textContainer}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                </Modal>
        );
    }
}