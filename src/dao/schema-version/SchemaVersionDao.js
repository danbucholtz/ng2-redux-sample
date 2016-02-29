import {Injectable} from "angular2/core";

import {BaseDao} from "../BaseDao";

import {SchemaVersionConverter} from "./SchemaVersionConverter";
import {EntityManager} from "../EntityManager";

const table = "schemaVersions";

Injectable()
export class SchemaVersionDao extends BaseDao {
	/*@ngInject*/
	constructor(schemaVersionConverter:SchemaVersionConverter, entityManager:EntityManager) {
		super(table, schemaVersionConverter, entityManager);
	}

	insert(object){
		var query = `INSERT INTO ${table} (id, version) VALUES (?, ?)`;
		return this.entityManager.executeQuery(query, [object.id, object.version]);
	}

	update(object){
		var query = `
			Update ${table}
			SET version=?
			WHERE id=?`;

		return this.entityManager.executeQuery(query, [object.version, object.id]);
	}

	createTableIfDoesntExist(){
		return this.entityManager.executeQuery(`CREATE TABLE IF NOT EXISTS ${table} (id text primary key not null, version integer not null)`);
	}
}
