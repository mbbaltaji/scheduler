import React from 'react'

/**
 * @param {String} message - message to be displayed when there's an error saving or deleting appointments 
 * @returns {object} - JSX element rendered when user cannot delete appointment
 */
export default function Error (props) {
  const { message, onClose } = props
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={onClose}
      />
    </main>
  );
}