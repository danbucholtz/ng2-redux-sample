import {Input, Component, EventEmitter} from "angular2/core";

import {AppStore} from "../../../store/AppStore";
import {FacebookActionsCreator} from "../actions/FacebookActionsCreator";
import {FbComment} from "../../../dao/fb-comment/FbComment";
import {FbLike} from "../../../dao/fb-like/FbLike";

@Component({
	selector: "post",
	template: `
    <div class="card post-padding">
        <span class="post-avatar-container">
            <img class="post-avatar" [src]="post.user.imageUrl"/>
        </span>
		<h4 class="poster-name">{{post.user.firstName}} {{post.user.lastName}}</h4>
		<div class="post-content">
			<p>{{post.content}}</p>
		</div>
		<hr class="featurette-divider"/>
		<span class="grey-icon glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
		<span class="grey-icon icon-text" (click)="likePost()">Like</span>
		<span class="grey-icon glyphicon glyphicon-comment" aria-hidden="true"></span>
		<span class="grey-icon icon-text">Comment</span>
		<div class="post-comment-section">
			<div class="post-likes">{{post.likes.length}} Likes</div>
			<div *ngFor="#like of post.likes">{{like.user.firstName}} {{like.user.lastName}} likes this post</div>
			<hr class="featurette-divider"/>
			<div class="post-comment-container" *ngFor="#comment of post.comments">
				<span class="comment-avatar-container">
					<img class="comment-avatar" [src]="comment.user.imageUrl"/>
				</span>
				<h6 class="poster-name">{{comment.user.firstName}} {{comment.user.lastName}}</h6>
				<p>{{comment.content}}</p>
			</div>
			<div class="post-comment-container">
				<span class="comment-avatar-container">
					<img class="comment-avatar" [src]="commentingUser.imageUrl"/>
				</span>
				<input type="text" class="comment-input form-control"
					placeholder="Add a comment..."
					[(ngModel)]="comment">
				<button class="btn btn-primary" [disabled]="!comment || comment.length === 0" (click)="submitComment()">Add Comment</button>
			</div>
		</div>
    </div>
  	`
})
export class Post {

	@Input() post;
	@Input() commentingUser;

	constructor(appStore:AppStore, facebookActionsCreator:FacebookActionsCreator) {
		this.appStore = appStore;
		this.facebookActionsCreator = facebookActionsCreator;
	}

	submitComment(){
		var newComment = new FbComment(null, this.post.id, this.commentingUser.id, this.comment);
		this.facebookActionsCreator.addComment(newComment);
		this.comment = null;
	}

	likePost(){
		var newLike = new FbLike(null, this.post.id, this.commentingUser.id);
		this.facebookActionsCreator.likePost(newLike);
	}

	get diagnostic(){
		if ( this.post ){
			return JSON.stringify(this.post);
		}
		return "Not set yet";
	}
}
