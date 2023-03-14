/* eslint-disable react/prop-types */
import React, {Fragment, useEffect, useState} from 'react';
import {Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import DateTimePicker from 'react-native-modal-datetime-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import useKeyboardHeight from '../config/keyboardHeight';
import useStorage from '../config/asyncStorage';
import {Routes} from '../navigation/routes';

const {width: vw} = Dimensions.get('window');

const styles = StyleSheet.create({
    createEventBtn: {
        width: 252,
        height: 48,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center'
    },
    separator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        marginVertical: 20
    },
    notes: {
        color: '#9CAAC4',
        fontSize: 16,
        fontWeight: '600'
    },
    notesCnt: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#F8D557',
        justifyContent: 'center',
        borderRadius: 5
    },
    title: {
        height: 25,
        borderColor: '#5DD976',
        borderLeftWidth: 1,
        paddingLeft: 8,
        fontSize: 19
    },
    eventCont: {
        height: 400,
        width: 327,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: '#22DE81',
        backgroundColor: '#ffffff',
        shadowOffset: {
                width: 3,
                height: 3
        },
        shadowRadius: 20,
        shadowOpacity: 0.2,
        elevation: 5,
        padding: 22
    },
    calendarCont: {
        marginTop: 30,
        width: 350,
        height: 350,
        alignSelf: 'center'
    },
    newEvent: {
        alignSelf: 'center',
        fontSize: 20,
        width: 120,
        height: 25,
        textAlign: 'center'
    },
    backBtn: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        alignItems: 'center'
    },
    cont: {
        flex: 1,
        backgroundColor: '#eaeef7'
    }
});

