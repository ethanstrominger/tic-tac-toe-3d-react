import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EventSearchForm = ({ eventSearch, handleSubmit, handleChange }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="source">
          <Form.Label>Source</Form.Label>
          <Form.Control
            placeholder="Meetup, EventBrite"
            name="source"
            value={eventSearch.source || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="keyword">
          <Form.Label>Keyword</Form.Label>
          <Form.Control
            placeholder="Keyword"
            name="keyword"
            value={eventSearch.keyword || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="start_date">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            placeholder="mm-dd-yyyy"
            name="start_date"
            type="date"
            value={eventSearch.start_date || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="end_date">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            placeholder="mm-dd-yyyy"
            name="end_date"
            type="date"
            value={eventSearch.end_date || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="start_time">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            placeholder="hh:mm:ss AM/PM"
            name="start_time"
            type="time"
            value={eventSearch.start_time || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="end_time">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            placeholder="hh:mm:ss AM/PM"
            name="end_time"
            type="time"
            value={eventSearch.end_time || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  </div>
)

export default EventSearchForm
