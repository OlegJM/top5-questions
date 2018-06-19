import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Badge } from 'reactstrap';

import { INCREMENT_RATING, DECREMENT_RATING } from '../../constants';

import './styles.css';

const Rating = (props) => {
  const handleClickWrapper = e => e.stopPropagation();
  const handleIncrement = () => props.onChange(INCREMENT_RATING);
  const handleDecrement = () => props.onChange(DECREMENT_RATING);

  return (
    <div role="presentation" className={ cn('rating', props.className) } onClick={ handleClickWrapper }>
      <Badge>{ props.rating }</Badge>
      <div className="rating__buttons">
        <button
          className="rating__button rating__button--up"
          title="Хороший вопрос!"
          onClick={ handleIncrement }
        />
        <button
          className="rating__button rating__button--down"
          title="Плохой вопрос :("
          onClick={ handleDecrement }
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
