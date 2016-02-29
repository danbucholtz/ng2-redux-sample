import {Component, EventEmitter} from "angular2/core";

import {AppStore} from "../../../store/AppStore";
import {TodoActionsCreator} from "../actions/TodoActionsCreator";

@Component({
	selector: "todo-list",
	template: `
	<ul class="list-group">
		<li class="list-group-item" *ngIf="fetching">Loading...</li>
		<li class="list-group-item show-pointer" *ngFor="#todo of todos"
			(click)="selectTodo(todo)"
			[style.textDecoration]="todo.completed ? 'line-through' : ''">

			{{todo.get("text")}}
		</li>
		<li class="list-group-item show-pointer" *ngIf="! fetching" (click)="selectTodo(null)">Create New...</li>
	</ul>
  	`
})
export class TodoList {

	constructor(appStore:AppStore, todoActionsCreator:TodoActionsCreator) {
		this.appStore = appStore;
		this.todoActionsCreator = todoActionsCreator;
		this.fetching = false;
	}

	ngOnInit() {
		this.unsubscribe = this.appStore.subscribe(() => {
			this.processStateChange(this.appStore.getState().todosState);

		});

		this.todoActionsCreator.initializeListView();
		this.todoActionsCreator.loadTodos();
	}

	ngOnDestroy(){
		//this.unsubscribe();
	}

	processStateChange(state){
		this.fetching = state.get("isFetching");
		this.todos = state.get("todos");
	}

	selectTodo(todo){
		this.todoActionsCreator.selectTodo(todo);
	}
}
