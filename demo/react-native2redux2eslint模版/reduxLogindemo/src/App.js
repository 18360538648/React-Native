import React, { Component } from 'react';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './store/reducers';
import MainContainer from './component/containers/MainContainer';
class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
      <MainContainer/>
      </Provider>
    );
  }
}
export default App;
