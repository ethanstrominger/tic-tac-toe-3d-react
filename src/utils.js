// Postgress uses id and mongodb uses _id for identifiers
// getId allows code to work with same data model implemented in either language
import messages from './components/AutoDismissAlert/messages'

function getId (objectWithId) {
  const retVal = objectWithId.id || objectWithId._id
  return retVal
}

function displayUnexpectedFailure (msgAlert, error, verb) {
  msgAlert({
    heading: `Unexpected error ${verb}: ${error.message} ${error.status}`,
    message: messages.unexpectedFailure,
    variant: 'danger'
  })
}
export { displayUnexpectedFailure, getId }
