import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Function} onChange - function to be executed when user clicks on interviewer 
 * @param {Number} value - interviewer id to be selected
 * @param {Array} interviewers - list of all the interviewers 
 * @returns JSX element that contains a list of all the interviewers
 */
export default function InterviewerList(props) {
  const {onChange, value, interviewers} = props;
  
  const interviewerListItems = interviewers.map((interviewer) => {
    return(
    <InterviewerListItem
      key={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}
    />
    );
  })
  
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

