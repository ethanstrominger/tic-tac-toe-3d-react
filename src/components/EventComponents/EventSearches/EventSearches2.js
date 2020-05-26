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
  // or is updat`ed
  useEffect(() => {
    getEventSearches(props) // returns promise to get eventSearches
      .then(res => {
        setEventSearches(res.data.event_searches.filter(eventSearches => getId(eventSearches) !== undefined))
      })
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'fetching')
      })
  }, [])

  // === set eventSearchesLinks to html bulleted list of eventSearches ussing eventSearches variable
  const eventSearchesWithNoBlanks = eventSearches.filter(eventSearches => getId(eventSearches))
  let eventSearchLinks
  if (eventSearchesWithNoBlanks.length === 0) {
    eventSearchLinks = <p>No event searches.  Click on create to add a new one.</p>
  } else {
    eventSearchLinks =
    <tbody style="width:100%">
      <tr>
        <th>ID</th>
        <th>Source</th>
        <th>Keyword</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Start Time</th>
        <th>End Time</th>
      </tr>
      </tbody>
    // eventSearchLinks = eventSearchesWithNoBlanks.map(eventSearches => (
      // <tr key={`eventSearches${getId(eventSearches)}`}>
      //   <td>
      //     <Link to={`/event_searches/${getId(eventSearches)}`}>{getId(eventSearches)}
      //     </Link>
      //   </td>
      //   <td>{eventSearches.source}</td>
      //   <td>{eventSearches.keyword}</td>
      //   <td>{eventSearches.start_date}</td>
      //   <td>{eventSearches.start_time}</td>
      //   <td>{eventSearches.end_date}</td>
      //   <td>{eventSearches.end_time}</td>
      // </tr>
    // ))
  }

  // === return fragment with a h4 and the list of eventSearches.
  return (
      // {eventSearchLinks}    <MainLayout>
      <h4>EventSearches!</h4>
      {eventSearchLinks}
    </MainLayout>
  )
}
export default EventSearches
