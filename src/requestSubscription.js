// @flow

import type { Variables, Disposable, GraphQLTaggedNode } from '@adeira/relay-runtime';
import { requestSubscription as _requestSubscription } from 'react-relay';

import type { DeclarativeMutationConfig } from './types.flow';
import type { Environment, RecordSourceSelectorProxy } from './runtimeTypes.flow';

opaque type SelectorData = $FlowFixMe;

type SubscriptionPayload = { +[key: string]: any, ... };

type Config<T: SubscriptionPayload> = {|
  +subscription: GraphQLTaggedNode,
  +variables: Variables,
  +onCompleted?: ?() => void,
  +onError?: ?(error: Error) => void,
  +onNext?: ?(response: ?T) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
|};

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the subscription is performed in the correct environment.
 */
export default function requestSubscription<T: SubscriptionPayload>(
  environment: Environment,
  config: Config<T>,
): Disposable {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return _requestSubscription(environment, config);
}
