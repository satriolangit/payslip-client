import React, {useReducer} from "react";
import SiteContext from "./siteContext";
import siteReducer from "./siteReducer";
import { SET_SITE_NAME } from "./types";

const SiteState = props => {
    const initialState = {
        siteName: null
    };

    const [state, dispatch] = useReducer(siteReducer, initialState);

    const gotoPayslip = () => {
        dispatch({
            type: SET_SITE_NAME,
            payload: "PAYSLIP"
        });
    };

    const gotoSurvey = () => {
        dispatch({
            type: SET_SITE_NAME,
            payload: "SURVEY"
        });
    };

    const gotoIdeaBox = () => {
        dispatch({
            type: SET_SITE_NAME,
            payload: "IDEABOX"
        });
    };

    return (
        <SiteContext.Provider value= {
            {siteName: state.siteName, 
                gotoPayslip, 
                gotoIdeaBox, 
                gotoSurvey}
            }>
            {props.children}
        </SiteContext.Provider>
    );
};

export default SiteState;