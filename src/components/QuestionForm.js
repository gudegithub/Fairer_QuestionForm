import React, { Component } from 'react';
import { Button, Card, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { isEmpty, isInteger } from 'lodash';

import { subminQuestionData } from '../lib/submitQuestionData';

const FormInput = props => {
  const { label, name, helperText, handleChange, isValid = true, width = '40vw' } = props;
  return(
    <>
      <FormControl error={!isValid} style={{ marginBottom: '20px' }}>
        <InputLabel id={`${name}-inputLabel`} htmlFor={`${name}-input`}>
          {label}
        </InputLabel>
        <Input
          id={`${name}-input`}
          area-described={`${name}-helperText`}
          onChange={handleChange}
          style={{ width }}
        />
        <FormHelperText id={`${name}-helperText`}>
          {helperText}
        </FormHelperText>
      </FormControl>
      <br/>
    </>
  );
};

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      numberOfAnswer: null,
      isValidNumberOfChoices: true,
      remainingDays: null,
      isValidremainingDays: true,
      target: ''
    };
  }

  generateQuestionData() {
    const {
      content,
      numberOfChoices,
      remainingDays,
      target
    } = this.state;
    const now = new Date();
    const limitDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + remainingDays, 0 , 0, 0);
    const choices = new Array(numberOfChoices)
      .fill(1)
      .map((n, i) => n + i)
      .map(i => this.state[`choices${i}`]);
    return {
      choices,
      content,
      target,
      limitDate
    };
  }

  formInputChoices() {
    const { numberOfChoices = 0 } = this.state;
    const forms = new Array(numberOfChoices)
      .fill(1)
      .map((n, i) => n + i)
      .map(i => 
        <FormInput
          key={`choice-${i}`}
          label={`choice ${i}`}
          name={`choice-${i}`}
          handleChange={event => this.setState({ [`choice${i}`]: event.target.value })}
        />
      );
    return <>{forms}</>;
  }

  render() {
    return (
      <Card style={{
        width: '50vw',
        padding: '30px 0',
        marginTop: '40px',
        marginLeft: '50vw',
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}>
        <h2 style={{
          padding: '0 5vw',
          fontFamily: 'Roboto, Helvetica, Arial',
          fontWeight: 200
        }}>
          Fairer Question Registration
        </h2>
        <FormInput
          label='content'
          name='content'
          handleChange={event => this.setState({ content: event.target.value })}
        />
        <FormInput
          label='number of choices'
          name='numberOfChoices'
          helperText='must be integer from 1 to 9'
          isValid={this.state.isValidNumberOfChoices}
          handleChange={event => {
            const number = Number(event.target.value);
            if (isInteger(number) && number > 0 && number < 10) {
              this.setState({ numberOfChoices: number });
              this.setState({ isValidNumberOfChoices: true });
            } else {
              this.setState({ isValidNumberOfChoices: false });
            }
          }}
        />
        {this.formInputChoices()}
        <FormInput
          label='remaining days'
          name='remainingDays'
          helperText='from today'
          isValid={this.state.isValidremainingDays}
          handleChange={event => {
            const number = Number(event.target.value);
            if (isInteger(number) && number > 0 && number < 365) {
              this.setState({ remainingDays: number });
              this.setState({ isValidremainingDays: true });
            } else {
              this.setState({ isValidremainingDays: false });
            }
          }}
        />
        <FormInput
          label='target'
          name='target'
          handleChange={event => this.setState({ target: event.target.value })}
        />
        <Button
          color='primary'
          disabled={
            isEmpty(this.state.content) ||
            !this.state.remainingDays ||
            isEmpty(this.state.target)
          }
          onClick={() => subminQuestionData(this.generateQuestionData())} //wrap a function to ignore error
        >
          Submit
        </Button>
        <Button
          color='secondary'
          style={{marginLeft: '5vw'}}
        >
          Clear
        </Button>
      </Card>
    );
  }
}

export default QuestionForm;
