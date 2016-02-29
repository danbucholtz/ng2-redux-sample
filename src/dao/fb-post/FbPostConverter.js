import {Injectable} from "angular2/core";

import {BaseConverter} from "../BaseConverter";
import {FbPost} from "./FbPost";

@Injectable()
export class FbPostConverter {
	constructor() {
	}

	convertModelToPersistableFormat(fbPost) {
		if (!fbPost instanceof FbPost) {
			throw new Error("Invalid Parameter Type - requires FbPost model");
		}
		var persistable = {};
		persistable.id = fbPost.get("id");
		persistable.userId = fbPost.get("userId");
		persistable.content = fbPost.get("content");

		return persistable;
	}

	convertPersistableFormatToModel(object) {
		return new FbPost(object.id, object.userId, object.content);
	}
}
