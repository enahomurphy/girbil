import PropTypes from 'prop-types';
import { useTween } from 'react-use';

const AnimationProvider = ({ easingFunction, duration, children }) => {
  const elapsed = useTween(easingFunction, duration);
  const value = 100 - (elapsed * 100);
  return children(value);
};


AnimationProvider.defaultProps = {
  duration: 3000,
  easingFunction: 'linear',
};

AnimationProvider.propTypes = {
  easingFunction: PropTypes.string,
  duration: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};

export default AnimationProvider;
