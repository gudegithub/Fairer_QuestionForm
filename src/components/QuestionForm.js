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
      isValidNumberOfAnswer: true,
      answer: [],
      remainingDays: null,
      isValidremainingDays: true,
      target: ''
    };
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
          label='number of answer'
          name='numberOfAnswer'
          helperText='must be integer from 1 to 9'
          isValid={this.state.isValidNumberOfAnswer}
          handleChange={event => {
            const number = Number(event.target.value);
            if (isInteger(number) && number > 0 && number < 10) {
              this.setState({ numberOfAnswer: number });
              this.setState({ isValidNumberOfAnswer: true });
            } else {
              this.setState({ isValidNumberOfAnswer: false });
            }
          }}
        />
        {/* {() => {
          let answerForms = [];
          for (let i; i < this.state.numberOfAnswer; i++) {
            answerForms.push(
              <FormInput
                label={`answer  ${i}`}
                name={`answer_${i}`}
                handleChange={text => {
                  let newAnswer = new Array(this.state.numberOfAnswer).fill('');
                  for ()
                }}
              />
            );
          }
          return answerForms;
        }} */}
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
            isEmpty(this.state.answer) ||
            !this.state.remainingDays ||
            isEmpty(this.state.target)
          }
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
