import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Pager from './Pager';

class PagerProvider extends Component {
  static contextName = '__pager__'
  static Renderer = class extends Component {
    static childContextTypes = {
      [PagerProvider.contextName]:
        PropTypes.object.isRequired,
    }
    getChildContext() {
      return {
        [PagerProvider.contextName]: this.props
          .pager,
      }
    }
    render() {
      return this.props.children
    }
  }
  render() {
    const {
      children,
      ...remainingProps
    } = this.props
    return (
      <Pager
        {...remainingProps}
        render={pager => (
          <PagerProvider.Renderer
            pager={pager}
            children={children}
          />
        )}
      />
    )
  }
}

export default PagerProvider;
