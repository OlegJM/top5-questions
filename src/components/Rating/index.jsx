import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Badge } from 'reactstrap';

import { INCREMENT_RATING, DECREMENT_RATING } from '../../constants';

import './styles.css';

const Rating = (props) => {
  const handleClickRating = (e) => { e.stopPropagation(); };
  const onIncrement = () => props.onChange(INCREMENT_RATING);
  const onDecrement = () => props.onChange(DECREMENT_RATING);

  return (
    <div role="presentation" className={ cn('rating', props.className) } onClick={ handleClickRating }>
      <Badge>{ props.rating }</Badge>
      <div className="rating__buttons">
        <button
          className="rating__button rating__button--up"
          title="Хороший вопрос!"
          onClick={ onIncrement }
        />
        <button
          className="rating__button rating__button--down"
          title="Плохой вопрос :("
          onClick={ onDecrement }
        />
      </div>
    </div>
  );
};

Rating.propTypes = {
  className: PropTypes.string,
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Rating;
