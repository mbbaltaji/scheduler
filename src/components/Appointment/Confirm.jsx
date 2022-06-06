import React from 'react';
import Button from 'components/Button'


/**
 * @param {String} message - message to be displayed when use wants to cancel interview
 * @param {function} onCancel - when user cancels deletion of interview.
 * @param {function} onConfirm - when user clicks confirm after deleting an interview.
 * @returns {Object} Confirm component that is rendered when user wants to delete an interview
 */
export default function Confirm(props) {  
  const { onCancel, onConfirm, message} = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}