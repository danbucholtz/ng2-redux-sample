import {Injectable} from "angular2/core";
import {BaseMigration} from "./BaseMigration";

import {FbCommentDao} from "../../../dao/fb-comment/FbCommentDao";
import {FbLikeDao} from "../../../dao/fb-like/FbLikeDao";
import {FbPostDao} from "../../../dao/fb-post/FbPostDao";
import {FbUserDao} from "../../../dao/fb-user/FbUserDao";
import {TodoDao} from "../../../dao/todo/TodoDao";

Injectable()
export class MigrationOne extends BaseMigration {
	constructor(fbCommentDao:FbCommentDao, fbLikeDao:FbLikeDao, fbPostDao:FbPostDao, fbUserDao:FbUserDao, todoDao:TodoDao) {
		super();
		this.fbCommentDao = fbCommentDao;
        this.fbLikeDao = fbLikeDao;
        this.fbPostDao = fbPostDao;
        this.fbUserDao = fbUserDao;
        this.todoDao = todoDao;
	}

	getVersion() {
		return 1;
	}

	async migrate() {
		/* Build all of the database tables */
        console.log("Creating databases ...");
        await this.fbCommentDao.createTableIfDoesntExist();
        await this.fbLikeDao.createTableIfDoesntExist();
        await this.fbPostDao.createTableIfDoesntExist();
        await this.fbUserDao.createTableIfDoesntExist();
        await this.todoDao.createTableIfDoesntExist();
        console.log("Creating databases ... DONE");
	}
}
