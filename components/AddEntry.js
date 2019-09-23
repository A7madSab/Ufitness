import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { getMetricMetaInfo, timeToString, getDailyReminderValue, clearLocalNotification, setLocalNotification } from "../utils/helpers"
import UdaciStepper from "./UdaciStepper"
import UdaciSlider from "./UdaciSlider"
import DateHeader from "./DateHeader"
import TextButton from "./TextButton"
// import AllExample from "./PlayGround/AllExample"
import { submitEntry, removeEntry } from "../utils/api"
import { connect } from "react-redux"
import { addEntry } from "../actions/index"
import { white, purple } from "../utils/colors"
import { NavigationActions } from 'react-navigation';


function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
        >
            <Text style={styles.submitBtnText}>
                SUBMIT
            </Text>
        </TouchableOpacity>
    )
}
class AddEntry extends Component {
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

        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState({
            run: 0,
            bike: 0,
            sleep: 0,
            eat: 0,
            swim: 0
        })

        this.toHome()

        submitEntry({ key, entry })

        clearLocalNotification()

        setLocalNotification()
    }
    reset = () => {
        const key = timeToString()
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        this.toHome()

        removeEntry(key)
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: "AddEntry"
        }))
    }
    render() {
        const metaInfo = getMetricMetaInfo()
        // <Text>{JSON.stringify(this.state)}</Text>
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
                        size={100}
                    />
                    <Text style={styles.text}>You have already logged your information for today</Text>
                    <TextButton style={{ padding: 10 }} onPress={this.reset}> Reset </TextButton>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key} style={styles.row}>
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
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}></SubmitBtn>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 30,
        marginRight: 30,
    },
    text: {
        textAlign: "center"
    },
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 45
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 35,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: "center"
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

function mapStateToProps(state) {
    const key = timeToString()
    return {
        alreadyLogged: state[key] && typeof state[key].today === "undefined"
    }
}
export default connect(mapStateToProps)(AddEntry)