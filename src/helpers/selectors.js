export function getAppointmentsForDay(state, day){
  
  if (!day) {
    return [];
  }

  const days = state.days;
  const foundDayObj = days.find( dayObj => dayObj.name === day);
  
  if (!foundDayObj) {
    return [];
  }
  const foundAppointments = foundDayObj.appointments.map( id => {
    return state.appointments[id];
  });

  return foundAppointments;
}

export function getInterviewersForDay(state, day){
  if (!day) {
    return [];
  }

  const days = state.days;
  const foundDayObj = days.find( dayObj => dayObj.name === day);

  if (!foundDayObj) {
    return [];
  }

  const foundInterviewers = foundDayObj.interviewers.map( id => {
    return state.interviewers[id];
  });

  return foundInterviewers;
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

