import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import _ from 'underscore';
import classNames from 'classnames';
import Slideshow from '../SlideShow';

/**
 * @module Common
 * @name Wizard
 *
 * @description
 * A component that controls a flow of a wizard, showing each step with a progression bar, and an option to skip steps
 *
 * @example
 * <Wizard startText='Start' finishText='Finish'>
 *  <WizardStep key={0}>Intro slide</WizardStep>
 *  <WizardStep key={1} onStepStart={() => console.log('Started one!!!')}><img src='http://i.cdn.turner.com/adultswim/big/video/shrinking-showdown/rickandmorty_ep310_001_Shrinking_In_Brazil.jpg'/></WizardStep>
 *  <WizardStep key={2} onStepFinish={() => console.log('Finished secondddd')}><img src='https://ibhuluimcom-a.akamaihd.net/ib.huluim.com/show/22881?region=US&size=952x536'/></WizardStep>
 *  <WizardStep key={3} onStepFinish={() => console.log('Finished third')}>Third</WizardStep>
 *  <WizardStep key={4}>Fourth</WizardStep>
 *  <WizardStep key={5}>Finish slide</WizardStep>
 * </Wizard>
 *
 * @param {Number} currentStep The currentStep slide index to show
 * @param {Boolean} [includeWrappingSteps=false] Should include the intro and finish slides in progresssion bar
 * @param {String} startText The text for next button on the introduction slide
 * @param {String} finishText The text for next button on the finishing slide
 * @param {Function} onStart Callback for finishing the the introduction slide
 * @param {Function} onFinish Callback for finishing the the last slide
 * @param {String} className 
 * @param {Boolean} isMobile
 */

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: props.currentStep,
    };

    // Bindings
    this.setCurrentStep = this.setCurrentStep.bind(this);
    this.onNextSlideClicked = this.onNextSlideClicked.bind(this);

    // Partials
    this.showNextSlide = () => this.setCurrentStep(this.state.currentStep + 1);
    this.showPreviousSlide = () => this.setCurrentStep(this.state.currentStep - 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentStep !== this.state.currentStep && nextProps.currentStep !== this.props.currentStep) {
      this.setState({ currentStep: nextProps.currentStep });
    }
  }

  /**
   * Is the current step the first one
   */
  isFirstStep() {
    return this.state.currentStep === 0;
  }

  /**
   * Is the current step the last one
   * @param {Number} totalSteps The total steps, calculated if not given
   */
  isLastStep() {
    return this.state.currentStep >= React.Children.count(this.props.children) - 1;
  }

  /**
   * Sets the new current step
   * @param {Number} slideIndex The wanted slide index
   */
  setCurrentStep(slideIndex) {
    this.setState({ currentStep: slideIndex });
  }

  /**
   *
   * @param {Boolean} isFirstStep Is this the first Step
   * @param {Boolean} isLastStep Is this the last Step
   */
  getNextButtonText(isFirstStep, isLastStep) {
    let result = "Next";

    if (isFirstStep && !this.props.includeWrappingSteps) {
      result = this.props.startText;
    } else if (isLastStep) {
      result = this.props.finishText;
    }

    return result;
  }

  /**
   * Handles next button clicked
   */
  onNextSlideClicked() {
    // If this the last step
    if (this.isLastStep()) {
      this.props.onFinish();
    } else {
      // if this the first step and we don't include the introduction in the progression
      if (this.isFirstStep() && !this.props.includeWrappingSteps) {
        this.props.onStart();
      }

      this.showNextSlide();
    }
  }

  renderNextButton() {
    let result;
    const nextButtonText = this.getNextButtonText(this.isFirstStep(), this.isLastStep());

    if (this.isFirstStep() || this.isLastStep()) {
      result =
        <button className='next_button' onClick={this.onNextSlideClicked}>
          {nextButtonText}
        </button>;
    } else {
      result = <a className='next_link' onClick={this.onNextSlideClicked}>{nextButtonText}</a>;
    }

    return result;
  }

  render() {
    const { children, includeWrappingSteps, className } = this.props;
    const { currentStep } = this.state;

    const isFirstStep = this.isFirstStep();
    const isLastStep = this.isLastStep();

    return (
      <div className={classNames('wizard_component', className, {
        first_step: isFirstStep,
        last_step: isLastStep,
        hide_wrapping_progress: !includeWrappingSteps,
      })}>
        <Slideshow className='wizard_slideshow' current={currentStep}>{children}</Slideshow>
        <div className='wizard_footer'>
          <a className='back_link' onClick={this.showPreviousSlide}>Back</a>
          {this.renderNextButton()}
        </div>
      </div>
    );
  }
}


Wizard.propTypes = {
  currentStep: PropTypes.number,
  includeWrappingSteps: PropTypes.bool,
  finishText: PropTypes.string,
  startText: PropTypes.string,
  onFinish: PropTypes.func,
  onStart: PropTypes.func,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
};

Wizard.defaultProps = {
  currentStep: 0,
  includeWrappingSteps: false,
  onFinish: _.noop,
  onStart: _.noop,
};