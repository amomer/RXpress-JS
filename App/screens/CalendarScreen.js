import React, { useEffect, Fragment, useState } from 'react';
import { Alert, Dimensions, Platform, SafeAreaView, ScrollView,StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as Calendar from 'expo-calendar';
import moment from 'moment';
import * as Localization from 'expo-localization';
import CalendarStrip from 'react-native-calendar-strip';
import { Event } from '../components/Event';
import DateTimePicker from 'react-native-modal-datetime-picker';
import useStorage from '../config/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    eventListContent: {
        height: 100,
        width: 327,
        alighSelf: 'center',
        borderRadius: 10,
        shadowColor: '#22DE81',
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginBottom: 10,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    viewEvent: {
        position: 'absolute',
        bottom: 40,
        right: 17,
        height: 60,
        width: 60,
        backgroundColor: '#22DE81',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#22DE81',
        shadowOffset: {
            width: 0.1,
            height: 5
        },
        shadowRadius: 30,
        shadowOpacity: 0.5,
        elevation: 5,
        zIndex: 999
    },
    deleteBtn: {
        backgroundColor: '#ff6347',
        width: 100,
        height: 38,
        alighSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center'
    },
    updateBtn: {
        backgroundColor: '#22DE81',
        width: 100,
        height: 38,
        alighSelf: 'center',
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 20
    },
    separator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alighSelf: 'center',
        marginVertical: 20
    },
    notesCnt: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alighSelf: 'center',
        marginVertical: 20
    },
    title: {
        height: 25,
        borderColor: '#5DD976',
        borderLeftWidth: 1,
        paddingLeft: 8,
        fontSize: 16
    },
    eventContainer: {
        height: 475,
        width: 327,
        alighSelf: 'center',
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
    }
});

const datesWhitelist = [
    {
        start: moment(),
        end: moment().add(365,'days')
    }
];

