
/**
 * @param {Object} state - the state of a component
 * @param {String} day - the day of appointments needed
 * @returns {Array} - Array of daily appointment objects 
 */
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


/**
 * @param {Object} state - the state of a component
 * @param {String} day - the day of interviewers needed
 * @returns {Array} - Array of daily interviewers objects 
 */
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

/**
 * 
 * @param {Object} state - the state of a component
 * @param {Object} interview - Object that contains the student name and interviewer id
 * @returns {Object} - interviewer data
 */
export function getInterview(state, interview ) {  

  let res = {};

  const interviewersObj = state.interviewers;


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

