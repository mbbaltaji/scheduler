import React, {useState} from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'


/**
 * 
 * @param {Function} onCancel - when user wants to cancel creation of new appointment
 * @param {Function} onSave - handles save event. when user wants to confirm creation of new appointment
 * @returns {Object} JSX element that renders when user clicks add interview button
 */
export default function Form(props) {

  const {name, onSave, onCancel, interviewers, interviewer} = props;
  console.log(interviewer, interviewers);

  const [studentName, setStudentName] = useState(name || '');
  const [error, setError] = useState("");
  const [formInterviewer, setInterviewer] = useState(interviewer || null);
  
  const handleCancel = function() {
    setStudentName('');
    setInterviewer(null);
    onCancel();
  }

  function validate() {
    if(studentName === ""){
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    onSave(studentName, formInterviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={studentName}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setStudentName(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={interviewers}
          value={formInterviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={handleCancel}>Cancel</Button>
          <Button confirm onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  );
}