import {TodoActions} from "../actions/TodoActions";

import {Map} from "immutable"

const initialState = Map({})

export class TodoReducer {
	constructor() {
	}

    reduce(state = initialState, action){
		// you can chain state.set statements together
		// this is intentionally verbose to illustrate
		// what is happening and how a new item is returned
		// for each modification

        switch(action.type){

			case TodoActions.INITIALIZE_LIST_VIEW:
				return state.set("showDetails", false);

            case TodoActions.LOAD_TODOS_START:
                return state.set("isFetching", true);

            case TodoActions.LOAD_TODOS_COMPLETE:
                state = state.set("isFetching", false);
				return state.set("todos", action.todos);

            case TodoActions.LOAD_TODOS_ERROR:
				state = state.set("isFetching", false);
				return state.set("error", action.error);

            case TodoActions.SELECT_TODO:
                state = state.set("todo", action.todo);
				return state.set("showDetails", true);

            case TodoActions.SAVE_TODO_START:
				return state.set("isFetching", true);

            case TodoActions.SAVE_TODO_COMPLETE:
				state = state.set("isFetching", false);
				state = state.set("todo", action.todo);
				return state.set("showDetails", false);

            case TodoActions.SAVE_TODO_FAIL:
                state = state.set("isFetching", false);
				state = state.set("error", action.error);
				return state.set("showDetails", false);

            case TodoActions.DELETE_TODO_START:
                return state.set("isFetching", true);

            case TodoActions.DELETE_TODO_COMPLETE:
                state = state.set("isFetching", false);
				return state.set("deletedId", action.id);

            case TodoActions.DELETE_TODO_FAIL:
                state = state.set("isFetching", false);
				return state.set("error", action.error);

            default:
                return state;
        }
    }
}
