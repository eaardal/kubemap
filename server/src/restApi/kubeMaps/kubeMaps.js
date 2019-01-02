import K8sService from '../../services/K8sService';
import NodeConnectorUtil, {
  NodeConnectionPoint,
} from '../../utils/NodeConnectorUtil';

const NODE_HEIGHT = 80;
const NODE_WIDTH = 250;

const findPods = (appName, pods) => pods.filter(p => p.app === appName);

const substitutePlaceholderIfNotExists = (pods, placeholder) =>
  typeof pods === 'undefined' || pods === null || (pods && pods.length === 0)
    ? [
        {
          app: placeholder && placeholder.app ? placeholder.app : null,
          name: placeholder && placeholder.name ? placeholder.name : null,
          namespace:
            placeholder && placeholder.namespace ? placeholder.namespace : null,
          kind: 'Pod',
          createdTimestamp:
            placeholder && placeholder.createdTimestamp
              ? placeholder.createdTimestamp
              : null,
          conditions:
            placeholder && placeholder.conditions ? placeholder.conditions : [],
          state:
            placeholder && placeholder.state ? placeholder.state : 'unknown',
          containerStatuses:
            placeholder && placeholder.containerStatuses
              ? placeholder.containerStatuses
              : [],
        },
      ]
    : pods;

const withLayout = (deployment, layout) =>
  Object.assign({}, deployment, { layout });

const getDeploymentStateFromPods = pods =>
  pods.reduce((curr, val) => {
    if (curr === 'down' || curr === 'unknown') {
      return curr;
    }
    switch (val.state) {
      case 'up':
        curr = 'up'; // eslint-disable-line no-param-reassign
        break;
      case 'down':
        curr = 'down'; // eslint-disable-line no-param-reassign
        break;
      case 'unknown':
        curr = 'unknown'; // eslint-disable-line no-param-reassign
        break;
      default:
        break;
    }
    return curr;
  }, 'up');

const createDeploymentAroundPods = (pods, deployment) => ({
  name: deployment.name,
  pods,
  state: getDeploymentStateFromPods(pods),
});

export const getTransactionSystemPods = async () => {
  const k8s = new K8sService();
  const pods = await k8s.getPodsWhereNameStartsWith([
    'session-initiator',
    'transaction-engine',
    'milkyway',
    'transaction-sync',
    'sessions-sync',
  ]);

  const sessionInitiatorPods = substitutePlaceholderIfNotExists(
    findPods('session-initiator', pods),
    { app: 'session-initiator', name: 'UNAVAILABLE' }
  );

  const transactionEnginePods = substitutePlaceholderIfNotExists(
    findPods('transaction-engine', pods),
    { app: 'transaction-engine', name: 'UNAVAILABLE' }
  );
  const milkywayPods = substitutePlaceholderIfNotExists(
    findPods('milkyway', pods)
  );
  const transactionsSyncPods = substitutePlaceholderIfNotExists(
    findPods('transaction-sync', pods),
    { app: 'transaction-sync', name: 'UNAVAILABLE' }
  );
  const sessionsSyncPods = substitutePlaceholderIfNotExists(
    findPods('sessions-sync', pods),
    { app: 'sessions-sync', name: 'UNAVAILABLE' }
  );

  const sessionInitiatorDeployment = createDeploymentAroundPods(
    sessionInitiatorPods,
    { name: 'session-initiator' }
  );
  const transactionEngineDeployment = createDeploymentAroundPods(
    transactionEnginePods,
    { name: 'transaction-engine' }
  );
  const milkywayDeployment = createDeploymentAroundPods(milkywayPods, {
    name: 'milkyway',
  });
  const transactionsSyncDeployment = createDeploymentAroundPods(
    transactionsSyncPods,
    { name: 'transaction-sync' }
  );
  const sessionsSyncDeployment = createDeploymentAroundPods(sessionsSyncPods, {
    name: 'sessions-sync',
  });

  const sessionInitiatorNode = withLayout(sessionInitiatorDeployment, {
    kind: 'pod',
    x: 300,
    y: 100,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const transactionEngineNode = withLayout(transactionEngineDeployment, {
    kind: 'pod',
    x: 650,
    y: 200,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const milkywayNode = withLayout(milkywayDeployment, {
    kind: 'pod',
    x: 700,
    y: 50,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const transactionsSyncNode = withLayout(transactionsSyncDeployment, {
    kind: 'pod',
    x: 300,
    y: 450,
    height: NODE_HEIGHT,
    width: NODE_WIDTH,
  });

  const sessionsSyncNode = withLayout(sessionsSyncDeployment, {
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

  const deviceToFirebaseConnector = NodeConnectorUtil.connectNodesAt(
    deviceNode,
    firebaseNode,
    NodeConnectionPoint.centerRight,
    NodeConnectionPoint.centerLeft
  );

  const firebaseToSessionInitiatorConnector = NodeConnectorUtil.connectNodesAt(
    firebaseNode,
    sessionInitiatorNode,
    NodeConnectionPoint.centerTop,
    NodeConnectionPoint.centerLeft
  );

  const sessionInitiatorToPubSubConnector = NodeConnectorUtil.connectNodesAt(
    sessionInitiatorNode,
    pubsubNode,
    NodeConnectionPoint.bottomCenter,
    NodeConnectionPoint.centerTop
  );

  const pubSubToTransactionEngineConnector = NodeConnectorUtil.connectNodesAt(
    pubsubNode,
    transactionEngineNode,
    NodeConnectionPoint.centerTop,
    NodeConnectionPoint.centerLeft
  );

  const transactionEngineToMilkywayConnector = NodeConnectorUtil.connectNodesAt(
    transactionEngineNode,
    milkywayNode,
    NodeConnectionPoint.centerTop,
    NodeConnectionPoint.bottomCenter
  );

  const pubSubToSessionsSyncConnector = NodeConnectorUtil.connectNodesAt(
    pubsubNode,
    sessionsSyncNode,
    NodeConnectionPoint.bottomCenter,
    NodeConnectionPoint.centerTop
  );

  const pubSubToTransactionsSyncConnector = NodeConnectorUtil.connectNodesAt(
    pubsubNode,
    transactionsSyncNode,
    NodeConnectionPoint.bottomCenter,
    NodeConnectionPoint.centerTop
  );

  const transactionsSyncToFirebaseConnector = NodeConnectorUtil.connectNodesAt(
    transactionsSyncNode,
    firebaseNode,
    NodeConnectionPoint.centerLeft,
    NodeConnectionPoint.bottomCenter
  );

  const sessionsSyncToFirebaseConnector = NodeConnectorUtil.connectNodesAt(
    sessionsSyncNode,
    firebaseNode,
    NodeConnectionPoint.centerLeft,
    NodeConnectionPoint.bottomCenter
  );

  const loadTransactionsTopic = {
    name: 'sessionInitiatorPublishingTopics',
    topics: ['LOAD_TRANSACTIONS', 'LOAD_ACCOUNTS', 'LOAD_CARDS'],
    layout: {
      kind: 'topic',
      x: 380,
      y: 220,
      width: 200,
      height: 50,
    },
  };

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
    loadTransactionsTopic,
  ];
};
