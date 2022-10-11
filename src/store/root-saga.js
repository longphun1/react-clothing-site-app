import { all, call } from 'redux-saga/effects';
import { categoriesSage } from './categories/categories.saga';

export function* rootSaga() {
    yield all([call(categoriesSage)])
};