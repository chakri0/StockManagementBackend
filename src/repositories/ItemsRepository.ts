import { v4 as uuidv4 } from 'uuid';
import { UserDatastore } from '../database/datastores/UserDatastore';
import { Mail } from '../database/instanses/mail/Mail';
import { NotFoundException } from '../common/exception/NotFoundException';
import { ItemsReq } from '../controllers/itemsController/itemsController';
import { Items } from '../database/entities/Items';
import { CategoryDatastore } from '../database/datastores/CategoryDatastore';
import { ItemsDatastore } from '../database/datastores/ItemsDatastore';

export class ItemsRepository {
	private userDatastore: UserDatastore;
	private categoryDatastore: CategoryDatastore;
	private itemDatastore: ItemsDatastore;
	private mail: Mail;
	constructor() {
		this.userDatastore = new UserDatastore();
		this.categoryDatastore = new CategoryDatastore();
		this.itemDatastore = new ItemsDatastore();
		this.mail = new Mail();
	}

	public async addItem(data: ItemsReq, activeUserId: string) {
		const {
			categoryId,
			name,
			description,
			image,
			dailyThreshold,
			weeklyThreshold,
			overallThreshold,
		} = data;

		const existUser = await this.userDatastore.getById(activeUserId);
		if (!existUser) {
			throw new NotFoundException(`User not found`);
		}

		const category = await this.categoryDatastore.getById(categoryId);
		if (!category) {
			throw new NotFoundException(`Category not found`);
		}
		const item = new Items();
		item.id = uuidv4();
		(item.name = name),
			(item.description = description ?? null),
			(item.image = image ?? null),
			(item.dailyThreshold = dailyThreshold ?? null),
			(item.weeklyThreshold = weeklyThreshold ?? null),
			(item.overallThreshold = overallThreshold ?? null);
		item.category = category;
		await this.itemDatastore.save(item);
	}

	public async itemList(activeUserId: string): Promise<Items[]> {
		const existUser = await this.userDatastore.getById(activeUserId);
		if (!existUser) {
			throw new NotFoundException(`User not found`);
		}

		const items = await this.itemDatastore.getAllItems();
		return items;
	}
}
