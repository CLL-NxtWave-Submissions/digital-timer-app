import {Component} from 'react'
import './index.css'

export default class DigitalTimer extends Component {
  state = {
    timerMinutes: 25,
    timerSeconds: 0,
    timerIntervalId: null,
  }

  onClickPause = () => {
    this.setState(previousTimerState => {
      const {timerIntervalId} = previousTimerState
      clearInterval(timerIntervalId)

      return {
        timerIntervalId: null,
      }
    })
  }

  updateTimerCountdown = () => {
    this.setState(previousTimerState => {
      let {timerMinutes, timerSeconds, timerIntervalId} = previousTimerState

      if (timerSeconds === 0) {
        timerMinutes -= 1
        timerSeconds -= 59
      } else {
        timerSeconds -= 1
      }

      if (timerMinutes === 0) {
        clearInterval(timerIntervalId)
        timerIntervalId = null
      }
      return {
        timerMinutes,
        timerSeconds,
        timerIntervalId,
      }
    })
  }

  onClickStart = () => {
    const intervalId = setInterval(this.updateTimerCountdown, 1000)

    this.setState({
      timerIntervalId: intervalId,
    })
  }

  onClickReset = () => {
    this.setState(previousTimerState => {
      const {timerIntervalId} = previousTimerState

      clearInterval(timerIntervalId)

      return {
        timerMinutes: 25,
        timerSeconds: 0,
        timerIntervalId: null,
      }
    })
  }

  onTimerIncrement = () =>
    this.setState(previousTimerState => ({
      timerMinutes: previousTimerState.timerMinutes + 1,
    }))

  onTimerDecrement = () =>
    this.setState(previousTimerState => ({
      timerMinutes: previousTimerState.timerMinutes - 1,
    }))
}
