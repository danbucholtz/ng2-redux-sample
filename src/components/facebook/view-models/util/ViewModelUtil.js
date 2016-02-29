import {Injectable} from "angular2/core";

import {FbCommentDao} from "../../../../dao/fb-comment/FbCommentDao";
import {FbLikeDao} from "../../../../dao/fb-like/FbLikeDao";
import {FbPostDao} from "../../../../dao/fb-post/FbPostDao";
import {FbUserDao} from "../../../../dao/fb-user/FbUserDao";

import {Comment} from "../Comment";
import {Like} from "../Like";
import {Post} from "../Post";
import {User} from "../User";

/* This example uses websql/sqllite so it is a normalized data structure
 * We use this view model utility to load related entities and build the proper view models
 */

export class ViewModelUtil{
    constructor(fbCommentDao:FbCommentDao, fbLikeDao:FbLikeDao, fbPostDao:FbPostDao, fbUserDao:FbUserDao){
        this.fbCommentDao = fbCommentDao;
        this.fbLikeDao = fbLikeDao;
        this.fbPostDao = fbPostDao;
        this.fbUserDao = fbUserDao;
    }

    async getDefaultUser(){
        var entity = await this.fbUserDao.getActiveUser();
        return this.convertUserEntityToViewModel(entity);
    }

    async getHydratedPosts(){
        var entities = await this.fbPostDao.getAll();
        var commentsByPostId = await this.getHydratedCommentsMap();
        var likesByPostId = await this.getHydratedLikesMap();
        var userMap = await this.getUserViewModelMap();

        var viewModels = [];
        for ( var entity of entities ){
            var viewModel = this.convertPostEntityToViewModel(entity, userMap.get(entity.userId), commentsByPostId.get(entity.id), likesByPostId.get(entity.id));
            viewModels.push(viewModel);
        }
        return viewModels;
    }

    async getHydratedPost(id){
        var entity = await this.fbPostDao.getById(id);
        var commentsByPostId = await this.getHydratedCommentsMap();
        var likesByPostId = await this.getHydratedLikesMap();
        var userMap = await this.getUserViewModelMap();
        var viewModel = this.convertPostEntityToViewModel(entity, userMap.get(entity.userId), commentsByPostId.get(entity.id), likesByPostId.get(entity.id));
        return viewModel;
    }

    async getHydratedComment(id){
        var entity = await this.fbCommentDao.getById(id);
        var userEntity = await this.fbUserDao.getById(entity.userId);
        var userViewModel = this.convertUserEntityToViewModel(userEntity);
        var viewModel = this.convertCommentEntityToViewModel(entity, userViewModel);
        return viewModel;
    }

    async getHydratedLike(id){
        var entity = await this.fbLikeDao.getById(id);
        var userEntity = await this.fbUserDao.getById(entity.userId);
        var userViewModel = this.convertUserEntityToViewModel(userEntity);
        var viewModel = this.convertCommentEntityToViewModel(entity, userViewModel);
        return viewModel;
    }

    async getHydratedLikesMap(){
        var viewModels = await this.getHydratedLikes();
        return this.convertToPostIdMap(viewModels);
    }

    async getHydratedCommentsMap(){
        var viewModels = await this.getHydratedComments();
        return this.convertToPostIdMap(viewModels);
    }

    convertToPostIdMap(viewModels){
        var map = new Map();
        for ( var viewModel of viewModels ){
            var array = map.get(viewModel.postId);
            if ( ! array ){
                array = [];
            }
            array.push(viewModel);
            map.set(viewModel.postId, array);
        }
        return map;
    }

    async getHydratedLikes(){
        var likeEntities = await this.fbLikeDao.getAll();
        var userMap = await this.getUserViewModelMap();

        var viewModels = [];
        for ( var entity of likeEntities ){
            var viewModel = this.convertLikeEntityToViewModel(entity, userMap.get(entity.userId));
            viewModels.push(viewModel);
        }

        return viewModels;
    }

    async getHydratedComments(){
        var commentEntities = await this.fbCommentDao.getAll();
        var userMap = await this.getUserViewModelMap();

        var viewModels = [];
        for ( var entity of commentEntities ){
            var viewModel = this.convertCommentEntityToViewModel(entity, userMap.get(entity.userId));
            viewModels.push(viewModel);
        }

        return viewModels;
    }

    async getUserViewModelMap(){
        var userEntities = await this.fbUserDao.getAll();
        var map = new Map();
        for ( var entity of userEntities ){
            var viewModel = this.convertUserEntityToViewModel(entity);
            map.set(entity.id, viewModel);
        }
        return map;
    }

    convertPostEntityToViewModel(entity, userViewModel, commentsViewModelList, likesViewModelList){
        return {
            id: entity.id,
            content: entity.content,
            user: userViewModel,
            comments: commentsViewModelList || [],
            likes: likesViewModelList || []
        };
    }

    convertUserEntityToViewModel(entity){
        return {
            id: entity.id,
            firstName: entity.firstName,
            lastName: entity.lastName,
            imageUrl: entity.imageUrl
        };
    }

    convertLikeEntityToViewModel(entity, userViewModel){
        return {
            id: entity.id,
            user: userViewModel,
            postId: entity.postId
        };
    }

    convertCommentEntityToViewModel(entity, userViewModel){
        return {
            id: entity.id,
            user: userViewModel,
            postId: entity.postId,
            content: entity.content
        };
    }
}
