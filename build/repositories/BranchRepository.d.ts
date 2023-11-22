import { AddBranchReq, EditBranchReq } from '../controllers/branchController/BranchRequest.interface';
import { Branch } from '../database/entities/Branch';
export declare class BranchRepository {
    private userDatastore;
    private authentication;
    private branchDatastore;
    private emailTokenDatastore;
    private mail;
    constructor();
    addBranch(data: AddBranchReq, activeUserId: string): Promise<void>;
    branchList(activeUserId: string): Promise<Branch[]>;
    updateBranch(data: EditBranchReq, branchId: string, activeUserId: string): Promise<void>;
    deleteBranch(branchId: string, activeUserId: string): Promise<void>;
}
//# sourceMappingURL=BranchRepository.d.ts.map