import {COMMENTS} from '../shared/comments';
import * as ActionTypes from "./ActionTypes";

export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return state.concat(comment); //it is adding to it and not modifying it
        default:
            return state;
    }
}