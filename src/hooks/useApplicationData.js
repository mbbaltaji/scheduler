import { useEffect, useState} from 'react';
import axios from 'axios';

const useApplicationData = () => {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

const setDay = day => setState({...state, day});

  /**
   * 
   * @param {Number} id - appointment id  
   * @param {Object} interview - newly created interview object
   */
  const bookInterview = (id, interview) => {
  console.log(id, interview);
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  setState({
    ...state,
    appointments
  });

  return axios.put(`/api/appointments/${id}`, {interview})
  .then(res => {
    console.log(res);
  })
}


const cancelInterview = id => {
  return axios.delete(`api/appointments/${id}`)
  .then( res => {
    console.log('delete: ', res);
  })
}

useEffect(()=> {
  // API GET REQUESTS 
  let days = axios.get(`http://localhost:8001/api/days`);
  let appointments = axios.get(`http://localhost:8001/api/appointments`);
  let interviewers = axios.get(`http://localhost:8001/api/interviewers`);

  Promise.all([days, appointments, interviewers]).then( res => {
    console.log('res', res);
    days = res[0].data;
    appointments = res[1].data;
    interviewers = res[2].data;
    setState(prev => ({...prev, days, appointments, interviewers}))
  })
  .catch(error => {
    console.log(error);
  })
}, []);

return { state, setState, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;