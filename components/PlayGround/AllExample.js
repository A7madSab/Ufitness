import React from 'react'
import { View, Switch, FlatList, Alert, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableHighlight, ActivityIndicator, Image, Picker } from "react-native"


const Reviews = [
    {
        name: 'Velit cupidatat in sint nulla anim pariatur amet Lorem.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Pariatur sunt eu veniam quis non minim ipsum enim officia nostrud.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Nisi in nulla id nulla est est eiusmod proident pariatur aute elit.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Mollit laboris velit id qui consectetur do sit dolore non ad nulla.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Elit consectetur duis aliquip anim nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    }, {
        name: 'Velit cupidatat in sint nulla anim pariatur amet Lorem.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Pariatur sunt eu veniam quis non minim ipsum enim officia nostrud.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Nisi in nulla id nulla est est eiusmod proident pariatur aute elit.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Mollit laboris velit id qui consectetur do sit dolore non ad nulla.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Elit consectetur duis aliquip anim nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
    {
        name: 'Aute consectetur sit nulla voluptate esse ipsum ea laboris adipisicing incididunt nisi.',
        text: 'Esse esse incididunt quis ullamco dolor labore est sint ipsum non cupidatat fugiat esse. Elit tempor do mollit in. Cupidatat ipsum labore laboris sunt proident mollit et irure officia reprehenderit dolor amet.'
    },
]


export const Review = ({ name, text }) => (
    <View>
        <Text>{name}</Text>
        <Text>{text}</Text>
        <Text>---------------------------------------</Text>
    </View>
)
export default class SwitchDemo extends React.Component {
    state = {
        switch: false,
        input: 'Ahmad Sabry',
        language: "Java",
        modalVisible: false,
    }
    handleToggleSwitch = () => {
        this.setState((state) => ({
            switch: !state.switch
        }))
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    generateKey = () => {
        return Math.random().toString() + (new Date).toString()
    }
    renderItem = ({ item }) => (
        <Review key={this.generateKey()} name={item.name} text={item.text} />
    )
    render() {
        return (
            <KeyboardAvoidingView behavior="padding">

                <Image source={require("../../assets/icon.png")} />
                {/** <Image source={{ uri: '' }} /> */}

                <Text>Activity Indicator</Text>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <ActivityIndicator size="small" color="#00ff00" />
                </View>

                <Text>Switch Example</Text>
                <Switch
                    value={this.state.switch}
                    onValueChange={this.handleToggleSwitch}
                />

                <Text>Picker Example</Text>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 400 }}
                    onValueChange={itemValue =>
                        this.setState({ language: itemValue })
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <View style={{ marginTop: 22 }}>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <Text>Hello World!</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <FlatList data={Reviews} renderItem={this.renderItem} />
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text>Show Modal</Text>
                    </TouchableHighlight>
                </View>
                {
                    this.state.switch && <TextInput
                        value={this.state.input}
                        onChangeText={(input => this.setState(() => ({ input })))}
                    />
                }
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})