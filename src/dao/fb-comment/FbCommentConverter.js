import {Injectable} from "angular2/core";

import {BaseConverter} from "../BaseConverter";
import {FbComment} from "./FbComment";

@Injectable()
export class FbCommentConverter {
	constructor() {
	}

	convertModelToPersistableFormat(fbComment) {
		if (!fbComment instanceof FbComment) {
			throw new Error("Invalid Parameter Type - requires FbComment model");
		}
		var persistable = {};
		persistable.id = fbComment.get("id");
        persistable.postId = fbComment.get("postId");
        persistable.userId = fbComment.get("userId");
		persistable.content = fbComment.get("content");

		return persistable;
	}

	convertPersistableFormatToModel(object) {
		return new FbComment(object.id, object.postId, object.userId, object.content);
	}
}
