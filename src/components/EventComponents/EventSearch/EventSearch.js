import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import MainLayout from '../../MainLayout/MainLayout'
import { getEventSearch, destroyEventSearch } from '../../../api/eventSearchApis'
import { displayUnexpectedFailure } from '../../../utils'
import messages from '../../AutoDismissAlert/messages'

const EventSearch = props => {
  const { msgAlert } = props
  const [eventSearch, setEventSearch] = useState({})
  const [deleted, setDeleted] = useState(false)
  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    getEventSearch(props)
      // Make sure to update this.setState to our hooks setEventSearch function
      .then(res => {
        setEventSearch(res.data.event_search)
      })
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'fetching')
      })
  }, [])

  const destroy = () => {
    destroyEventSearch(props)
      .then(() => {
        setDeleted(true)
        msgAlert({
          heading: 'Delete Completed',
          message: messages.deleteSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'deleting')
      })
  }

  if (!eventSearch) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'EventSearch succesfully deleted!' } }
    } />
  }

  return (
    <MainLayout>
      <p>Source: {eventSearch.source}</p>
      <p>Keyword: {eventSearch.keyword}</p>
      <p>Start Date: {eventSearch.start_date}</p>
      <p>Start Time: {eventSearch.start_time}</p>
      <p>End Date: {eventSearch.end_date}</p>
      <p>End Time: {eventSearch.end_time}</p>
      <button onClick={destroy}>Delete</button>
      <Link to={`/event_searches/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/event_searches"><button>Back</button></Link>
    </MainLayout>
  )
}

export default EventSearch
