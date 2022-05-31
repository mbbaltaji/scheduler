export default function getAppointmentsForDay(state, day){
  
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