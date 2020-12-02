/**
 * Code borrowed In class example
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DimensionsProvider from './DimensionsProvider.js';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import ResponsiveLayout from './ResponsiveLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DimensionsProvider>
        <ResponsiveLayout
          renderDesktop={() => (
            <DesktopView/>
          )}
          renderMobile={() => (
            <MobileView/>
          )}
        />
      </DimensionsProvider>
    </div>
  );
}

export default App;
