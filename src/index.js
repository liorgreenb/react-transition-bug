import React from 'react';
import { render } from 'react-dom';
import Wizard from './Wizard';
import WizardStep from './Wizard/WizardStep';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <Wizard startText='Start' finishText='Finish'>
      <WizardStep key={0}>Intro slide</WizardStep>
      <WizardStep key={1}><img src='http://i.cdn.turner.com/adultswim/big/video/shrinking-showdown/rickandmorty_ep310_001_Shrinking_In_Brazil.jpg' /></WizardStep>
      <WizardStep key={2}><img src='https://ibhuluimcom-a.akamaihd.net/ib.huluim.com/show/22881?region=US&size=952x536' /></WizardStep>
      <WizardStep key={3}>Third</WizardStep>
      <WizardStep key={4}>Fourth</WizardStep>
      <WizardStep key={5}>Finish slide</WizardStep>
    </Wizard>
  </div>
);

render(<App />, document.getElementById('root'));
