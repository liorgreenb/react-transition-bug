import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

/**
 * @module Common
 * @name WizardStep
 * 
 * @description
 * WizardStep
 * 
 * @example
 *  <WizardStep id={1} onStepStart='Started one!!!'>First steppp</WizardStep>
 *
 * @param {Function} onStepStart Event for when the slide has come into view
 * @param {Function} onStepStart Event for when the slide has exited view
 */
export default class WizardStep extends React.Component {
  render() {
    return (
      <div className='wizard_step_component'>
        {this.props.children}
      </div>
    );
  }
}

WizardStep.propTypes = {
  onStepStart: PropTypes.func,
  onStepFinish: PropTypes.func,
};

WizardStep.defaultProps = {
  onStepStart: _.noop,
  onStepFinish: _.noop,
};