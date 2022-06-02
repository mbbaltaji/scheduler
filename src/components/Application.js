import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import "components/Appointment";
import DayList from './DayList'
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview } from '../helpers/selectors'

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({...prev, days}));


  useEffect(()=> {
    // API GET REQUESTS 
    let days = axios.get(`http://localhost:8001/api/days`);
    let appointments = axios.get(`http://localhost:8001/api/appointments`);
    let interviewers = axios.get(`http://localhost:8001/api/interviewers`);

    Promise.all([days, appointments, interviewers]).then( res => {
      console.log(res);
      days = res[0].data;
      appointments = res[1].data;
      interviewers = res[2].data;
      setState(prev => ({...prev, days, appointments, interviewers}))
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
      );
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
          days={state.days} 
          day={state.day}
          setDay={setDay}  
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
         {schedule}
      </section>
    </main>
  );
}
