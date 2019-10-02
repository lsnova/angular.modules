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
}
