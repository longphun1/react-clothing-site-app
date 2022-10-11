import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

import { fetchCategoriesSuccess, fetchCategoriesFailure } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        yield put(fetchCategoriesFailure(error));
    }
};

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAync)
};

export function* categoriesSage() {
    yield all([call(onFetchCategories)]) //complete every actions in this line b4 moving on
}