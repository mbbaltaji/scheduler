import React from 'react';
import 'components/DayListItem.scss'
import classNames from 'classnames';

/**
 * 
 * @param {Object} selected - determines if an html element is selected
 * @param {Object} spots - all the spots available to book an appointment
 * @returns JSX element of each day 
 */
export default function DayListItem(props) {
  const {
    selected,
    spots,
    setDay,
    name,
  } = props;

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected' : selected, //styles selected day list item
    'day-list__item--full' : spots === 0  // styles unavailable day list item
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
    <li className={dayClass} selected={selected} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className = "text--light">{formatSpots(spots)}</h3>
    </li>
  );
}