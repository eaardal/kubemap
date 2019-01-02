import { Logging } from '@google-cloud/logging';
import config from '../infrastructure/config';

class StackdriverService {
  constructor() {
    this.logging = new Logging({
      projectId: config.gcloud.projectId,
      keyFilename: config.gcloud.credentials,
    });
  }

  async getPubSubSubscriptionLogs(subscriptionName) {
    try {
      const log = this.logging.log(
        'projects/xbanken/logs/cloudaudit.googleapis.com%2Factivity'
      );
      const sinks = await log.getEntries();
      console.log('sinks', sinks);
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default StackdriverService;
