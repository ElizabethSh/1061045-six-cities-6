import {NameSpace} from "../root-reducer";

export const getIsloggedInStatus = (state) => state[NameSpace.USER].isLoggedIn;

export const getUsersEmail = (state) => state[NameSpace.USER].usersEmail;

export const getIsAuthChecked = (state) => state[NameSpace.USER].isAuthChecked;
