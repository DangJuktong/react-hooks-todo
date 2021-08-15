import { IState, ACTION_TYPE, ITodo, IAction } from './typings/index';

function todoReducer (state: IState, action: IAction): IState {
    const { type, payload } = action;

    switch(type) {
        case ACTION_TYPE.INIT_TODOLIST:
            return {
                ...state,
                todoList: payload as ITodo[]
            }
        case ACTION_TYPE.ADD_TODO:
            return {
                ...state,
                todoList: [...state.todoList, payload as ITodo]
            }
        case ACTION_TYPE.REMVOE_TODO:
            return {
                ...state,
                todoList: state.todoList.filter( todo => todo.id !== payload)
            }
        case ACTION_TYPE.TOGGLE_TODO:
            return {
                ...state,
                todoList: state.todoList.map(todo => {
                    return todo.id === payload ? 
                    {
                        ...todo,
                        completed: !todo.completed
                    } : 
                    {
                        ...todo
                    }
                })
            }
        default:
            return state;
    }
}

export {
    todoReducer
}