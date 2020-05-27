import messages from './components/AutoDismissAlert/messages'

function displayUnexpectedFailure (msgAlert, error, verb) {
  msgAlert({
    heading: `Unexpected error ${verb}: ${error.message} ${error.status}`,
    message: messages.unexpectedFailure,
    variant: 'danger'
  })
}
export { displayUnexpectedFailure }
