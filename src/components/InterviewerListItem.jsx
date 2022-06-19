import React from 'react';
import className from 'classnames';

import 'components/InterviewerListItem.scss'

/**
 * 
 * @param {Object} avatar - picture of each interviewer 
 * @param {name} name - name of each interviewer 
 * @param {Function} setInterviewer - function that handles click event of selecting an interviewer
 * @returns JSX element representing each interviewer
 */
function InterviewerListItem (props) {
  const {
    avatar,
    name,
    setInterviewer,
    selected,
  } = props;

  const interviewerClass = className('interviewers__item', {
    'interviewers__item--selected' : selected
  });
  
  return (
    <li className={interviewerClass}>
      <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
      onClick={setInterviewer}
    />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;