import K8sService from '../../services/K8sService';

const NODE_HEIGHT = 80;
const NODE_WIDTH = 250;

const findPod = (appName, pods) => pods.find(p => p.app === appName);

const substitutePlaceholderIfNotExists = (pod, options) =>
  typeof pod === 'undefined' || pod === null
    ? {
        app: options && options.app ? options.app : null,
        name: options && options.name ? options.name : null,
        namespace: options && options.namespace ? options.namespace : null,
        kind: 'Pod',
        createdTimestamp:
          options && options.createdTimestamp ? options.createdTimestamp : null,
        conditions: options && options.conditions ? options.conditions : [],
        state: options && options.state ? options.state : 'unknown',
      }
    : pod;

const withLayout = (pod, layout) => Object.assign({}, pod, { layout });

const connectNodes = (nodeStart, nodeEnd) => {
  const startX = nodeStart.layout.x;
  const startY = nodeStart.layout.y;
  const endX = nodeEnd.layout.x;
  const endY = nodeEnd.layout.y;
  return {
    layout: {
      kind: 'connector',
      startX,
      startY,
      endX,
      endY,
    },
  };
};

export const getTransactionSystemPods = async () => {
  const k8s = new K8sService();
  const pods = await k8s.getPodsWhereNameStartsWith([
    'session-initiator',
    'transaction-engine',
    'milkyway',
    'transactions-sync',
    'sessions-sync',
  ]);

  const sessionInitiator = substitutePlaceholderIfNotExists(
    findPod('session-initiator', pods),
    { app: 'session-initiator', name: 'UNAVAILABLE' }
  );

  const transactionEngine = substitutePlaceholderIfNotExists(
    findPod('transaction-engine', pods),
    { app: 'transaction-engine', name: 'UNAVAILABLE' }
  );
  const milkyway = substitutePlaceholderIfNotExists(findPod('milkyway', pods));
  const transactionsSync = substitutePlaceholderIfNotExists(
    findPod('transactions-sync', pods),
    { app: 'transactions-sync', name: 'UNAVAILABLE' }
  );
  const sessionsSync = substitutePlaceholderIfNotExists(
    findPod('sessions-sync', pods),
    { app: 'sessions-sync', name: 'UNAVAILABLE' }
  );

  const sessionInitiatorNode = withLayout(sessionInitiator, {
    kind: 'pod',
    x: 300,
    y: 100,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const transactionEngineNode = withLayout(transactionEngine, {
    kind: 'pod',
    x: 650,
    y: 200,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const milkywayNode = withLayout(milkyway, {
    kind: 'pod',
    x: 700,
    y: 50,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const transactionsSyncNode = withLayout(transactionsSync, {
    kind: 'pod',
    x: 300,
    y: 450,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const sessionsSyncNode = withLayout(sessionsSync, {
    kind: 'pod',
    x: 300,
    y: 550,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const pubsubNode = {
    layout: {
      kind: 'pubsub',
      x: 500,
      y: 300,
      width: 100,
      height: 50,
    },
  };

  const deviceNode = {
    layout: {
      kind: 'device',
      x: 10,
      y: 300,
      width: 50,
      height: 50,
    },
  };

  const firebaseNode = {
    layout: {
      kind: 'db',
      x: 200,
      y: 300,
      width: 100,
      height: 50,
    },
  };

  const deviceToFirebaseConnector = connectNodes(deviceNode, firebaseNode);
  const firebaseToSessionInitiatorConnector = connectNodes(
    firebaseNode,
    sessionInitiatorNode
  );
  const sessionInitiatorToPubSubConnector = connectNodes(
    sessionInitiatorNode,
    pubsubNode
  );
  const pubSubToTransactionEngineConnector = connectNodes(
    pubsubNode,
    transactionEngineNode
  );
  const transactionEngineToMilkywayConnector = connectNodes(
    transactionEngineNode,
    milkywayNode
  );
  const pubSubToSessionsSyncConnector = connectNodes(
    pubsubNode,
    sessionsSyncNode
  );
  const pubSubToTransactionsSyncConnector = connectNodes(
    pubsubNode,
    transactionsSyncNode
  );
  const transactionsSyncToFirebaseConnector = connectNodes(
    transactionsSyncNode,
    firebaseNode
  );
  const sessionsSyncToFirebaseConnector = connectNodes(
    sessionsSyncNode,
    firebaseNode
  );

  return [
    firebaseNode,
    deviceNode,
    pubsubNode,
    sessionInitiatorNode,
    transactionEngineNode,
    milkywayNode,
    transactionsSyncNode,
    sessionsSyncNode,
    deviceToFirebaseConnector,
    firebaseToSessionInitiatorConnector,
    sessionInitiatorToPubSubConnector,
    pubSubToTransactionEngineConnector,
    transactionEngineToMilkywayConnector,
    pubSubToSessionsSyncConnector,
    pubSubToTransactionsSyncConnector,
    transactionsSyncToFirebaseConnector,
    sessionsSyncToFirebaseConnector,
  ];
};
