import React from 'react';
import {View, Text} from 'react-native'
import { useRoute } from '@react-navigation/native';
function MedicationDetailsScreen({navigation}) {
    const route = useRoute();
    return (
        <Text>{route.params.name}</Text>
    );
}

export default MedicationDetailsScreen;