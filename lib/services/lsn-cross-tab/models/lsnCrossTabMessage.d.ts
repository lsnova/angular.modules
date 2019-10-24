export declare class LsnCrossTabMessage<T extends object = any> {
    created?: number;
    code?: string;
    tabId?: string;
    attrs?: T;
    constructor({ created, code, tabId, attrs }?: LsnCrossTabMessage<T>);
    static compare(firstMessage: LsnCrossTabMessage, secondMessage: LsnCrossTabMessage): boolean;
}
