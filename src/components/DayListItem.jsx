import React from 'react';
import 'components/DayListItem.scss'
import classNames from 'classnames';

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected' : props.selected, //styles selected day list item
    'day-list__item--full' : props.spots === 0  // styles unavailable day list item
  });

  function formatSpots(spots) {
    if (spots === 0) {
      return 'no spots remaining';
    } else if (props.spots === 1){
      return `${spots} spot remaining`;
    } else {
      return `${spots} spots remaining`; 
    }
  }
  
  return (
    <li className={dayClass} selected={props.selected} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className = "text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}