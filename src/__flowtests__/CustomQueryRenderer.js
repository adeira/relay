/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import * as React from 'react';
import type { GraphQLTaggedNode } from '@adeira/relay-runtime';

import { QueryRenderer, graphql, createLocalEnvironment } from '../index';

function placeholder() {
  return null;
}

type Props = {|
  +query: GraphQLTaggedNode,
  +render: () => React.Node,
|};

function CustomQueryRenderer(props: Props) {
  const environment = createLocalEnvironment();
  return <QueryRenderer environment={environment} {...props} />;
}

module.exports = {
  minimalUsage(): React.Node {
    return (
      <CustomQueryRenderer
        query={graphql`
          query CustomQueryRenderer {
            ...AllLocations_data
          }
        `}
        render={placeholder}
      />
    );
  },
  invalidUsage(): React.Node {
    return (
      <CustomQueryRenderer
        // $FlowExpectedError: should be `GraphQLTaggedNode` instead
        query="invalid_query_type"
        render={placeholder}
      />
    );
  },
};
