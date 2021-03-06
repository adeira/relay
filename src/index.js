// @flow

// Our `@adeira/relay` additions:
export {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@adeira/fetch';
export { default as createEnvironment } from './createEnvironment';
export { default as createLocalEnvironment } from './createLocalEnvironment';
export { default as createNetworkFetcher } from './createNetworkFetcher';
export { default as getDataFromRequest } from './getDataFromRequest';
export { default as RelayDebugLogger } from './loggers/RelayDebugLogger';
export { default as RelayEagerLogger } from './loggers/RelayEagerLogger';
export { default as RelayLazyLogger } from './loggers/RelayLazyLogger';

// Relay Modern (wrapped):
export { commitMutation, commitMutationAsync } from './mutations';
export { default as createFragmentContainer } from './createFragmentContainer';
export { default as createPaginationContainer } from './createPaginationContainer';
export { default as createRefetchContainer } from './createRefetchContainer';
export { default as LocalQueryRenderer } from './LocalQueryRenderer';
export { default as QueryRenderer } from './QueryRenderer';
export { default as requestSubscription } from './requestSubscription';
export { default as useLazyLoadQuery } from './useLazyLoadQuery';
export type { RelayProp } from './createFragmentContainer';
export type { PaginationRelayProp } from './createPaginationContainer';
export type { RefetchRelayProp } from './createRefetchContainer';
export type {
  FragmentContainerType,
  PaginationContainerType,
  RefetchContainerType,
  Variables,
} from './types.flow';

// Relay Hooks (wrapped)
export { default as useMutation } from './useMutation';

// Relay Modern (re-exported):
export {
  graphql,
  readInlineData,
  commitLocalUpdate,
  ConnectionHandler,
  // eslint-disable-next-line camelcase
  fetchQuery_DEPRECATED as fetchQuery,
} from 'react-relay/legacy';
export type { Environment } from 'react-relay';
export type {
  CacheConfig,
  DeclarativeMutationConfig,
  Disposable,
  GraphQLTaggedNode,
  PayloadError,
  Snapshot,
  UploadableMap,
} from 'relay-runtime';
// eslint-disable-next-line import/no-unresolved
export type { RecordObjectMap as RecordMap } from 'relay-runtime/store/RelayStoreTypes';

// Relay Hooks (re-exported):
export {
  EntryPointContainer,
  loadEntryPoint,
  loadQuery,
  RelayEnvironmentProvider,
  useEntryPointLoader,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
  useRefetchableFragment,
  useRelayEnvironment,
  useSubscribeToInvalidationState,
  useSubscription,
} from 'react-relay';
