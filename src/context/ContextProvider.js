import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import API from '../services/api';

class ContextProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      planets: [],
    };

    this.setPlanets = this.setPlanets.bind(this);
  }

  componentDidMount() {
    this.setPlanets();
  }

  async setPlanets() {
    const arrayPlanets = await API();
    this.setState({
      planets: arrayPlanets,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={ {
          ...this.state,
        } }
      >
        {children}
      </Context.Provider>
    );
  }
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
