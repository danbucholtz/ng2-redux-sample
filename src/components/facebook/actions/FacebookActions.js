import {Injectable} from "angular2/core";

@Injectable()
export class FacebookActions {
	constructor() {
	}

	static INITIALIZE_APP = "INITIALIZE_APP";
    static LOAD_NEWSFEED_START = "LOAD_NEWSFEED_START";
    static LOAD_NEWSFEED_COMPLETE = "LOAD_NEWSFEED_COMPLETE";
    static LOAD_NEWSFEED_FAIL = "LOAD_NEWSFEED_FAIL";
    static CREATE_POST_START = "CREATE_POST_START";
    static CREATE_POST_COMPLETE = "CREATE_POST_COMPLETE";
    static CREATE_POST_FAIL = "CREATE_POST_FAIL";
    static ADD_COMMENT_START = "ADD_COMMENT_START";
    static ADD_COMMENT_COMPLETE = "ADD_COMMENT_COMPLETE";
    static ADD_COMMENT_FAIL = "ADD_COMMENT_FAIL";
    static LIKE_POST_START = "LIKE_POST_START";
    static LIKE_POST_COMPLETE = "LIKE_POST_COMPLETE";
    static LIKE_POST_FAIL = "LIKE_POST_FAIL";
	static UNLIKE_POST = "UNLIKE_POST";

	initializeApp(user){
		return {
			type: FacebookActions.INITIALIZE_APP,
            user: user
		};
	}

	loadNewsFeedStart(){
        return {
            type: FacebookActions.LOAD_NEWSFEED_START
        };
    }

    loadNewsFeedComplete(posts){
        return {
            type: FacebookActions.LOAD_NEWSFEED_COMPLETE,
            posts: posts
        };
    }

    loadNewsFeedFail(error){
        return {
            type: FacebookActions.LOAD_NEWSFEED_FAIL,
            error: error
        };
    }

    createPostStart(){
        return {
            type: FacebookActions.CREATE_POST_START
        };
    }

    createPostComplete(post){
        return {
            type: FacebookActions.CREATE_POST_COMPLETE,
            post: post
        };
    }

    createPostFail(error){
        return {
            type: FacebookActions.CREATE_POST_FAIL,
            error: error
        };
    }

    addCommentStart(){
        return {
            type: FacebookActions.ADD_COMMENT_START
        };
    }

    addCommentComplete(comment){
        return {
            type: FacebookActions.ADD_COMMENT_COMPLETE,
            comment: comment
        };
    }

    addCommentFail(error){
        return {
            type: FacebookActions.ADD_COMMENT_FAIL,
            error: error
        };
    }

    likePostStart(){
        return {
            type: FacebookActions.LIKE_POST_START
        };
    }

    likePostComplete(like){
        return {
            type: FacebookActions.LIKE_POST_COMPLETE,
            like: like
        };
    }

    likePostFail(error){
        return {
            type: FacebookActions.LIKE_POST_FAIL,
            error: error
        };
    }

	unlikePost(like){
		return {
			type: FacebookActions.UNLIKE_POST,
			like: like
		}
	}
}
