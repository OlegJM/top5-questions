import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import Rating from '../Rating';
import SortArrows from '../SortArrows';

import { formatDate } from '../../utils';

import './styles.css';

export default class ListItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.shape({
      question_id: PropTypes.number,
      title: PropTypes.string,
      scope: PropTypes.number,
      is_answered: PropTypes.bool,
      view_count: PropTypes.number,
      creation_date: PropTypes.number,
      last_activity_date: PropTypes.number,
      owner: PropTypes.object
    }),
    index: PropTypes.number.isRequired,
    isFirstItem: PropTypes.bool.isRequired,
    isLastItem: PropTypes.bool.isRequired,
    onChangeRating: PropTypes.func.isRequired,
    onChangeItemPosition: PropTypes.func.isRequired,
    onClickItem: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.item = createRef();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.handleClickItemInfo = this.handleClickItemInfo.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleChangePosition = this.handleChangePosition.bind(this);
  }

  state = {
    itemOpen: false
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(e) {
    const currentItem = this.item.current;

    if (currentItem && !currentItem.contains(e.target)) {
      this.setState({
        itemOpen: false
      });
    }
  }

  handleClickItem() {
    this.setState({
      itemOpen: !this.state.itemOpen
    });
  }

  handleClickItemInfo(e) {
    e.stopPropagation();
    this.handleClickItem();
  }

  handleChangeRating(type) {
    this.props.onChangeRating(type, this.props.item.question_id);
  }

  handleChangePosition(actionType) {
    this.props.onChangeItemPosition(actionType, this.props.index );
  }

  renderItemInfo() {
    const {
      view_count: viewCount,
      creation_date: creationDate,
      last_activity_date: lastActivity,
      owner
    } = this.props.item;

    const creationDateFormatted = formatDate(creationDate);
    const lastActivityFormatted = formatDate(lastActivity);

    return (
      <CSSTransition
        in={ this.state.itemOpen }
        classNames="item-info-"
        timeout={ { enter: 300, exit: 200 } }
      >
        {() => (
          <div
            role="presentation"
            className={ cn('list-item__info item-info', this.props.className) }
            onClick={ this.handleClickItemInfo }
          >
            <div>
              Имя создателя вопроса: { owner.display_name }
            </div>
            <div>
              Рейтинг создателя вопроса: { owner.reputation }
            </div>
            <div>
              Количество просмотров: { viewCount }
            </div>
            <div>
              Дата создания вопроса: { creationDateFormatted }
            </div>
            <div>
              Последняя активность: { lastActivityFormatted }
            </div>
          </div>
        )}
      </CSSTransition>
    );
  }

  render() {
    const { item, isFirstItem, isLastItem } = this.props;

    return (
      <article
        className={ cn('list-item', this.props.className, { 'list-item--answered': item.is_answered }) }
        ref={ this.item }
      >
        <div
          className={ cn('list-item__header', { 'list-item__header--answered': item.is_answered }) }
          role="presentation"
          tabIndex="-1"
          onClick={ this.handleClickItem }
        >
          { item.title }
          <div className="list-item__controls">
            <Rating
              className="list-item__rating"
              rating={ item.score }
              onChange={ this.handleChangeRating }
            />
            <SortArrows
              onChange={ this.handleChangePosition }
              isFirstItem={ isFirstItem }
              isLastItem={ isLastItem }
            />
          </div>
        </div>
        { this.renderItemInfo() }
      </article>
    );
  }
}
