import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  return (
    <MyContext.Provider>
      { children }
    </MyContext.Provider>
  );
}
export default MyProvider;

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
