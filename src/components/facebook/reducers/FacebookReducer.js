import {FacebookActions} from "../actions/FacebookActions";

import {Map} from "immutable"

const initialState = Map({})

export class FacebookReducer {
	constructor() {
	}

    reduce(state = initialState, action){
		// you can chain state.set statements together
		// this is intentionally verbose to illustrate
		// what is happening and how a new item is returned
		// for each modification

        switch(action.type){

			case FacebookActions.INITIALIZE_APP:
				return state.set("myUser", action.user);

            case FacebookActions.LOAD_NEWSFEED_START:
                return state.set("isFetching", true);

            case FacebookActions.LOAD_NEWSFEED_COMPLETE:
                state = state.set("isFetching", false);
				return state.set("posts", action.posts);

            case FacebookActions.LOAD_NEWSFEED_FAIL:
				state = state.set("isFetching", false);
				return state.set("error", action.error);

            case FacebookActions.CREATE_POST_START:
                return state.set("isFetching", true);


            case FacebookActions.CREATE_POST_COMPLETE:
				state = state.set("isFetching", false);
                var posts = state.get("posts");
                return state.set("posts", posts.concat([action.post]));

            case FacebookActions.CREATE_POST_FAIL:
				state = state.set("isFetching", false);
				return state.set("error", action.error);

            case FacebookActions.ADD_COMMENT_START:
                return state.set("isFetching", true);

            case FacebookActions.ADD_COMMENT_COMPLETE:
                state = state.set("isFetching", false);
                // get an array at a new memory address
                var posts = state.get("posts").concat([]);
                for ( var post of posts ){
                    if ( post.id === action.comment.postId ){
                        if ( !post.comments ){
                            post.comments = [];
                        }
                        post.comments = post.comments.concat([action.comment]);
                    }
                }
                return state.set("posts", posts);

            case FacebookActions.ADD_COMMENT_FAIL:
                state = state.set("isFetching", false);
				return state.set("error", action.error);

            case FacebookActions.LIKE_POST_START:
                return state.set("isFetching", true);

            case FacebookActions.LIKE_POST_COMPLETE:
                state = state.set("isFetching", false);
                // get an array at a new memory address
                var posts = state.get("posts").concat([]);
                for ( var post of posts ){
                    if ( post.id === action.like.postId ){
                        if ( !post.likes ){
                            post.likes = [];
                        }
                        post.likes = post.likes.concat([action.like]);
                    }
                }
                return state.set("posts", posts);

            case FacebookActions.LIKE_POST_FAIL:
                state = state.set("isFetching", false);
                return state.set("error", action.error);

			case FacebookActions.UNLIKE_POST:
				// get new copy of posts array
				var posts = state.get("posts").concat([]);
				for ( var post of posts ){
                    if ( post.id === action.like.postId ){
						// loop over each like, and grab the index
						var index = -1;
						for ( let i = 0; i < post.likes.length; i++ ){
							if ( post.likes[i].id === action.like.id ){
								index = i;
								break;
							}
						}
						if ( index >= 0 ){
							var newLikesArray = post.likes.concat([]);
							newLikesArray.splice(index, 1);
							post.likes = newLikesArray;
						}
						break;
					}
				}
				return state.set("posts", posts);

            default:
                return state;
        }
    }
}
