import React from 'react'
import { Text, View, Slider } from "react-native"

export default UdaciSlider = ({ max, unit, step, value, onChange }) => {
    return (
        <View>
            <Slider
                step={step}
                value={value}
                minimumValue={0}
                maximumValue={max}
                onValueChange={onChange}
            />
            <View>
                <Text>Value: {value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

