import { useContext } from 'react';
import AppContext from '../../context';

const useHookState = () => {
  const state = useContext(AppContext);
  return state;
};

export default useHookState;
