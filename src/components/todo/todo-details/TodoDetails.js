import {Component, EventEmitter} from "angular2/core";

import {AppStore} from "../../../store/AppStore";
import {Todo} from "../../../dao/todo/Todo";
import {TodoActionsCreator} from "../actions/TodoActionsCreator";

@Component({
  selector: "todo-details",
  template: `
    <form #todoForm="ngForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label for="name">Todo Text</label>
            <input type="text" class="form-control" placeholder="Pick up milk" required
            [(ngModel)]="todo.text">
        </div>
        <div class="checkbox">
            <label>
                <input type="checkbox" [(ngModel)]="todo.completed"> Is Completed
            </label>
        </div>
        <div class="pull-right">
            <button class="btn btn-primary" [disabled]="!todoForm.form.valid">
                Save Todo
            </button>
        </div>
    </form>
  `
})
export class TodoDetails {

    constructor(appStore:AppStore, todoActionsCreator:TodoActionsCreator) {
        this.appStore = appStore;
        this.todoActionsCreator = todoActionsCreator;
        this.todo = {};
    }

    ngOnInit() {
		this.unsubscribe = this.appStore.subscribe(() => {
			this.processStateChange(this.appStore.getState().todosState);
		});

        this.todoActionsCreator.initializeDetailView();
	}

    async onSubmit(){
        // cast the todo back to our immutable entity
        var immutableTodo = new Todo(this.todo.id, this.todo.text, this.todo.completed);
        this.todoActionsCreator.saveTodo(immutableTodo);
    }

    processStateChange(state){
        if ( state.get("todo") ){
            this.todo = state.get("todo").getMutableCopy();
        }
    }

    get diagnostic(){
        if ( this.todo ){
            return JSON.stringify(this.todo);
        }
        return "No Todo";
    }
}
