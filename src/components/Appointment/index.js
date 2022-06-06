import React, {Fragment} from 'react';

import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';

// Different modes of Appointment component
const EMPTY = "EMPTY";  
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


/**
 * @param {Object} props Data passed from Application component to be rendered
 * @param {Number} props.id unique id for each appointment 
 * @returns {Object} React Element that represents the Appointment component and its children
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
  
  //props
  const {
    id,
    time, 
    interview, 
    student, 
    interviewers,
    bookInterview,
    cancelInterview
  } = props;

  /**
  * Creates an interview a new object 
  * @param {String} name - name of student 
  * @param {String} interviewer - name of interviewer
  */
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    console.log(interview);
    transition(SAVING)
    bookInterview(id, interview)
    .then(() => { transition(SHOW)})
  }

  const remove = () => {
    
    if (mode === SHOW) {
      transition(CONFIRM)
    } else{
      transition(DELETING)
      cancelInterview(id)
      .then(() => {
      transition(EMPTY);
      })
    }
  }

  return (
    <article className="appointment">
      <Header time={time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={remove}
      />
)}

      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={back}/> }
      {mode === SAVING && <Status message="Saving"></Status>}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm  
          message="Are you sure you want to cancel this appointment?"
          onCancel={back}
          onConfirm={remove}
        />
          )}

    </article>
  )
}

