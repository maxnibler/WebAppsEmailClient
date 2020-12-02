/*
 * borrowed from the RWD example from class
 */
import {useDimensions} from './DimensionsProvider';

const ResponsiveLayout = ({
  breakPoint = 414,
  renderMobile,
  renderDesktop,
}) => {
  const {width} = useDimensions();
  return width > breakPoint ? renderDesktop() : renderMobile();
};

export default ResponsiveLayout;

