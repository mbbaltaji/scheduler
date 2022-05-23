import React from 'react';
import DayListItem from './DayListItem';


//<DayList> component that will serve as a container for all the <DayListItem> components
export default function DayList(props) {
  // extracting each day object and mapping each day to DayListItem component
  const days = props.days; 
  const dayListItems = days.map((day) => {  
    // return DayListITem as children of DayList
    return (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value} 
      setDay={props.onChange}
    />
    );
  })  
  return (
    <ul>
      {dayListItems}
    </ul>
  );
}