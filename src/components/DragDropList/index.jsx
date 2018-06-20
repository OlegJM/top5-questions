import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DragDropItem from '../DragDropItem';

import { reorderQuestions, changeRating } from '../../actions';

import './styles.css';

class DragDropList extends Component {
  static propTypes = {
    questions: PropTypes.array,
    reorderQuestions: PropTypes.func.isRequired,
    changeRating: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      activeItemIndex: null
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleChangeItemPosition = this.handleChangeItemPosition.bind(this);
    this.handleChangeActiveItem = this.handleChangeActiveItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination || result.destination.index === result.source.index) return;

    this.props.reorderQuestions(result.source.index, result.destination.index);
  }

  handleChangeItemPosition(actionType, sourceIndex) {
    const destinationIndex = sourceIndex + actionType;

    this.props.reorderQuestions(sourceIndex, destinationIndex);
  }

  handleChangeActiveItem(index) {
    this.setState({ activeItemIndex: index });
  }

  renderItem(item, index) {
    const isFirstItem = index === 0;
    const isLastItem = index === this.props.questions.length - 1;

    return (
      <DragDropItem
        key={ item.question_id }
        item={ item }
        index={ index }
        activeItemIndex={ this.state.activeItemIndex }
        isFirstItem={ isFirstItem }
        isLastItem={ isLastItem }
        onChangeRating={ this.props.changeRating }
        onChangeItemPosition={ this.handleChangeItemPosition }
        onChangeActiveItem={ this.handleChangeActiveItem }
      />
    );
  }

  render() {
    return (
      <DragDropContext onDragEnd={ this.onDragEnd }>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <section
              ref={ provided.innerRef }
              className={ cn('dnd-list', { 'dnd-list--dragging': snapshot.isDraggingOver }) }
            >
              { this.props.questions.map(this.renderItem) }
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  reorderQuestions,
  changeRating
}, dispatch);

const mapStateToProps = ({ questions }) => ({
  questions: questions.items
});

export default connect(mapStateToProps, mapDispatchToProps)(DragDropList);
