import create from 'zustand';
import produce from 'immer';
import AsyncStorage  from '@react-native-async-storage/async-storage';
//import { Storage } from 'expo-storage';
//using https://dev.to/franciscomendes10866/zustand-and-immer-with-react-5ajh
//using https://reactnative.dev/docs/asyncstorage
//using https://www.npmjs.com/package/expo-storage
const immer = (config) =>
     (set, get, api) => config(
        (fn) => {
            const state = typeof fn === 'function' ? fn : () => fn;
            set(produce(state));
        }, get, api);

const zustandCreate = (children) => 
     create(immer(children));

const storeState = {event: []};
const storeMethod = (set, get) => 
     ({
        init: async () => {
            try {
                const event = await AsyncStorage.getItem('EVENT');
                if (event !== null) {
                    set({ event: JSON.parse(event) });
                }
            } catch (error) {console.log(error);}
        },
        // eslint-disable-next-line no-async-promise-executor
        updateEvent: async (item) => new Promise( async (resolve) => {
            const datePresent = get().event.find((data) => {
                if (data.date === item.date) {
                    return true;
                }
                return false;
            });
            if (datePresent) {
                const updatedEvent = get().event.map((data) => {
                    if (datePresent.date === data.date) {
                        return { ...data, eventList: [...data.eventList, ...item.eventList] };
                    }
                    return data;
                });
                try {
                    set({ event: updatedEvent });
                    await AsyncStorage.setItem('EVENT', JSON.stringify(updatedEvent));
                } catch (error) {console.log(error);}
            } else {
                const newEvent = [...get().event, item];
                try {
                    set({ event: newEvent });
                    resolve();
                    await AsyncStorage.setItem('EVENT', JSON.stringify(newEvent));
                } catch (error) {console.log(error);}
            }
        }),
        deleteEvent: () => { },
        // eslint-disable-next-line no-async-promise-executor
        updateCurrentEvent: async (item) => new Promise( async (resolve) => {
            const prevEvent = get().event;
            const newEvent = prevEvent.map((data) => {
                if (item.date === data.date) {
                    const prevEventList = [...data.eventList];
                    const newEventList = prevEventList.map((list) => {
                        if (list.key === item.event.key) {
                            return item.event;
                        }
                        return list;
                    });
                    return { ...data, eventList: newEventList };
                }
                return data;
            });
            try {
                set({ event: newEvent });
                resolve();
                await AsyncStorage.setItem('EVENT', JSON.stringify(newEvent));
            } catch (error) {console.log(error);}
        }),
        // eslint-disable-next-line no-async-promise-executor
        deleteCurrentEvent: async (item) => new Promise(async (resolve) => {
            const prevEvent = get().event;
            const newEvent = prevEvent.map((data) => {
                if (item.date === data.date) {
                    const prevEventList = [...data.eventList];
                    const newEventList = prevEventList.filter((list) => {
                        if (list.key === item.event.key) {
                            return false;
                        }
                        return true;
                    });
                    return { ...data, eventList: newEventList };
                }
                return data;
            });
            const isEmpty = newEvent.filter((data) => {
                if (data.eventList.length === 0) {
                    return false;
                }
                return true;
            });
            try {
                set({ event: isEmpty });
                resolve();
                await AsyncStorage.setItem('EVENT', JSON.stringify(isEmpty));
            } catch (error) {console.log(error);}
        })
    });


const useStorage = zustandCreate((set, get) => ({
    ...storeState, ...storeMethod(set, get)
}));

export default useStorage;