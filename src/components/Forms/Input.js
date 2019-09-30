import React from 'react';

import styles from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(styles.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
