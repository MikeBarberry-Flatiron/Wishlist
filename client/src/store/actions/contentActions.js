import {
  SET_USER_CONTENT,
  DELETE_CONTENT,
  ADD_CONTENT,
  CONTENT_SUCCESS,
} from "./types";
import store from "../../store";

export const getUserContent = (token) => async (dispatch) => {
  console.log("started fetch content", token);
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
  console.log(json.content);
  dispatch({
    type: SET_USER_CONTENT,
    payload: json.content,
  });
};

export const addContent = (request) => (dispatch) => {
  fetch("/api/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: ADD_CONTENT,
        payload: json.updated,
      });
      dispatch({
        type: CONTENT_SUCCESS,
        payload: true,
      });
    });
};

export const deleteContent = (request) => (dispatch) => {
  fetch("/api/delete", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((json) => {
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
    });
};
