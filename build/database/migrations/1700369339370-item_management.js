"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemManagement1700369339370 = void 0;
class ItemManagement1700369339370 {
    constructor() {
        this.name = 'ItemManagement1700369339370';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`Categories\` (\`id\` varchar(64) NOT NULL, \`name\` varchar(64) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`Items\` (\`id\` varchar(64) NOT NULL, \`name\` varchar(64) NOT NULL, \`description\` varchar(256) NULL, \`image\` text NULL, \`dailyThreshold\` bigint NULL, \`weeklyThreshold\` bigint NULL, \`overallThreshold\` bigint NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` varchar(64) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`InventoryItems\` (\`id\` varchar(64) NOT NULL, \`quantity\` bigint NOT NULL, \`availableQuantity\` bigint NOT NULL, \`status\` enum ('InStock', 'consumed') NOT NULL, \`expireDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`addedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addedBy\` varchar(64) NULL, \`itemId\` varchar(64) NULL, UNIQUE INDEX \`REL_7f3ac6a029ff2a5a4b790af9fc\` (\`itemId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`Items\` ADD CONSTRAINT \`FK_030ccb84c762ca5597340d19f14\` FOREIGN KEY (\`categoryId\`) REFERENCES \`Categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE \`InventoryItems\` ADD CONSTRAINT \`FK_cc2c80713359b84716eb440dd35\` FOREIGN KEY (\`addedBy\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE \`InventoryItems\` ADD CONSTRAINT \`FK_7f3ac6a029ff2a5a4b790af9fcc\` FOREIGN KEY (\`itemId\`) REFERENCES \`Items\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`InventoryItems\` DROP FOREIGN KEY \`FK_7f3ac6a029ff2a5a4b790af9fcc\``);
            yield queryRunner.query(`ALTER TABLE \`InventoryItems\` DROP FOREIGN KEY \`FK_cc2c80713359b84716eb440dd35\``);
            yield queryRunner.query(`ALTER TABLE \`Items\` DROP FOREIGN KEY \`FK_030ccb84c762ca5597340d19f14\``);
            yield queryRunner.query(`DROP INDEX \`REL_7f3ac6a029ff2a5a4b790af9fc\` ON \`InventoryItems\``);
            yield queryRunner.query(`DROP TABLE \`InventoryItems\``);
            yield queryRunner.query(`DROP INDEX \`REL_030ccb84c762ca5597340d19f1\` ON \`Items\``);
            yield queryRunner.query(`DROP TABLE \`Items\``);
            yield queryRunner.query(`DROP TABLE \`Categories\``);
        });
    }
}
exports.ItemManagement1700369339370 = ItemManagement1700369339370;
//# sourceMappingURL=1700369339370-item_management.js.map