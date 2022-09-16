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

  render() {
      const {timerMinutes, timerSeconds, timerIntervalId} = this.state

      const timerMinutesString = timerMinutes < 10 ? '0' + timerMinutes : timerMinutes
      const timerSecondsString = timerSeconds < 10 ? '0' + timerSeconds : timerSeconds

      return (
          <div className="digital-timer-bg-container">
              <h1 className="digital-timer-header">Digital Timer</h1>

              <div className="digital-timer-content-container">
                  <div className="digital-timer-display-container">
                    <div className="digital-timer-details-container">
                        <p className="digital-timer-countdown">{`${timerMinutesString}:${timerSecondsString}`}</p>
                        <p className="digital-timer-status">{timerIntervalId === null ? 'Paused' : 'Running'}</p>
                    </div>
                  </div>

                  <div className="digital-timer-controls-container">
                      <div className="digital-timer-start-reset-controls-container">
                          <div className="digital-timer-control">
                              <button type="button" className="digital-timer-control-button" onClick={timerIntervalId === null ? this.onClickStart : this.onClickPause}>
                                  <img 
                                  className="digital-timer-control-img" 
                                  src={
                                      timerIntervalId === null ? 
                                      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png' : 
                                      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                                      } 
                                  alt={
                                      timerIntervalId === null 
                                      ? 'play icon' : 
                                      'pause icon'
                                      } 

                                  />
                              </button>

                              <p className="digital-timer-control-name">
                                {
                                    timerIntervalId === null ? 
                                    'Start' : 
                                    'Pause'
                                }
                             </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
}
