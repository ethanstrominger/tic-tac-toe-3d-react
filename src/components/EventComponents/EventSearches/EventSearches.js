import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../MainLayout/MainLayout'
import { getEventSearches } from '../../../api/eventSearchApis'
import { displayUnexpectedFailure, getId } from '../../../utils'

const EventSearches = props => {
  // NOTE on React Hook: useState is used by React Hooks to create state variables and
  // setter function for component
  const { msgAlert } = props
  const [eventSearches, setEventSearches] = useState([])

  // ==== Fetch eventSearches into eventSearches variable ===
  // NOTE on React Hook: useEffect: syntax by React Hooks. Code is called when component mounts,
  // or is updated
  useEffect(() => {
    getEventSearches(props) // returns promise to get eventSearches
      .then(res => {
        setEventSearches(res.data.event_searches.filter(eventSearches => getId(eventSearches) !== undefined))
      })
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'fetching')
      })
  }, [])

  const timep = (time) => {
    return time
  }
  // === set eventSearchesLinks to html bulleted list of eventSearches ussing eventSearches variable
  const eventSearchesWithNoBlanks = eventSearches.filter(eventSearches => getId(eventSearches))
  let eventSearchLinks
  if (eventSearchesWithNoBlanks.length === 0) {
    eventSearchLinks = <p>No event searches.  Click on create to add a new one.</p>
  } else {
    eventSearchLinks = eventSearchesWithNoBlanks.map(eventSearches => (
      <li key={`eventSearches${getId(eventSearches)}`}>
        <Link to={`/event_searches/${getId(eventSearches)}`}>{getId(eventSearches)}</Link>
        {` Source: ${eventSearches.source} * Keyword: ${eventSearches.keyword} * Start/End Dates: ${eventSearches.start_date} to ${eventSearches.end_date} * Start/End Times: ${timep(eventSearches.start_time)} to ${timep(eventSearches.end_time)}`}
      </li>
    ))
  }

  // === return fragment with a h4 and the list of eventSearches.
  return (
    <MainLayout>
      <h4>Event Searches</h4>
      <ul>
        {eventSearchLinks}
      </ul>
    </MainLayout>
  )
}
export default EventSearches
