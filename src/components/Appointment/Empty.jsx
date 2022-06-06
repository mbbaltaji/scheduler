import React from 'react'


/**
 * 
 * @param {*} props 
 * @returns {Object} - JSX element rendered when an interview can be booked
 */
export default function Empty (props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}