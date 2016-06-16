import { handleActions } from 'redux-actions';

import * as types from '../constants/action-types';

export default handleActions({
  [types.ADD_TODO]: (state, {payload}) => (
    {
      ...state,
      todos: state.todos.concat([
        {
          ...payload,
          id: `test-${++state.nextId}`,
          done: false,
          editing: false
        }
      ])
    }
  ),

  [types.DELETE_TODO]: (state, {payload}) => (
    {
      ...state,
      todos: state.todos.filter((item) => (
        item.id !== payload.id
      ))
    }
  ),

  [types.TOGGLE_DONE]: (state, {payload}) => (
    {
      ...state,
      todos: state.todos.map((item) => ({
        ...item,
        done: (item.id === payload.id ? payload.done : item.done)
      }))
    }
  ),

  [types.EDIT_TODO]: (state, {payload}) => (
    {
      ...state,
      todos: state.todos.map((item) => ({
        ...item,
        editing: (item.id === payload.id ? payload.editing : item.editing)
      }))
    }
  ),

  [types.UPDATE_TODO]: (state, {payload}) => (
    {
      ...state,
      todos: state.todos.map((item) => ({
        ...item,
        text: (item.id === payload.id ? payload.text : item.text),
        editing: false
      }))
    }
  ),

  [types.TOGGLE_ALL_DONE]: (state, {payload}) => (
    {
      ...state,
      todos: state.todos.map((item) => ({
        ...item,
        done: payload.done
      }))
    }
  ),

  [types.SET_FILTER]: (state, {payload}) => (
    {
      ...state,
      filter: payload.filter
    }
  ),

  [types.CLEAR_ALL_DONE]: (state) => (
    {
      ...state,
      todos: state.todos.filter((item) => ( !item.done ))
    }
  )
}, {
  todos: [
    { id:'todo-1', text: 'Create a new project', done: true, editing: false },
    { id:'todo-2', text: 'Run the project using "npm start"', done: true, editing: false },
    { id:'todo-3', text: 'Start writing some code', done: false, editing: false },
    { id:'todo-4', text: 'Write some tests for code', done: false, editing: false }
  ],
  nextId: 5,
  filter: null
});
