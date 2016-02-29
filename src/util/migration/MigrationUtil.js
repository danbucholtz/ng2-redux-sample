import {Injectable} from "angular2/core";

import {SchemaVersion} from "../../dao/schema-version/SchemaVersion";
import {SchemaVersionDao} from "../../dao/schema-version/SchemaVersionDao";
import {MigrationProvider} from "./MigrationProvider";

@Injectable()
export class MigrationUtil {
	constructor(schemaVersionDao:SchemaVersionDao, migrationProvider:MigrationProvider) {
		this.schemaVersionDao = schemaVersionDao;
		this.migrationProvider = migrationProvider;
		this.completed = false;
	}

	async getOrCreateVersion() {
		await this.schemaVersionDao.createTableIfDoesntExist();
		let versionList = await this.schemaVersionDao.getAll();
		if (versionList.length > 0 ) {
			return versionList[0];
		}
		let schemaVersion = new SchemaVersion();
		schemaVersion.version = 0;
		return await this.schemaVersionDao.save(schemaVersion);
	}

	async doMigrations() {
		try{
			let versionEntity = await this.getOrCreateVersion();
			// loop over the list of migrations
			var listOfMigrations = this.migrationProvider.getMigrations();
			for (let i = 0; i < listOfMigrations.length; i++) {
				let migrationToExecute = listOfMigrations[i];
				if (migrationToExecute.getVersion() > versionEntity.version) {
					// go ahead and do the migration
					await migrationToExecute.migrate();
					versionEntity.version++;
					await this.schemaVersionDao.save(versionEntity);
				}
			}
			this.completed = true;
		}
		catch(ex){
			alert(`An exception occurred during database migration - ${ex.message}`);
		}
	}

	isComplete(){
		return this.completed;
	}
}
