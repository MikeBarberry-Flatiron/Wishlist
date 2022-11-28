import { SET_USER_CONTENT, DELETE_CONTENT, ADD_CONTENT } from "./types";
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

export const addContent =
  (newContentRequest, handleIsLoading, handleShow) => async (dispatch) => {
    try {
      handleIsLoading(true);
      const response = await fetch(
        "https://pshgvjl5aa.execute-api.us-west-2.amazonaws.com/production/api/addcontent",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newContentRequest),
        }
      );
      const json = await response.json();
      handleIsLoading(false);
      console.log(json);
      dispatch({
        type: ADD_CONTENT,
        payload: json.updatedContent,
      });
      handleShow(true);
    } catch (err) {
      console.log(`An error occurred POSTing new card content: ${err}`);
    }
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
