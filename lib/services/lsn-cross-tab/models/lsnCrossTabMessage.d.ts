export declare class LsnCrossTabMessage {
    created?: number;
    code?: string;
    tabId?: string;
    attrs?: object;
    constructor({ created, code, tabId, attrs }?: {
        created?: any;
        code?: any;
        tabId?: any;
        attrs?: any;
    });
    static compare(firstMessage: LsnCrossTabMessage, secondMessage: LsnCrossTabMessage): boolean;
}
