import {Injectable} from "angular2/core";

import {AppStore} from "../../../store/AppStore";
import {FacebookActions} from "./FacebookActions";
import {FbCommentDao} from "../../../dao/fb-comment/FbCommentDao";
import {FbLikeDao} from "../../../dao/fb-like/FbLikeDao";
import {FbPostDao} from "../../../dao/fb-post/FbPostDao";
import {FbUserDao} from "../../../dao/fb-user/FbUserDao";
import {ViewModelUtil} from "../view-models/util/ViewModelUtil";

@Injectable()
export class FacebookActionsCreator {
	constructor(appStore:AppStore, facebookActions:FacebookActions, fbCommentDao:FbCommentDao,
            fbLikeDao:FbLikeDao, fbPostDao:FbPostDao, fbUserDao:FbUserDao, viewModelUtil:ViewModelUtil) {
        this.appStore = appStore;
        this.facebookActions = facebookActions;
        this.fbCommentDao = fbCommentDao;
        this.fbLikeDao = fbLikeDao;
        this.fbPostDao = fbPostDao;
        this.fbUserDao = fbUserDao;
        this.viewModelUtil = viewModelUtil;
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

	async initializeApp(){
		try{
            var user = await this.viewModelUtil.getDefaultUser();
            this.appStore.dispatch(this.facebookActions.initializeApp(user));
			this.loadNewsFeed();
        }
        catch(ex){
            alert("Failed to initialize app");
        }
	}

	async loadNewsFeed(){
        try{
            this.appStore.dispatch(this.facebookActions.loadNewsFeedStart());

            var posts = await this.viewModelUtil.getHydratedPosts();

            this.appStore.dispatch(this.facebookActions.loadNewsFeedComplete(posts));
        }
        catch(ex){
            this.appStore.dispatch(this.facebookACtions.loadNewsFeedFail(ex.message));
        }

    }

    async createPost(postEntity){
        try{
            this.appStore.dispatch(this.facebookActions.createPostStart());

            var result = await this.fbPostDao.save(postEntity);

            var viewModel = await this.viewModelUtil.getHydratedPost(result.id);

            this.appStore.dispatch(this.facebookActions.createPostComplete(viewModel));

        }
        catch(ex){
            this.appStore.dispatch(this.facebookActions.createPostFail(ex.message));
        }
    }

    async addComment(commentEntity){
        try{
            this.appStore.dispatch(this.facebookActions.addCommentStart());

            var result = await this.fbCommentDao.save(commentEntity);

            var viewModel = await this.viewModelUtil.getHydratedComment(result.id);

            this.appStore.dispatch(this.facebookActions.addCommentComplete(viewModel));
        }
        catch(ex){
            this.appStore.dispatch(this.facebookActions.addCommentFail(ex.message));
        }
    }

    async likePost(likeEntity){
        try{
            this.appStore.dispatch(this.facebookActions.likePostStart());

			// check if the post is already liked
			var entity = await this.fbLikeDao.getOneByQuery(`where userId=?`, [likeEntity.userId]);
			if ( entity ){
				// if it's already liked, unlike it
				await this.fbLikeDao.delete(entity.id);
				this.appStore.dispatch(this.facebookActions.unlikePost(entity));
			}
			else{
				var result = await this.fbLikeDao.save(likeEntity);
				var viewModel = await this.viewModelUtil.getHydratedLike(result.id);
				this.appStore.dispatch(this.facebookActions.likePostComplete(viewModel));
			}
        }
        catch(ex){
            this.appStore.dispatch(this.facebookActions.likePostFail(ex.message));
        }
    }
}
