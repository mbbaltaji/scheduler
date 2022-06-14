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

useEffect(()=> {
  // API GET REQUESTS 
  let days = axios.get(`/api/days`);
  let appointments = axios.get(`/api/appointments`);
  let interviewers = axios.get(`/api/interviewers`);

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


function findDay(day) {
  const days = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4
  }
  return days[day];
}

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

  const dayOfWeek = findDay(state.day);
  let day = {
    ...state.days[dayOfWeek],
    spots: state.days[dayOfWeek]
  }

  if(!state.appointments[id].interview) {
    day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots - 1
    }
  } else {
    day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots
    }
  }

  let days = state.days;
  days[dayOfWeek] = day;

  

  return axios.put(`/api/appointments/${id}`, appointment)
  .then(() => {
    setState({ ...state, appointments, days});
  })
}


const cancelInterview = id => {

  const appointment = {
    ...state.appointments[id],
    interview: null
  }

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const dayOfWeek = findDay(state.day);

  const day = {
    ...state.days[dayOfWeek],
    spots: state.days[dayOfWeek].spots + 1
  }

  let days = state.days;
  days[dayOfWeek] = day;

  return axios.delete(`/api/appointments/${id}`, appointment)
  .then( () => {
    setState({...state, appointments, days });
  })
}

return { state, setState, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;