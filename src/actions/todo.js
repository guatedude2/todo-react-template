import { createAction } from 'redux-actions';
import * as types from '../constants/action-types';

export const addTodo = createAction(types.ADD_TODO, (text) => ({ text }));

export const deleteTodo = createAction(types.DELETE_TODO, (id) => ({ id }));

export const toggleDone = createAction(types.TOGGLE_DONE, (id, done) => ({ id, done }));

export const editTodo = createAction(types.EDIT_TODO, (id) => ({ id, editing: true }));

export const cancelEditTodo = createAction(types.EDIT_TODO, (id) => ({ id, editing: false }));

export const saveTodo = createAction(types.UPDATE_TODO, (id, text) => ({ id, text }));

export const toggleAll = createAction(types.TOGGLE_ALL_DONE, (done) => ({ done }));

export const setFilter = createAction(types.SET_FILTER, (filter) => ({ filter }));

export const clearAllDone = createAction(types.CLEAR_ALL_DONE);