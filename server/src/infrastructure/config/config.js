if (!process.env.K8S_USERNAME) {
  throw new Error('Environment variable K8S_USERNAME not set');
}

if (!process.env.K8S_PASSWORD) {
  throw new Error('Environment variable K8S_PASSWORD not set');
}

if (!process.env.K8S_ENDPOINT) {
  throw new Error('Environment variable K8S_ENDPOINT not set');
}

const port = process.env.PORT || 3001;

export default {
  port,
  k8s: {
    username: process.env.K8S_USERNAME,
    password: process.env.K8S_PASSWORD,
    endpoint: process.env.K8S_ENDPOINT,
    version: '/api/v1',
  },
  restApi: {
    baseUrl: `http://localhost:${port}`,
  },
};
