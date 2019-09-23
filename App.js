import React from 'react'
import { View } from 'react-native'
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers/index"
import StatusBar from "./components/UdaciStatusBar"
import Navigation from "./Navigation"
import { purple } from './utils/colors'
import { setLocalNotification } from "./utils/helpers"

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={purple} barStyle="light-content" />
          <Navigation />
        </View>
      </Provider>
    )
  }
}