import {
    GET_ROOM_COUNT,
    CHECK_IN,
    CURRENT_TAB,
    MODAL_PROPS,
    SIGNUP_MODAL
} from "./actions";
import { useReducer } from "react";

export const reducer = (state, action) => {
    switch (action.type) {
        
        case GET_ROOM_COUNT:
            return {
                ...state,
                roomsAvailable: action.roomsAvailable,
            };
        case CHECK_IN:
            return {
                ...state,
                checkedInGuests: action.checkedInGuests,
            };
        case CURRENT_TAB:
            return {
                ...state,
                currentTab: action.currentTab,
            };
        case MODAL_PROPS:
            return {
                ...state,
                modalOpen: action.modalOpen,
                modalProps: action.modalProps,
            };
        case SIGNUP_MODAL:
            return {
                ...state,
                signupModal: action.signupModal,
                signupProps: action.signupProps,
            };

        default:
            return state;
    }
};
export function useUiReducer(initialState) {
    return useReducer(reducer, initialState);
}
