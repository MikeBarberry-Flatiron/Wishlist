import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ExitToApp } from "@mui/icons-material";

import { logoutUser } from "../../store/actions/authActions";
import {
  getUserContent,
  deleteContent,
  addContent,
} from "../../store/actions/contentActions";

import { SearchBar, ContentCard } from ".";

const UserContent = ({
  getUserContent,
  userContent,
  addContent,
  logoutUser,
  deleteContent,
}) => {
  const token = localStorage.getItem("jwt");

  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getUserContent(token);
  }, [getUserContent, token]);

  useEffect(() => {
    const searchContent = userContent.userContent.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    const dataToShow = searchContent.slice(0, data);
    setSearchResults(dataToShow);
  }, [search, userContent.userContent, data]);

  const handleLogout = () => {
    logoutUser();
  };

  const handleShowMoreData = () => {
    setData(data + 4);
  };

  const handleDelete = (id) => {
    const request = {
      content_id: id,
      jwt: token,
    };
    deleteContent(request);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleInput = (e) => {
    setNewContent({
      ...newContent,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoading = (bool) => {
    setIsLoading(bool);
  };

  const handleShow = (bool) => {
    setShow(bool);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addContentRequest = {
      jwt: token,
      title: newContent.title,
      description: newContent.description,
      image: newContent.image,
    };
    addContent(addContentRequest, handleLoading, handleShow);
    setNewContent({
      title: "",
      description: "",
      image: "",
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ff6347",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "17pc",
          width: "100%",
          backgroundColor: "white",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "1em",
          borderBottom: "4mm ridge rgb(170, 50, 220, .6)",
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            gridColumnStart: 1,
            display: "flex",
            justifyContent: "center",
            alignSelf: "end",
            paddingBottom: "25px",
          }}
        >
          <Button variant="outlined" onClick={handleLogout}>
            Logout <ExitToApp />
          </Button>
        </Box>
        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            gridColumn: "span 2 / span 2",
            gridColumnStart: 2,
          }}
        >
          <TextField
            label="Title"
            placeholder="Enter product title"
            value={newContent.title}
            onChange={handleInput}
            name="title"
          />
          <TextField
            label="Description"
            placeholder="Enter product description"
            value={newContent.description}
            onChange={handleInput}
            name="description"
          />
          <TextField
            label="Image"
            placeholder="Enter link to product image"
            value={newContent.image}
            onChange={handleInput}
            name="image"
          />
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </Box>
        <Box
          sx={{
            gridColumnStart: 4,
            display: "flex",
            justifyContent: "center",
            alignSelf: "end",
            paddingBottom: "25px",
          }}
        >
          <SearchBar searchBar={handleSearch} />
        </Box>
      </Box>
      <Box
        sx={{
          paddingTop: "3em",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "10px",
          maxWidth: "100%",
          paddingLeft: "20px",
        }}
      >
        {searchResults?.map((post) => {
          return (
            <ContentCard
              key={post.title}
              title={post.title}
              desc={post.description}
              img={post.image}
              id={post.id}
              handleDelete={handleDelete}
            />
          );
        })}
      </Box>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ position: "absolute", right: "7%" }}>
          <Button
            onClick={handleShowMoreData}
            variant="contained"
            sx={{ marginBottom: "5px" }}
            disabled={userContent.userContent.length <= data}
          >
            Show Next Row
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={show}
        onClose={handleClose}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Content Added!
        </Alert>
      </Snackbar>
    </Box>
  );
};

// don't need to map state to props here because it's getting passed through ProtectedRoute

export default connect(null, {
  logoutUser,
  getUserContent,
  deleteContent,
  addContent,
})(UserContent);
