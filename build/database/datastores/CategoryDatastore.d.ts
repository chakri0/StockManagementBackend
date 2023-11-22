import { Categories } from '../entities/Categories';
export declare class CategoryDatastore {
    constructor();
    save(category: Categories): Promise<Categories | undefined>;
    getAllCategory(): Promise<Categories[]>;
    deleteBranch(categoryId: string): Promise<void>;
    getById(categoryId: string): Promise<Categories | null>;
}
//# sourceMappingURL=CategoryDatastore.d.ts.map