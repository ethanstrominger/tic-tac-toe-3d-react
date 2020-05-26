import apiUrl from '../apiConfig'
import axios from 'axios'

const createEventSearch = (props, eventSearch) => {
  return axios({
    url: `${apiUrl}/event_searches/`,
    method: 'POST',
    data: {
      event_search: eventSearch
    },
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}

const destroyEventSearch = (props) => {
  return axios({
    url: `${apiUrl}/event_searches/${props.match.params.id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}

const getEventSearch = (props) => {
  return axios({
    url: `${apiUrl}/event_searches/${props.match.params.id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}

const getEventSearches = (props) => {
  return axios({
    url: `${apiUrl}/event_searches/`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}

const saveUpdatedEventSearch = (props, eventSearch) => {
  return axios({
    url: `${apiUrl}/event_searches/${props.match.params.id}`,
    method: 'PATCH',
    data: {
      event_search: eventSearch
    },
    headers: {
      Authorization: `Bearer ${props.user.token}`
    }
  })
}

export {
  createEventSearch,
  destroyEventSearch,
  getEventSearch,
  getEventSearches,
  saveUpdatedEventSearch
}
