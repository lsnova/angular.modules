export class LsnCrossTabMessage {
  created?: number;
  code?: string;
  tabId?: string;
  attrs?: object;

  constructor({created = null, code = null, tabId = null, attrs = null} = {}) {
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
