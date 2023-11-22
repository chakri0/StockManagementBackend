/// <reference types="express-serve-static-core" />
import express from 'express';
export interface TypedRequestBody<T> extends Express.Request {
    body: T;
}
export interface CategoryReq {
    name: string;
}
declare class CategoryController {
    private categoryRepository;
    constructor();
    addCategory: express.RequestHandler;
    categoryList: express.RequestHandler;
    deleteCategory: express.RequestHandler;
    updateCategory: express.RequestHandler;
}
export default CategoryController;
//# sourceMappingURL=CategoryController.d.ts.map