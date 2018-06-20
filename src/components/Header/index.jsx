import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Button, Input } from 'reactstrap';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const title = '5 самых популярных вопросов на StackOverflow, содержащих\n "react-redux" в наименовании, начиная с';

export default class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChangeDate: PropTypes.func.isRequired,
    date: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      currentDate: this.props.date
    };

    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleChangeDate(date) {
    this.setState({
      currentDate: date
    });
  }

  handleClickButton() {
    this.props.onChangeDate(this.state.currentDate);
  }

  render() {
    const { className } = this.props;
    const isNewDate = !moment(this.props.date).isSame(this.state.currentDate);

    return (
      <header className={ className }>
        <span className={ `${className}-text` }>
          { title }
        </span>

        <DatePicker
          className="datepicker"
          customInput={ <Input type="text" name="date" bsSize="sm" /> }
          selected={ this.state.currentDate }
          maxDate={ moment() }
          onChange={ this.handleChangeDate }
          locale="ru-ru"
          dateFormat="DD.MM.YYYY"
        />

        {
          isNewDate &&
            <Button color="success" size="sm" onClick={ this.handleClickButton }>
              Поиск
            </Button>
        }
      </header>
    );
  }
}
