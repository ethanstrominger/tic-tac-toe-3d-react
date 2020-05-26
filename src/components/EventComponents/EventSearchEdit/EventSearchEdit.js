import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import EventSearchForm from '../EventSearchForm/EventSearchForm'
import MainLayout from '../../MainLayout/MainLayout'
import { saveUpdatedEventSearch, getEventSearch } from '../../../api/eventSearchApis.js'
import { displayUnexpectedFailure } from '../../../utils'

const EventSearchEdit = props => {
  const { msgAlert } = props
  const [eventSearch, setEventSearch] = useState({
    source: '',
    keyword: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: ''
  })
  const [isEventSearchUpdated, setIsEventSearchUpdated] = useState(false)
  useEffect(() => {
    getEventSearch(props)
      .then(res => {
        setEventSearch(res.data.event_search)
      })
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'fetching')
      })
  }, [])
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedEventSearch = Object.assign({ ...eventSearch }, updatedField)
    // React doesn't like mutating objects/storing its data without using this.setState
    // destructuring the eventSearch, making a copy of the object to update it with the modified field
    setEventSearch(editedEventSearch)
  }
  const handleSubmit = event => {
    event.preventDefault()
    saveUpdatedEventSearch(props, eventSearch)
      .then(() => setIsEventSearchUpdated(true))
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'saving')
      })
  }
  if (isEventSearchUpdated) {
    return <Redirect to={`/event_searches/${props.match.params.id}`} />
  }
  return (
    <MainLayout>
      <EventSearchForm
        eventSearch={eventSearch}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/event_searches/${props.match.params.id}`}
      />
    </MainLayout>
  )
}

export default EventSearchEdit
