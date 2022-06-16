import React from 'react';

/**
 * 
 * @param {String} student - student name
 * @param {Object} interviewer 
 * @param {Function} onEdit - handles edit event of an interview
 * @param {Function} onDelete - handles deletion of an interview
 * @returns {Object} - Show component - rendered after user books an interview
 */
export default function Show (props) {
  const {student, interviewer, onEdit, onDelete} = props;
  return (
    <main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
    <h2 className="text--regular">{student}</h2>
    <section className="interviewer">
      <h4 className="text--light">Interviewer</h4>
      <h3 className="text--regular">{interviewer && interviewer.name}</h3>
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        onClick={onEdit}
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
      />
      <img
        onClick={onDelete}
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
      />
    </section>
  </section>
</main>
  )
}