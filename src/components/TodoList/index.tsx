import React, {FC, ReactElement, useCallback, useState, useEffect, useReducer } from 'react';

import TdInput from './Input';
import TdList from './List';
import { IState, ITodo, ACTION_TYPE } from './typings';
import { todoReducer } from './reducer';

// const initialState: IState = {
//     todoList: []
// }

// 惰性初始化
function initState(initialState: ITodo[]){
    return({
        todoList: initialState
    })
}

const TodoList: FC = (): ReactElement => {
    // <ITodo[]>泛型指useState的参数是ITodo的空数组
    // const [ todoList, setTodoList ] = useState<ITodo[]>([]);
    // useReducer -- useState的优化

    // const [ state, dispatch ] = useReducer(todoReducer, initialState);
    const [ state, dispatch ] = useReducer(todoReducer, [], initState);
    
    // useEffect(() => {
    //     console.log(todoList);
    // }, [todoList]);

    useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
        dispatch({
            type: ACTION_TYPE.INIT_TODOLIST,
            payload: todoList
        })
    }, []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(state.todoList))
    }, [state.todoList]);

    // 从父组件传入方法到子组件，用useCallback包裹，避免子组件不必要的更新
    const addTodo = useCallback((todo:ITodo) => {
        console.log(todo);
        //setTodoList(todoList => [...todoList,todo])
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    }, [])

    const removeTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.REMVOE_TODO,
            payload: id
        })
    }, [])

    const toggleTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    }, [])

    return (
        <div className="todo-list">
            <TdInput
                 addTodo={ addTodo }
                 todoList={ state.todoList }
                //  todoList={ todoList }
            />
            <TdList
                todoList={ state.todoList }
                removeTodo={ removeTodo }
                toggleTodo={ toggleTodo }
            />
        </div>
    );
}

export default TodoList;