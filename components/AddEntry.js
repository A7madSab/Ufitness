import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { getMetricMetaInfo, timeToString } from "../utils/helpers"
import UdaciStepper from "./UdaciStepper"
import UdaciSlider from "./UdaciSlider"
import DateHeader from "./DateHeader"
import TextButton from "./TextButton"
// import AllExample from "./PlayGround/AllExample"
import { submitEntry, removeEntry } from "../utils/api"

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>
                SUBMIT
            </Text>
        </TouchableOpacity>
    )
}

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        sleep: 0,
        eat: 0,
        swim: 0
    }
    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] + step
            return {
                ...state,
                [metric]: count > max ? state[metric] : count
            }
        })
    }
    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }
    slide = (metric, value) => {
        this.setState((state) => ({
            ...state,
            [metric]: value
        }))
    }
    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.setState({
            run: 0,
            bike: 0,
            sleep: 0,
            eat: 0,
            swim: 0
        })

        submitEntry({ key, entry })
    }
    reset = () => {
        const key = timeToString()
        removeEntry(key)
    }
    render() {
        const metaInfo = getMetricMetaInfo()
        // <Text>{JSON.stringify(this.state)}</Text>
        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons
                        name="md-happy"
                        size={100}
                    />
                    <Text>You have already logged your information for today</Text>
                    <TextButton onPress={this.reset}> Reset </TextButton>
                </View>
            )
        }
        return (



            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />

                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider' ?
                                <UdaciSlider
                                    value={value}
                                    onChange={(value => this.slide(key, value))}
                                    {...rest}
                                /> :
                                <UdaciStepper
                                    value={value}
                                    onIncrement={(value => this.increment(key))}
                                    onDecrement={(value => this.decrement(key))}
                                    {...rest}
                                />
                            }
                            <SubmitBtn onPress={this.submit}></SubmitBtn>
                        </View>
                    )
                })}
            </View>
        )
    }
}