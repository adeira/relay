// @flow

/* eslint-disable no-console */

import { isBrowser } from '@adeira/js';
import type {
  LogEvent,
  OperationAvailability,
  RelayFieldLogger as RelayFieldLoggerType,
} from 'relay-runtime';

const vocabulary: { +[string]: { +title: string, +help: string } } = {
  'missing_field.log': {
    title: 'missing required field',
    help:
      'Directive @required(action: LOG) was used somewhere in the code to mark one of the fields ' +
      "required. Unfortunately, server didn't return this field resulting in this message.",
  },
};

function renderQueryAvailability(
  queryAvailability: OperationAvailability,
  shouldFetch: boolean,
): string {
  if (queryAvailability.status === 'available') {
    const fetchTime = queryAvailability.fetchTime;
    if (fetchTime != null) {
      const seconds = Math.round((Date.now() - fetchTime) / 1000);
      return `🟢 ${seconds}s old${shouldFetch ? ', re-fetching' : ''}`;
    }
    return `🟢 ${shouldFetch ? 're-fetching' : ''}`;
  } else if (queryAvailability.status === 'stale') {
    return `🟠 ${shouldFetch ? 're-fetching' : ''}`;
  } else if (queryAvailability.status === 'missing') {
    return `🔴 ${shouldFetch ? 'fetching' : ''}`;
  }
  (queryAvailability.status: empty);
  return '';
}

function shouldLog(): boolean {
  return __DEV__ && isBrowser();
}

export function RelayLogger(logEvent: LogEvent): void {
  if (!shouldLog()) {
    return;
  }

  if (
    logEvent.name === 'queryresource.retain' ||
    logEvent.name === 'network.start' || // see `execute.start`
    logEvent.name === 'network.next' || // see `execute.next`
    logEvent.name === 'network.error' || // see `execute.error`
    logEvent.name === 'network.complete' // see `execute.complete`
  ) {
    // We skip some events that are not that useful for normal development.
  } else if (logEvent.name === 'execute.start') {
    // Prints information about the beginning of mutation/query/subscription (operation) execution.
    // Example: [Relay] execute.start HomepageQuery
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed('%s%s%s', '[Relay] ', `${name} `, logEventParams.params.name);
    console.log(logEventParams);
    console.groupEnd();
  } else if (logEvent.name === 'queryresource.fetch') {
    // Prints additional information about the presence/staleness of data and whether it's going to
    // be (re)fetched or not. See:
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/availability-of-data/
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/presence-of-data/
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/staleness-of-data/
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed(
      '%s%s%s',
      '[Relay] ',
      `${name} `,
      renderQueryAvailability(logEventParams.queryAvailability, logEventParams.shouldFetch),
    );
    console.log(logEventParams);
    console.groupEnd();
  } else {
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed('%s%s', '[Relay] ', name);
    console.log(logEventParams);
    console.groupEnd();
  }
}

/**
 * Called by Relay when it encounters a missing field that has been annotated with
 * `@required(action: LOG)`.
 */
export const RelayFieldLogger: RelayFieldLoggerType = function (logEvent) {
  if (!shouldLog()) {
    return;
  }

  const eventTitle = vocabulary[logEvent.kind].title ?? logEvent.kind;

  console.groupCollapsed(
    '%s%c%s%c%s',
    '[Relay ',
    'color:orange',
    '!',
    'color:unset',
    '] ',
    eventTitle,
  );
  console.log(logEvent);
  if (vocabulary[logEvent.kind].help) {
    console.log(vocabulary[logEvent.kind].help);
  }
  console.groupEnd();
};