// eslint-disable-next-line react/prop-types
export default function EventCreationScreen({ navigation, route }) {
    const {updateEvent} = useStorage((state) => ({
        updateEvent: state.updateEvent
    }));

    const keyboardHeight = useKeyboardHeight();
    const createCalendar = route.params?.createNewCalendar ?? (() => null);
    const updateCurrentEvent = route.params?.updateCurrentEvent ?? (() => null);
    const currentDate = route.params?.currentDate ?? (() => null);

    const [selectedDay, setSelectedDay] = useState({
        [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`]: {
            selected: true,
            selectedColor: '#22DE81'
        }
    });
    const [currentDay, setCurrentDay] = useState(moment().format());
    const [eventTxt, setEventTxt] = useState('');
    const [notesTxt, setNotesTxt] = useState('');
    const [visibleHeight, setVisibleHeight] = useState(Dimensions.get('window').height);
    const [isAlarmSet, setAlarmSet] = useState(false);
    const [alarmTime, setAlarmTime] = useState(moment().format());
    const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

    useEffect(() => {
        if (keyboardHeight > 0) {
            setVisibleHeight(Dimensions.get('window').height - keyboardHeight);
        } else if(keyboardHeight === 0) {
            setVisibleHeight(Dimensions.get('window').height);
        }
    }, [keyboardHeight]);

    const handleSetAlarm = () => {
        setAlarmSet(!isAlarmSet);
    };

    const syncCalendar = async () => {
        const newCalendarID = await createCalendar();
        try{
            const createEventID = await addEventsToCalendar(newCalendarID);
            handleCreateEventData(createEventID);
        } catch(error) {
            Alert.alert(error.message);
        }
    };

    const addEventsToCalendar = async (newCalendarID) => {
        const event = {
            title: eventTxt,
            notes: notesTxt,
            startDate: moment(alarmTime).add(0,'m').toDate(),
            endDate: moment(alarmTime).add(5,'m').toDate(),
            timeZone: Localization.locales
        };

        try{
            const createEventAsyncResNew = await Calendar.createEventAsync(newCalendarID.toString(),event);
            return createEventAsyncResNew;
        }catch(error){console.log(error);}
    };

    const showDateTimePicker = () => setDateTimePickerVisible(true);
    const hideDateTimePicker = () => setDateTimePickerVisible(false);
    const handleCreateEventData = async (createEventID) => {
        const createEvent = {
            key: uuidv4(),
            date: `${moment(currentDay).format('YYYY')}-${moment(currentDay).format('MM')}-${moment(currentDay).format('DD')}`,
            eventList: [{
                key: uuidv4(),
                title: eventTxt,
                notes: notesTxt,
                alarm: {
                    time: alarmTime,
                    isOn: isAlarmSet,
                    createEventAsyncRes: createEventID
                },
                color: '#22DE81'
            }],
            markedDot: {
                date: currentDay,
                dots: [{
                    key: uuidv4(),
                    color: '#22DE81',
                    selectedDotColor: '#22DE81'
                }]
            }
        };
        navigation.navigate('Calendar');
        await updateEvent(createEvent);
        updateCurrentEvent(currentDate);
    };

    const HandlePickedDate = (date) => {
        const selectedDatePick = currentDay;
        const hour = moment(date).hour();
        const minute = moment(date).minute();
        const newDay = moment(selectedDatePick).hour(hour).minute(minute);
        setAlarmTime(newDay);
        hideDateTimePicker();
    };

    return (
        <Fragment>
            <DateTimePicker
                isVisible = {isDateTimePickerVisible}
                onConfirm = {HandlePickedDate}
                onCancel = {hideDateTimePicker}
                mode = "time"
                date = {new Date()}
            />
            <SafeAreaView style = {styles.cont}>
                <View
                    style = {{
                        height: visibleHeight
                    }}
                >
                    <ScrollView
                        contentContainerStyle = {{paddingBottom: 100}}
                    >
                        <View style = {styles.backBtn}>
                            <TouchableOpacity
                                onPress = {() => navigation.navigate('Calendar')}
                                style = {{marginRight: vw / 2 - 120, marginLeft: 20}}
                            > 
                            </TouchableOpacity>
                            <Text style = {styles.newEvent}>New Event</Text>
                        </View>
                        <View style = {styles.calendarCont}>
                            <CalendarList
                                style = {{width: 350, height: 350}}
                                current = {currentDay}
                                minDate = {moment().format()}
                                horizontal
                                pastScrollRange={0}
                                pagingEnabled
                                calendarWidth={350}
                                onDayPress={(day) => {
                                    setSelectedDay({
                                        [day.dateString]: {selected: true, selectedColor: '#22DE81'}
                                    });
                                    setCurrentDay(day.dateString);
                                    setAlarmTime(day.dateString);
                                }}
                                monthFormat="yyyy MMMM"
                                hideArrows
                                markingType = "custom"
                                theme = {{
                                    selectedDayBackgroundColor: '#22DE81',
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: '#22DE81',
                                    backgroundColor: '#84479E',
                                    calendarBackground: '#eaeef7',
                                    textDisabledColor: '84479E'
                                }}
                                markedDates = {selectedDay}
                            />
                        </View>
                        <View style = {styles.eventCont}>
                            <TextInput
                                style = {styles.title}
                                onChangeText = {setEventTxt}
                                value = {eventTxt}
                                placeholder = "What is the reminder for?"
                            />
                        <View style = {styles.notesCnt} />
                        <View>
                            <Text style = {styles.notes}>Notes</Text>
                            <TextInput
                                style = {{
                                    height: 25,
                                    fontSize: 19,
                                    marginTop: 3
                                }}
                                onChangeText = {setNotesTxt}
                                value = {notesTxt}
                                placeholder = "Enter any miscellaneous information about the reminder"
                            />
                        </View>
                        <View style = {styles.separator} />
                        <View>
                            <Text
                                style = {{
                                    color: '#9CAAC4',
                                    fontSize: 16,
                                    fontWeight: '600'
                                }}
                            >Times
                            </Text>
                            <TouchableOpacity
                                onPress={() => showDateTimePicker()}
                                style = {{height: 25, marginTop: 3}}
                            >
                                <Text style = {{fontSize: 19}}>
                                    {moment(alarmTime).format('h:mm A')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.separator} />
                        <View
                            style = {{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <View>
                                <Text
                                    style = {{
                                        color: '#9CAAC4',
                                        fontSize: 16,
                                        fontWeight: '600'
                                    }}
                                >
                                    Alarm
                                </Text>
                                    <View style = {{height: 25, marginTop: 3}}>
                                        <Text style = {{fontSize: 19}}>
                                            {moment(alarmTime).format('h:mm A')}
                                        </Text>
                                    </View>
                            </View>
                            <Switch value = {isAlarmSet} onValueChange = {handleSetAlarm} />
                        </View>
                        </View>
                        <TouchableOpacity
                            disabled = {eventTxt === ''}
                            style = {[
                                styles.createEventBtn,
                                {
                                    backgroundColor: eventTxt === '' ? 'rgba(46, 102, 231, 0.5)' : '#22DE81'
                                }
                            ]}
                            onPress = {async () => {
                                if (isAlarmSet) {
                                    await syncCalendar();
                                }
                                if(!isAlarmSet) {
                                    handleCreateEventData();
                                }
                            }}
                        >
                            <Text
                                style = {{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        color: '#fff'
                                }}
                            >
                                Add Reminder
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Fragment>
    );
}