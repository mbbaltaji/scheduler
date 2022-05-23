import React from 'react';
import className from 'classnames';

import 'components/InterviewerListItem.scss'

function InterviewerListItem (props) {

  const interviewerClass = className('interviewers__item', {
    'interviewers__item--selected' : props.selected
  })
  return (
    <li className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
    onClick={() => props.setInterviewer(props.id)}
  />
  {props.selected && props.name}
</li>
  )
}

export default InterviewerListItem;