import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import cn from 'classnames';

import { setCurrentDate, getQuestions, changeRating } from '../../actions';

import Header from '../Header';
import DragDropList from '../DragDropList';

import './app.css';

class App extends Component {
  static propTypes = {
    currentDate: PropTypes.any.isRequired,
    isFetching: PropTypes.bool.isRequired,
    questions: PropTypes.array,
    setCurrentDate: PropTypes.func.isRequired,
    getQuestions: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  componentDidMount() {
    this.props.getQuestions(this.props.currentDate);
  }

  handleChangeDate(date) {
    this.props.setCurrentDate(date);
    this.props.getQuestions(date);
  }

  render() {
    const { currentDate, isFetching, questions } = this.props;
    const questionsEmpty = questions.length === 0;

    return (
      <div className="wrapper">
        <Header className="app__header" date={ currentDate } onChangeDate={ this.handleChangeDate } />
        <main className={ cn('app__main', { 'app__main--loading': isFetching }) }>
          { isFetching && <i className="app__loader" /> }
          { !questionsEmpty && <DragDropList questions={ questions } /> }
          {
            !isFetching && questionsEmpty &&
              <Alert color="warning" className="app__main-alert">Нет вопросов за это время</Alert>
          }
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentDate,
  getQuestions,
  changeRating
}, dispatch);

const mapStateToProps = ({ date, questions }) => ({
  currentDate: date.currentDate,
  isFetching: questions.isFetching,
  questions: questions.items
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
