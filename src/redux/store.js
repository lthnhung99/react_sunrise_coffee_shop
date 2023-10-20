import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import mainSlice from '../components/reducers/mainSlice';

const store = configureStore({
    reducer: {
        main: mainSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});




const ReduxProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider;

/*
import { configureStore, createSlice } from '@reduxjs/toolkit';
import todoListSlice from './../components/TodoList/todoListSlice';
import thunk from 'redux-thunk';


const store = configureStore({
    reducer: {
        todoList: todoListSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;

*/
