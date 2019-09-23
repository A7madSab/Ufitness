import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { Foundation } from "@expo/vector-icons"
import { purple, white } from "../utils/colors"
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { calculateDirection } from '../utils/helpers'

export default class Live extends Component {
    state = {
        coords: null,
        status: "granted",
        direction: '',
        bounceValue: new Animated.Value(1)
    }
    componentDidMount() {
        Permissions.getAsync(Permissions.LOCATION)
            .then(({ status }) => {
                if (status === "granted") {
                    return this.setLocation()
                }
                this.setState(() => ({ status }))
            })
            .catch(err => {
                console.error("Error getting location permission: ", err)
                this.setState(() => ({
                    status: "undetermined"
                }))
            })
    }
    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({ status }) => {
                this.setState(() => ({
                    status
                }))
                if (status === "granted") {
                    return this.setLocation()
                }
            }).catch(err => console.warn("Error getting location permission: ", err))
    }
    setLocation = () => {
        Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 1,
            distanceInterval: 1
        }, ({ coords }) => {
            const newDirection = calculateDirection(coords.heading)
            const { direction, bounceValue } = this.state
            if (newDirection !== direction) {
                Animated.sequence([
                    Animated.timing(bounceValue, { toValue: 1.04, duration: 200 }),
                    Animated.spring(bounceValue, { toValue: 1, friction: 4 })
                ]).start()
            }
            this.setState(() => ({
                coords,
                state: 'granted',
                direction: newDirection
            }))
        })
    }
    render() {
        const { coords, status, direction, bounceValue } = this.state
        if (status === null) {
            return <ActivityIndicator style={{ margin: 30 }} />
        }
        if (status === "denied") {
            return (
                <View style={styles.center}>
                    <Foundation name="alert" size={50} />
                    <Text>
                        You denied your location. You can fix this by visting the settings
                    </Text>
                </View>
            )
        }
        if (status === "undetermined") {
            return (
                <View style={styles.center}>
                    <Foundation name="alert" size={50} />
                    <Text>
                        You need to enable location services for this app.
                    </Text>
                    <TouchableOpacity onPress={this.askPermission} style={styles.button} >
                        <Text style={styles.buttonText}>
                            Enable
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.directioncontainer}>
                    <Text style={styles.subheader}> You're Heading:</Text>
                    <Animated.Text style={[styles.direactionHeader, { transform: [{ scale: bounceValue }] }]}>
                        {direction}
                    </Animated.Text>
                </View>
                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={[styles.header, { color: white }]}>
                            Altitude
                        </Text>
                        {coords === null
                            ? <ActivityIndicator style={{ margin: 30 }} />
                            : <Text style={[styles.sub, { color: white }]}>
                                {Math.round(coords.altitude)} meters
                            </Text>
                        }
                    </View>
                    <View style={styles.metric}>
                        <Text style={[styles.header, { color: white }]}>
                            Speed
                        </Text>
                        {coords === null
                            ? <ActivityIndicator style={{ margin: 30 }} />
                            : <Text style={[styles.sub, { color: white }]}>
                                {Math.round(coords.speed)} m/s
                            </Text>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 30
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: "center",
        borderRadius: 5,
        margin: 20
    },
    buttonText: {
        color: white,
        fontSize: 20
    },
    directioncontainer: {
        flex: 1,
        justifyContent: "center"
    },
    direactionHeader: {
        fontSize: 35,
        textAlign: "center",
        color: purple
    },
    header: {
        fontSize: 35,
        textAlign: "center"
    },
    subheader: {
        fontSize: 25,
        textAlign: "center"
    },
    direction: {
        color: purple,
        fontSize: 120,
        textAlign: 'center'
    },
    metricContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: purple
    },
    metric: {
        flex: 1,
        paddingVertical: 15
    },
    sub: {
        textAlign: "center"
    }
})
