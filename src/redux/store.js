import { createStore } from 'redux';
import { Provider } from 'react-redux'
import myReducer from './Reducers'

const store = createStore(myReducer);

const ReduxProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider;