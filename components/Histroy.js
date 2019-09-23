import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { receiveEntries, addEntry } from "../actions/index"
import { getDailyReminderValue, timeToString } from "../utils/helpers"
import { fetchCalenderResults } from '../utils/api'
import UdacifitnessCalender from "udacifitness-calendar"
import { white } from "../utils/colors"
import DateHeader from "./DateHeader"
import MetricCard from "./MetricCard"
import { AppLoading } from "expo"

class Histroy extends Component {
    state = {
        ready: false
    }
    componentDidMount() {
        const { dispatch } = this.props

        fetchCalenderResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then((entries) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
            .then(() => this.setState(({ ready: true })))
    }
    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
            {today
                ? <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>
                        {
                            today
                        }
                    </Text>
                </View>
                : <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    "EntryDetail",
                    { entryId: key }
                )}>
                    <MetricCard metrics={metrics} date={formattedDate} />
                </TouchableOpacity>
            }
        </View>
    )
    renderEmptyDate(formattedDate) {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    You didn't log any data today.
                </Text>
            </View>
        )
    }
    render() {
        const { entries } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <UdacifitnessCalender
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        )
    }
}

const mapStateToProps = (entries) => {
    return {
        entries
    }
}

const styles = StyleSheet.create({
    noDataText: {
        fontSize: 20,
        paddingVertical: 20
    },
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        padding: 20,
        marginHorizontal: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset: {
            width: 0,
            Histroy: 3
        }
    }
})

export default connect(mapStateToProps)(Histroy)