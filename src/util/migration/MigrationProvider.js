import {Injectable} from "angular2/core";

import {MigrationOne} from "./impl/MigrationOne";
import {MigrationTwo} from "./impl/MigrationTwo";

Injectable()
export class MigrationProvider {
	constructor(migrationOne:MigrationOne, migrationTwo:MigrationTwo) {
		this.migrations = [];
		this.migrations.push(migrationOne);
		this.migrations.push(migrationTwo);
	}

	getMigrations() {
		return this.migrations;
	}
}
