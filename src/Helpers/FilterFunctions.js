import { useContext } from 'react';
import AppContext from '../ContextAPI_Configs/AppContext';

const [userFilter, setUserFilter,] = useContext(AppContext);

function ColumnFilterFunction(data) {

}

function ComparisonFilterFunction(data) {

}

function ValueFilterFunction(data) {

}

export {
  ColumnFilterFunction,
  ComparisonFilterFunction,
  ValueFilterFunction,
};
