import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import ListItem from '../ListItem';

const DragDropItem = (props) => {
  const { item, index, isFirstItem, isLastItem, onChangeRating, onChangeItemPosition } = props;
  return (
    <Draggable key={ item.question_id } draggableId={ item.question_id } index={ index }>
      {(provided, snapshot) => (
        <div
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          className={ cn('dnd-list__item', { 'dnd-list__item--drag': snapshot.isDragging }) }
        >
          <ListItem
            index={ index }
            item={ item }
            isFirstItem={ isFirstItem }
            isLastItem={ isLastItem }
            onChangeRating={ onChangeRating }
            onChangeItemPosition={ onChangeItemPosition }
          />
        </div>
      )}
    </Draggable>
  )
};

DragDropItem.propTypes = {
  item: PropTypes.any,
  index: PropTypes.number.isRequired,
  isFirstItem: PropTypes.bool.isRequired,
  isLastItem: PropTypes.bool.isRequired,
  onChangeRating: PropTypes.func.isRequired,
  onChangeItemPosition: PropTypes.func.isRequired
};

export default DragDropItem;
