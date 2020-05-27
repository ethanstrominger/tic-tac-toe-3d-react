import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MessageForm = ({ message, handleSubmit, handleChange }) => (
  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fromNickname">
          <Form.Label>Source</Form.Label>
          <Form.Control
            placeholder="Your nickname"
            name="fromNickname"
            value={message.fromNickname || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="toNickname">
          <Form.Label>Source</Form.Label>
          <Form.Control
            placeholder="Send to (nickname)"
            name="toNickname"
            value={message.toNickname || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="messageText">
          <Form.Label>Source</Form.Label>
          <Form.Control
            placeholder="Message"
            name="messageText"
            value={message.messageText || ''}
            onChange={handleChange}
            required
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

export default MessageForm
