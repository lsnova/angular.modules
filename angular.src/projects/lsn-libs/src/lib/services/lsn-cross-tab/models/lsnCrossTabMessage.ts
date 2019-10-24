export class LsnCrossTabMessage<T extends object = any> {
  created?: number;
  code?: string;
  tabId?: string;
  attrs?: T;

  constructor({created = null, code = null, tabId = null, attrs = null}: LsnCrossTabMessage<T> = {}) {
    this.created = created;
    this.code = code;
    this.tabId = tabId;
    this.attrs = attrs;
  }

  static compare(firstMessage: LsnCrossTabMessage, secondMessage: LsnCrossTabMessage) {
    if (!firstMessage || !secondMessage) {
      return false;
    }
    if (firstMessage.created !== secondMessage.created) {
      return false;
    }
    if (firstMessage.code !== secondMessage.code) {
      return false;
    }
    return firstMessage.tabId !== secondMessage.tabId;
  }
}
