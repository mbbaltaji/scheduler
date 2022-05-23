import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList(props) {
  console.log(props.interviewers);
  const interviewers = props.interviewers;
  const interviewerListItems = interviewers.map((interviewer) => {
    return(
    <InterviewerListItem
      key={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      id={interviewer.id}
      setInterviewer={props.setInterviewer}
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
