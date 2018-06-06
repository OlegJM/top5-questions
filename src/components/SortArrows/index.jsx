import React from 'react';
import PropTypes from 'prop-types';

import { MOVE_UP, MOVE_DOWN } from '../../constants';

import './styles.css';

const SortArrows = ({ onChange, isFirstItem, isLastItem }) => {
  const handleClickWrapper = (e) => { e.stopPropagation(); };
  const handleMoveUp = () => onChange(MOVE_UP);
  const handleMoveDown = () => onChange(MOVE_DOWN);

  return (
    <div role="presentation" className="sort-arrows" onClick={ handleClickWrapper }>
      {
        isFirstItem ||
          <button
            className="sort-arrows__arrow sort-arrows__arrow--up"
            onClick={ handleMoveUp }
          />
      }
      {
        isLastItem ||
          <button
            className="sort-arrows__arrow sort-arrows__arrow--down"
            onClick={ handleMoveDown }
          />
      }
    </div>
  );
};

SortArrows.propTypes = {
  onChange: PropTypes.func.isRequired,
  isFirstItem: PropTypes.bool.isRequired,
  isLastItem: PropTypes.bool.isRequired
};

export default SortArrows;
