import React from 'react'
// Import the Alert component from react-bootstrap
import Alert from 'react-bootstrap/Alert'

// Import styles for the AutoDismissAlert
import './AutoDismissAlert.scss'

// Class component with state
class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)

    // `show` on state will be `true` initially
    // This is used with the bootstrap `Alert` component
    // to handle displaying or not displaying
    this.state = {
      show: true
    }
  }

  // This runs the first time we "mount" a AutoDismissAlert
  // It starts a timer to set `show` to `false` after 5 seconds (5000 ms)
  // Store our timer in `this.timer`
  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ show: false })
    }, 5000)
  }

  // This will run when component is removed from the page ("unmounts")
  // It clears our timer - so if our user dismisses the alert
  // it won't try to remove itself again later (and probably cause errors)
  // Pass `this.timer` to clear the interval
  componentWillUnmount () {
    clearInterval(this.timer)
  }

  // This method sets the `show` state to be `false`
  // This is passed to the `onClose` prop that bootstrap's `Alert` will run
  // after the `Alert` is closed
  handleClose = () => this.setState({ show: false })

  render () {
    // Destructure from props
    const { variant, heading, message } = this.props
    // Render a `Alert` component from bootstrap
    // Pass it `dismissable` to allow the user to manually dismiss
    // `show` which is a controlled way to handle displaying the alert
    // `variant` which styles the alert
    // `onClose` which runs a function when the alert is closed
    return (
      <Alert
        dismissible
        show={this.state.show}
        variant={variant}
        onClose={this.handleClose}
      >
        <div className="container">
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
