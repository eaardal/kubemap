import K8s from 'k8s';
import Logger from '../infrastructure/logger';
import config from '../infrastructure/config';

const mapPod = p => ({
  app: p.metadata.labels.app,
  name: p.metadata.name,
  namespace: p.metadata.namespace,
  kind: p.kind,
  createdTimestamp: p.metadata.creationTimestamp,
  conditions: p.status.conditions.map(c => ({
    type: c.type,
    status: c.status,
  })),
  state: p.status.conditions.every(c => c.status === 'True') ? 'up' : 'down',
});

const mapPods = pods => pods.map(mapPod);

class K8sService {
  constructor() {
    this.kubectl = K8s.kubectl({
      endpoint: config.k8s.endpoint,
      version: config.k8s.version,
      auth: {
        username: config.k8s.username,
        password: config.k8s.password,
      },
    });
  }

  getAllPods() {
    return new Promise((resolve, reject) => {
      this.kubectl.pod.list((err, pods) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }

        const podList = mapPods(pods.items);
        resolve(podList);
      });
    });
  }

  getPodsWithAppNames(appNames) {
    return new Promise((resolve, reject) => {
      this.kubectl.pod.list((err, pods) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }

        const podsMatchingNames = pods.items.filter(i =>
          appNames.includes(i.metadata.labels.app)
        );
        const podList = mapPods(podsMatchingNames);
        resolve(podList);
      });
    });
  }

  getPodsWhereNameStartsWith(startPhrases) {
    return new Promise((resolve, reject) => {
      this.kubectl.pod.list((err, pods) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }

        console.log(pods.items.map(p => p.metadata.name));

        const podsMatchingNames = pods.items.filter(i =>
          startPhrases.some(p => i.metadata.name.startsWith(p))
        );

        const podList = mapPods(podsMatchingNames);
        resolve(podList);
      });
    });
  }
}

export default K8sService;
