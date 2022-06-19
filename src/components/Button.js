import React from "react";
import classNames from 'classnames';

import "components/Button.scss";

/**
 * 
 * @param {*} props - Object containing properties of a button
 * @returns different types of button
 */
export default function Button(props) {
   const {
      onClick, 
      disabled, 
      confirm, 
      danger, 
      children
   } = props;

   const buttonClass = classNames('button', {
      'button--confirm': confirm,
      'button--danger': danger
   });

   return (
   <button 
      onClick={onClick} 
      disabled={disabled} 
      className={buttonClass}
   >
      {children}
   </button>
   );
}
