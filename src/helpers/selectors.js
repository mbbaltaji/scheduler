export function getAppointmentsForDay(state, day){
  
  if (!day) {
    return [];
  }

  const days = state.days;
  const foundDay = days.find( dayObj => dayObj.name === day);
  
  if (!foundDay) {
    return [];
  }
  const foundAppointments = foundDay.appointments.map( id => {
    return state.appointments[id];
  });

  return foundAppointments;
}

export function getInterview(state, interview ) {  

  const interviewersObj = state.interviewers;
  let res = {};

  if (!interviewersObj || !interview) {
    return null;
  }

  for(const key of Object.keys(interviewersObj)){
    let interviewer = interviewersObj[key];
    if(interviewer.id === interview.interviewer){
      res["interviewer"] = interviewer;
      res["student"] = interview.student;
    }
  }
  return res;  
}