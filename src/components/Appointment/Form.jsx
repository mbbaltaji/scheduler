import React, {useState} from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

export default function Form(props) {

  const {onSave, onCancel, interviewers} = props;

  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

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

    if (!interviewer) {
      alert('Please select an interviewer');
      return;
    }
    onSave(student,interviewer);
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
          value={interviewer}
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