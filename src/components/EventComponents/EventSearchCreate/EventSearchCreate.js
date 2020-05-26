import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { createEventSearch } from '../../../api/eventSearchApis'
import EventSearchForm from '../EventSearchForm/EventSearchForm'
import MainLayout from '../../MainLayout/MainLayout'
import { displayUnexpectedFailure, getId } from '../../../utils'

const EventSearchCreate = props => {
  const { msgAlert } = props
  const [eventSearch, setEventSearch] = useState({
    source: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: ''
  })
  const [createdEventId, setCreatedEventId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedEventSearch = Object.assign({ ...eventSearch }, updatedField)
    setEventSearch(editedEventSearch)
  }

  const handleSubmit = event => {
    event.preventDefault()

    createEventSearch(props, eventSearch)
      .then(res => {
        const id = getId(res.data.event_search)
        setCreatedEventId(id)
      })
      .catch(error => {
        displayUnexpectedFailure(msgAlert, error, 'saving')
      })
  }

  if (createdEventId) {
    return <Redirect to={`/event_searches/${createdEventId}`} />
  }

  return (
    <MainLayout>
      <EventSearchForm
        eventSearch={eventSearch}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </MainLayout>
  )
}

export default EventSearchCreate
