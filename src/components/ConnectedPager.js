import React from 'react';

import PropTypes from 'prop-types'

import PagerProvider from './PagerProvider';

function ConnectedPager(props, context) {
  return props.render(
    context[PagerProvider.contextName],
  )
}

ConnectedPager.contextTypes = {
  [PagerProvider.contextName]:
    PropTypes.object.isRequired,
}

export default ConnectedPager;