export default function CalendarScreen({ navigation }) {
    const {updateCurrentEvent, deleteCurrentEvent, event} = useStorage(
        (state) => ({
            updateCurrentEvent: state.updateCurrentEvent, 
            deleteCurrentEvent: state.deleteCurrentEvent, 
            event: state.event
        })
    );

    const [eventList, setEventList] = useState([]);
    const [markedDate, setMarkedDate] = useState([]);
    const [currentDate, setCurrentDate] = useState(`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

    useEffect(() => {
        handleDeletePrevEvent(event);}, [event, currentDate]);

        const handleDeletePrevEvent = async (oldEvent) => {
            try {
              if (oldEvent !== []) {
                const today = `${moment().format('YYYY')}-${moment().format(
                  'MM'
                )}-${moment().format('DD')}`;
                const checkDate = moment(today);
                await oldEvent.filter((item) => {
                  const currDate = moment(item.date);
                  const checkedDate = checkDate.diff(currDate, 'days');
                  if (checkedDate > 0) {
                    item.todoList.forEach(async (listValue) => {
                      try {
                        await Calendar.deleteEventAsync(
                          listValue.alarm.createEventAsyncRes.toString()
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    });
                    return false;
                  }
                  return true;
                });
                updateCurrent(currentDate);
              }
            } catch (error) {
            console.log(error);}
          };

    function handleModalVisible() { setModalVisible(!isModalVisible); }

    function showDateTimePicker() {
        return setDateTimePickerVisible(true);
    }
    function hideDateTimePicker() {
        return setDateTimePickerVisible(false);
    }

    const updateCurrent = async (currentDate) => {
        try {
          if (event !== [] && event) {
            const markDot = event.map((item) => item.markedDot);
            const eventLists = event.filter((item) => {
              if (currentDate === item.date) {
                return true;
              }
              return false;
            });
            setMarkedDate(markDot);
            if (eventLists.length !== 0) {
              setEventList(eventLists[0].eventList);
            } else {
              setEventList([]);
            }
          }
        } catch (error) {
          console.log('updateCurrentTask', error.message);
        }
      };

    function handleDatePick(date) {
        let prevEventSelection = JSON.parse(JSON.stringify(selectedEvent));
        const selectedDatePick = prevEventSelection.alarm.time;
        const hour = moment(date).hour();
        const minute = moment(date).minute();
        let newDay = moment(selectedDatePick).hour(hour).minute(minute);
        prevEventSelection.alarm.time = newDay;
        setSelectedEvent(prevEventSelection);
        hideDateTimePicker();
    }

    function handleSetAlarm() {
        let prevEventSelection = JSON.parse(JSON.stringify(selectedEvent));
        prevEventSelection.alarm.isOn = !prevEventSelection.alarm.isOn;
        setSelectedEvent(prevEventSelection);
    }

    async function updateAlarm() {
        const newCalendarID = await createCalendar();
        const event = {
            title: selectedEvent.title,
            notes: selectedEvent.notes,
            start: moment(selectedEvent?.alarm.time).add(0, 'm').toDate(),
            end: moment(selectedEvent?.alarm.time).add(5, 'm').toDate(),
            timeZone: Localization.timezone
        };
        if (!selectedEvent?.alarm.createEventAsyncRes) {
            try {
                const createEventAsyncRes = await Calendar.createEventAsync(newCalendarID.toString(), event);
                let updateEvent = JSON.parse(JSON.stringify(selectedEvent));
                updateEvent.alarm.createEventAsyncRes = createEventAsyncRes;
                setSelectedEvent(updateEvent);
            } catch (error) { console.log(error); }
        } else {
            try {
                await Calendar.updateEventAsync(selectedEvent?.alarm.createEventAsyncRes.toString(), event);
            } catch (error) { console.log(error); }
        }
    }

    async function deleteAlarm() {
        try {
            if (selectedEvent?.alarm.createEventAsyncRes) {
                await Calendar.deleteEventAsync(selectedEvent?.alarm.createEventAsyncRes);
            }
            let updateEvent = JSON.parse(JSON.stringify(selectedEvent));
            updateEvent.alarm.createEventAsyncRes = '';
            setSelectedEvent(updateEvent);
        } catch (error) { console.log('deleteAlarm', error.message); }
    }

    async function getEvent() {
        if(selectedEvent?.alarm.createEventAsyncRes) {
            try {
                await Calendar.getEventAsync(selectedEvent?.alarm.createEventAsyncRes.toString());
            } catch(error){console.log(error);}
        }
    }

    async function createCalendar() {
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await Calendar.getDefaultCalendarAsync(Calendar.EntityTypes.EVENT)
                : { isLocalAccount: true, name: 'Expo Calendar' };

            const newCalendar = {
                title: 'Expo Calendar',
                color: 'blue',
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: 'internalCalendarName',
                ownerAccount: 'personal',
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
        };

        let id = null;
        try {
            id = await Calendar.createCalendarAsync(newCalendar);
        } catch (e) {Alert.alert(e.message);}
    
        return id;
    };

    return (
       <Fragment>
            {selectedEvent !== null && (
                <Event {...{setModalVisible, isModalVisible}}>
                    <DateTimePicker
                        isVisible = {isDateTimePickerVisible}
                        onConfirm = {handleDatePick}
                        onCancel = {hideDateTimePicker}
                        mode = "time"
                        date = {new Date()}
                        isDarkModeEnabled
                    />
                    <View style={styles.eventContainer}>
                        <TextInput
                        style = {styles.title}
                        onChangeText={(text) => {
                            let prevEventSelection = JSON.parse(JSON.stringify(selectedEvent));
                            prevEventSelection.title = text;
                            setSelectedEvent(prevEventSelection);
                        }}
                        value = {selectedEvent.title}
                        placeholder = "What is the reminder for?"
                    />
                    <View style = {styles.notesCnt} />
                    <View>
                        <Text
                            style = {{
                                color: '#9CAAC4',
                                fontSize: 16,
                                fontWeight: '600'
                            }}
                            >
                                Notes
                            </Text>
                        <TextInput
                            style = {{
                                height: 25,
                                fontSize: 19,
                                marginTop: 3
                            }}
                            onChangeText = {(text) => {
                                let prevEventSelection = JSON.parse(
                                    JSON.stringify(selectedEvent)
                                );
                                prevEventSelection.notes = text;
                                setSelectedEvent(prevEventSelection);
                            }}
                            value = {selectedEvent.notes}
                            placeholder = "Enter any miscellaneous information about the reminder."
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
                        >
                            Time
                        </Text>
                        <TouchableOpacity
                            onPress={() => showDateTimePicker()}
                            style = {{
                                height: 25,
                                marginTop: 3
                            }}
                        >
                            <Text style = {{fontSize: 19}}>
                                {moment(selectedEvent?.alarm?.time || moment()).format('h:mm A')}
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
                                <View
                                    style = {{
                                        height: 25,
                                        marginTop: 3
                                    }}
                                >
                                    <Text style = {{fontSize: 19}}>
                                        {moment(selectedEvent?.alarm?.time || moment()).format('h:mm A')}
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value = {selectedEvent?.alarm?.isOn || false}
                                onValueChange = {handleSetAlarm}
                            />
                        </View>
                    <View
                        style = {{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress = {async () => {
                                handleModalVisible();
                                console.log('isOn', selectedEvent?.alarm.isOn);
                                if (selectedEvent?.alarm.isOn) {
                                    await updateAlarm();
                                } else {
                                    await deleteAlarm();
                                }
                                await updateCurrentEvent({
                                    date: currentDate,
                                    event: selectedEvent
                                });
                                updateCurrent(currentDate);
                            }}
                            style = {styles.updateBtn}
                        >
                            <Text
                                style = {{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    color: '#fff'
                                }}
                            >
                                Update
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {async () => {
                                handleModalVisible();
                                deleteAlarm();
                                await deleteCurrentEvent({
                                    date: currentDate,
                                    event: selectedEvent
                                });
                                updateCurrent(currentDate);
                            }}
                            style = {styles.deleteBtn}
                        >
                            <Text
                                style = {{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    color: '#fff'
                                }}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Event>
            )}
            <SafeAreaView
                style = {{
                    flex: 1
                }}
            >
                <CalendarStrip
                    calendarAnimation={{
                        type: 'sequence',
                        duration: 30
                    }}
                    daySelectionAnimation = {{
                        type: 'background',
                        duration: 200
                    }}
                    style = {{
                        height: 150,
                        paddingTop: 20,
                        paddingBottom: 20
                    }}
                    calendarHeaderStyle = {{color: '#84479E'}}
                    dateNumberStyle = {{
                        color: '#84479E',
                        paddingTop: 10
                    }}
                    dateNameStyle = {{color: '#84479E'}}
                    highlightDateNumberStyle = {{
                        color: '#fff',
                        backgroundColor: '#22DE81',
                        marginTop: 10,
                        height: 35,
                        width: 35,
                        textAlign: 'center',
                        borderRadius: 17.5,
                        overflow: 'hidden',
                        paddingTop: 6,
                        fontWeight: '400',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    highlightDateNameStyle = {{color: '#22DE81'}}
                    disabledDateNameStyle = {{color: 'grey'}}
                    disabledDateNumberStyle = {{
                        color: 'grey',
                        paddingTop: 10
                    }}
                    datesWhitelist = {datesWhitelist}
                    markedDates = {markedDate}
                    selectedDate = {currentDate}
                    onDateSelected = {(date) => {
                        const selectedDate = `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`;
                        updateCurrent(selectedDate);
                        setCurrentDate(selectedDate);
                    }}
                />
                <TouchableOpacity
                    onPress = {() =>
                        navigation.navigate('Reminder', {
                            updateCurrent: updateCurrent, 
                            currentDate,
                            createCalendar: createCalendar
                        })
                    }
                    style = {styles.viewEvent}
                >
                </TouchableOpacity>
                <View
                    style = {{
                        width: '100%',
                        height: Dimensions.get('window').height - 170
                    }}
                >
                    <ScrollView
                        contentContainerStyle = {{paddingBottom: 20}}
                    >
                        {eventList.map((item) => (
                            <TouchableOpacity
                                onPress = {() => {
                                    setSelectedEvent(item);
                                    setModalVisible(true);
                                    getEvent();
                                }}
                                key = {item.key}
                                style = {styles.eventContainer}
                            >
                                <View
                                    style = {{marginLeft: 13}}
                                >
                                    <View
                                        style = {{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style = {{
                                                height: 12,
                                                width: 12,
                                                borderRadius: 6,
                                                backgroundColor: item.color,
                                                marginRight: 8
                                            }}
                                        />
                                        <Text
                                            style = {{
                                                color: '#554A4C',
                                                fontSize: 20,
                                                fontWeight: '700'
                                            }}
                                        >
                                            {item.title}
                                        </Text> 
                                    </View>
                                    <View>
                                        <View
                                            style = {{
                                                flexDirection: 'row',
                                                marginLeft: 20
                                            }}
                                        >
                                            <Text
                                                style = {{
                                                    color: '#BBBBBB',
                                                    fontSize: 14,
                                                    marginRight: 5
                                                }}
                                            >
                                                {`${moment(item.alarm.time).format('YYYY')}/${moment(item.alarm.time).format('MM')}/${moment(item.alarm.time).format('DD')}`}
                                            </Text>
                                            <Text
                                                style = {{
                                                    color: '#BBBBBB',
                                                    fontSize: 14
                                                }}
                                            >
                                                {item.notes}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style = {{
                                        height: 80,
                                        width: 5,
                                        backgroundColor: item.color,
                                        borderRadius: 5
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                        </ScrollView>
                </View>
            </SafeAreaView>
        </Fragment>
    );
}


