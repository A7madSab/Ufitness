import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { FontAwesome, Entypo } from "@expo/vector-icons"
import { white, grey, purple } from "../utils/colors"
export default function UdaciStepper({ max, unit, step, value, onIncrement, onDecrement }) {
    return (
        <View style={[styles.row, { justifyContent: "space-between" }]}>
            {
                Platform.OS === "ios"
                    ? <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={onDecrement}
                            style={[styles.iosbtn, { borderTopLeftRadius: 0, borderBottomRightRadius: 0 }]}
                        >
                            <Entypo name='minus' size={30} color={purple} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onIncrement}
                            style={[styles.iosbtn, { borderTopLeftRadius: 0, borderBottomRightRadius: 0 }]}
                        >
                            <Entypo name='plus' size={30} color={purple} />
                        </TouchableOpacity>
                    </View>
                    : <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={onDecrement}
                            style={[styles.androidBtn, { borderTopLeftRadius: 0, borderBottomRightRadius: 0 }]}
                        >
                            <FontAwesome name='minus' size={30} color={white} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onIncrement}
                            style={[styles.androidBtn, { borderTopLeftRadius: 0, borderBottomRightRadius: 0 }]}
                        >
                            <FontAwesome name='plus' size={30} color={white} />
                        </TouchableOpacity>
                    </View>
            }
            <View style={styles.metricCounter}>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    iosbtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25
    },
    androidBtn: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2
    },
    metricCounter: {
        width: 85,
        justifyContent: "center",
        alignItems: "center"
    }
})