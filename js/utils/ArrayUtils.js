import React from "react";
import {
    Image,
    TouchableOpacity,
} from 'react-native';

export default class ArrayUtils {

    static updateArray(array,item) {

        for (let i = 0, len = array.length; i < len; i++) {
            let temp = array[i];
            if (item=== temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }
}