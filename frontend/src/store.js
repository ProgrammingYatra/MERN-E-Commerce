import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";



let initialState = {
};

const middleware = [thunk];

const store = createStore(
  
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
