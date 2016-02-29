import {Injectable} from "angular2/core";

import {BaseDao} from "../BaseDao";
import {EntityManager} from "../EntityManager";

import {TodoConverter} from "./TodoConverter";

const table = "todos";

@Injectable()
export class TodoDao extends BaseDao {
	constructor(todoConverter:TodoConverter, entityManager:EntityManager) {
		super(table, todoConverter, entityManager);
	}

	getList(){
		return super.getByQuery("order by text");
	}

	insert(object){
		var query = `
			INSERT INTO ${table}
			(id, text, completed)
			VALUES (?, ?, ?)`;

		return this.entityManager.executeQuery(query, [object.id, object.text, object.completed]);
	}

	update(object){
		var query = `
			Update ${table}
			SET text=?, completed=?
			WHERE id=?`;

		return this.entityManager.executeQuery(query, [object.text, object.completed, object.id]);
	}

	createTableIfDoesntExist(){
		return this.entityManager.executeQuery(`CREATE TABLE IF NOT EXISTS ${table} (id text primary key not null, text text not null, completed integer not null)`);
	}
}
