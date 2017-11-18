import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.css';
import classNames from 'classnames';

// This should match the duration of animation in the scss file
const SLIDE_DURATION = 500;

const SLIDE_LEFT_CLASS = 'slide-left';
const SLIDE_RIGHT_CLASS = 'slide-right';

/**
 * @module Common/Animations
 * @name Slideshow
 * @description
 * Shows a slideshow animation controled by the currentSlide given
 *
 * @example
 * <Slideshow>
 *  <img key={0} src='https://ibhuluimcom-a.akamaihd.net/ib.huluim.com/show/22881?region=US&size=952x536'/>
 *  <img key={1} src='https://yt3.ggpht.com/-ULHvjIR9_iI/AAAAAAAAAAI/AAAAAAAAAAA/2vHPfVecHh4/s88-c-k-no-mo-rj-c0xffffff/photo.jpg'/>
 *  <img key={2} src='http://i.cdn.turner.com/adultswim/big/video/shrinking-showdown/rickandmorty_ep310_001_Shrinking_In_Brazil.jpg'/>
 * </Slideshow>
 *
 * @param {Number} current the current slide index to show
 * @param {String} className
 */
export default class Slideshow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastSlide: props.current,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({ lastSlide: this.props.current });
    }
  }

  /**
   * Get the direction animation class to use
   * @returns {string}
   */
  getDirectionSlideClass() {
    return this.props.current >= this.state.lastSlide ? SLIDE_LEFT_CLASS : SLIDE_RIGHT_CLASS;
  }

  render() {
    const { current, children, className } = this.props;
    const directionSlideClass = this.getDirectionSlideClass();
    const childrenArray = React.Children.toArray(children);

    return (
      <TransitionGroup className={classNames('slide_container', className)}
        childFactory={child => React.cloneElement(child, { classNames: directionSlideClass })}>
        <CSSTransition key={current} timeout={SLIDE_DURATION} classNames={directionSlideClass}>
          <div className='slide_item'>{childrenArray[current]}</div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

Slideshow.propTypes = {
  current: PropTypes.number,
  className: PropTypes.string,
};

Slideshow.defaultProps = {
  current: 0,
};