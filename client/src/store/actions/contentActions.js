import {
  SET_USER_CONTENT,
  DELETE_CONTENT,
  ADD_CONTENT,
  CONTENT_SUCCESS,
} from "./types";
import store from "../../store";

export const getUserContent = (token) => async (dispatch) => {
  const response = await fetch(
    "https://pshgvjl5aa.execute-api.us-west-2.amazonaws.com/production/api/getcontent",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ jwt: token }),
    }
  );
  const json = await response.json();
  dispatch({
    type: SET_USER_CONTENT,
    payload: json.content,
  });
};

export const addContent = (newContent) => async (dispatch) => {
  const response = await fetch(
    "https://pshgvjl5aa.execute-api.us-west-2.amazonaws.com/production/api/addcontent",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newContent),
    }
  );
  const json = await response.json();
  dispatch({
    type: ADD_CONTENT,
    payload: json.updated,
  });
  dispatch({
    type: CONTENT_SUCCESS,
    payload: true,
  });
};

export const deleteContent = (request) => async (dispatch) => {
  const response = await fetch(
    "https://pshgvjl5aa.execute-api.us-west-2.amazonaws.com/production/api/deletecontent",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  const json = await response.json();
  const { deletedContent, newContent } = json.updated;
  const index = store
    .getState()
    .userContent.userContent.map((e) => e.id)
    .indexOf(deletedContent);
  dispatch({
    type: DELETE_CONTENT,
    payload: {
      deleteIndex: index,
      newContent: newContent,
    },
  });
};
