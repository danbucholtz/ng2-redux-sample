import {Injectable} from "angular2/core";

import {BaseConverter} from "../BaseConverter";
import {FbLike} from "./FbLike";

@Injectable()
export class FbLikeConverter {
	constructor() {
	}

	convertModelToPersistableFormat(fbLike) {
		if (!fbLike instanceof FbLike) {
			throw new Error("Invalid Parameter Type - requires FbLike model");
		}
		var persistable = {};
		persistable.id = fbLike.get("id");
        persistable.postId = fbLike.get("postId");
        persistable.userId = fbLike.get("userId");

		return persistable;
	}

	convertPersistableFormatToModel(object) {
		return new FbLike(object.id, object.postId, object.userId);
	}
}
