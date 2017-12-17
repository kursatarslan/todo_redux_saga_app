import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button'
import Icon from '../icon';
import classNames from 'classnames';

import './task-form.css';


export class TaskForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super(...arguments);
    this.state = {title: '', description: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearInput() {
    this.setState({title: '', description: ''});
  }

  handleChange(event) {
    this.setState({title: event.target.value});
  }

  handleChangeDescription(event) {
    this.setState({description: event.target.value});
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    const description = this.state.description;
    if (title.length) this.props.handleSubmit(title, description);
    this.clearInput();
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.handleSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="task-form__input"
          maxLength="64"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="Enter Task Title"
          type="text"
          value={this.state.title}
        />
        <input
           autoComplete="off"
           autoFocus
           className="task-form__input"
           onChange={this.handleChangeDescription}
           onKeyUp={this.handleKeyUp}
           placeholder="Enter Task Description"
           type="text"
           value={this.state.description}
        />
        <Button type="submit" onClick={this.handleSubmit} className={classNames('btn','task-item__enter')}>
            <Icon name="check_circle" />
        </Button>
      </form>
    );
  }
}


export default TaskForm;
