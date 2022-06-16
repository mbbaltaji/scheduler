import React, {Fragment} from 'react';

import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Error from 'components/Appointment/Error';
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
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



/**
 * @param {Object} props Data passed from Application component to be rendered
 * @param {Number} props.id unique id for each appointment 
 * @returns {Object} React Element that represents the Appointment component and its children
 */
export default function Appointment (props) {

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
   * Functions to control different modes of Appointment component.
   * These functions render the children of Appointment component 
   * based on the value of mode
   */ 
  const { mode, transition, back} = useVisualMode (
    props.interview ? SHOW : EMPTY
  )
  

  /**
  * Creates an interview a new object 
  * @param {String} name - name of student 
  * @param {String} interviewer - name of interviewer
  */
  const save = (name, interviewer) => {
    console.log({name, interviewer});
    if (!interviewer) {
      transition(ERROR_SAVE, true);
    } else {
    const interview = {
      student: name,
      interviewer
    };
    // create a new interview object then render the Show component
    transition(SAVING);
    bookInterview(id, interview)
    .then(() => { transition(SHOW)})
    .catch(error => {
      console.log('Error saving', error);
      transition(ERROR_SAVE, true);
    })
  }
  };

  // function called when user wants to cancel or remove an interview
  const remove = () => {
    if (mode === SHOW) {
      transition(CONFIRM)
    } else{
      transition(DELETING, true)
      cancelInterview(id)
      .then(() => {
      transition(EMPTY);
      })
      .catch( error => {
        console.log('Deleting Error: ', error);
        transition(ERROR_DELETE, true);
      })
    }
  }

  const edit = () => {
    transition(EDIT);
  }

  return (
    <article className="appointment"  data-testid="appointment">
      <Header time={time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete={remove}
        onEdit={edit}
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
    {mode === EDIT && (
      <Form
        name={interview.student}
        interviewer={interview.interviewer?.id}
        onCancel={back}
        onSave={save}
        interviewers={interviewers}

      />  
    )}
    {mode === ERROR_SAVE && (<Error message="Please select an interviewer" onClose={back} />)}
    {mode === ERROR_DELETE && (<Error message="Could not cancel appointment" onClose={back} />)}
    </article>
  )
}

