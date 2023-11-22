import { Categories } from '../database/entities/Categories';
export declare class CategoryRepository {
    private userDatastore;
    private authentication;
    private categoryDatastore;
    private mail;
    constructor();
    addCategory(name: string, activeUserId: string): Promise<void>;
    categoryList(activeUserId: string): Promise<Categories[]>;
    updateCategory(name: string, categoryId: string, activeUserId: string): Promise<void>;
    deleteCategory(categoryId: string, activeUserId: string): Promise<void>;
}
//# sourceMappingURL=CategoryRepository.d.ts.map