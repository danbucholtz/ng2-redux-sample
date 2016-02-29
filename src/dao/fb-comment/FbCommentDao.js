import {Injectable} from "angular2/core";

import {BaseDao} from "../BaseDao";
import {EntityManager} from "../EntityManager";

import {FbCommentConverter} from "./FbCommentConverter";

const table = "fbcomments";

@Injectable()
export class FbCommentDao extends BaseDao {
	constructor(fbCommentConverter:FbCommentConverter, entityManager:EntityManager) {
		super(table, fbCommentConverter, entityManager);
	}

	insert(object){
		var query = `
			INSERT INTO ${table}
			(id, postId, userId, content)
			VALUES (?, ?, ?, ?)`;

		return this.entityManager.executeQuery(query, [object.id, object.postId, object.userId, object.content]);
	}

	update(object){
		var query = `
			Update ${table}
			SET postId=?, userId=?, content=?
			WHERE id=?`;

		return this.entityManager.executeQuery(query, [object.postId, object.userId, object.content, object.id]);
	}

	createTableIfDoesntExist(){
		return this.entityManager.executeQuery(`CREATE TABLE IF NOT EXISTS ${table} (id text primary key not null, postId text not null, userId text not null, content text not null)`);
	}
}
