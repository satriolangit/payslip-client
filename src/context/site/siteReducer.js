import {
    SET_SITE_NAME
  } from "./types";

  export default (state, action) => {
    switch(action.type) {
        case SET_SITE_NAME : 
            return {
                ...state, 
                siteName : action.payload
            };
            default: 
                return state;
    }
  };