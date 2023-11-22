import { Branch } from '../entities/Branch';
export declare class BranchDatastore {
    constructor();
    getById(id: string): Promise<Branch | null>;
    save(branch: Branch): Promise<Branch | undefined>;
    getAllBranch(): Promise<Branch[]>;
    deleteBranch(branchId: string): Promise<void>;
}
//# sourceMappingURL=BranchDatastore.d.ts.map