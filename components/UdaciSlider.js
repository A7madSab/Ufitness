import React from 'react'
import { Text, View, Slider, StyleSheet } from "react-native"
import { grey } from 'ansi-colors'

export default UdaciSlider = ({ max, unit, step, value, onChange }) => {
    return (
        <View style={styles.row}>
            <Slider
                style={{ flex: 1 }}
                step={step}
                value={value}
                minimumValue={0}
                maximumValue={max}
                onValueChange={onChange}
            />
            <View style={styles.metricCounter}>
                <Text style={{ fontSize: 14, textAlign: "center" }}>{value}</Text>
                <Text style={{ fontSize: 14, textAlign: "center" }}>{unit}</Text>
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
    metricCounter: {
        width: 85,
        justifyContent: "center",
        alignItems: "center"
    }
})

