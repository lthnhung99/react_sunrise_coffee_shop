import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import mainSlice from '../components/reducers/mainSlice';
import kitchenSlice from '../components/reducers/kitchenSlice';

const store = configureStore({
    reducer: {
        main: mainSlice.reducer,
        kitchen: kitchenSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const ReduxProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider;
