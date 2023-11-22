/// <reference types="express-serve-static-core" />
import express from 'express';
export interface TypedRequestBody<T> extends Express.Request {
    body: T;
}
export interface ItemsReq {
    categoryId: string;
    name: string;
    description?: string;
    image?: string;
    dailyThreshold?: number;
    weeklyThreshold?: number;
    overallThreshold?: number;
}
declare class ItemsController {
    private itemRepository;
    constructor();
    addItems: express.RequestHandler;
    itemList: express.RequestHandler;
    deleteItem: express.RequestHandler;
    updateItem: express.RequestHandler;
}
export default ItemsController;
//# sourceMappingURL=itemsController.d.ts.map