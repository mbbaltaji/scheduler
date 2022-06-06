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

  const [student, setStudent] = useState(name || '');
  const [formInterviewer, setInterviewer] = useState(interviewer || null);

  const handleCancel = function() {
    setStudent('');
    setInterviewer(null);
    onCancel();
  }

  const handleSave = function() {
    if (!student) {
      alert('Please enter student name');
      return;
    }

    if (!formInterviewer) {
      alert('Please select an interviewer');
      return;
    }
    onSave(student,formInterviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={interviewers}
          value={formInterviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={handleCancel}>Cancel</Button>
          <Button confirm onClick={handleSave} >Save</Button>
        </section>
      </section>
    </main>
  );
}