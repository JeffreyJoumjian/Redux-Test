import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

import candidateReducer from './reducers/candidateSlice';

export default configureStore({
	reducer: {
		candidates: candidateReducer
	},
}, applyMiddleware(thunk));