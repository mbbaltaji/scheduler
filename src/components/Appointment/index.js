import React, {Fragment} from 'react';

import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import useVisualMode from '../../hooks/useVisualMode';

// Different modes of Appointment component
const EMPTY = "EMPTY";  
const SHOW = "SHOW";
const CREATE = "CREATE";

/**
 * @param {Object} props - Data passed from Application component to be rendered
 * @returns {Object} - React Element that represents the Appointment component and its children
 */
export default function Appointment (props) {
  
  /**
   * Functions to control different modes of Appointment component.
   * These functions render the children of Appointment component 
   * based on the value of mode
   */ 
  const { mode, transition, back} = useVisualMode (
    props.interview ? SHOW : EMPTY
  )
  
  const {
    time, 
    interview, 
    student, 
    interviewers
  } = props;
  
  return (
    <article className="appointment">
      <Header time={time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
)}

      {mode === CREATE && 
      <Form 
        interviewers={interviewers}
        onSave={() =>  console.log('hi')}
        onCancel={() => back()}
      /> }

    </article>
  )
}

