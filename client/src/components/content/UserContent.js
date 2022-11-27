import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import { logoutUser } from "../../store/actions/authActions";
import {
  getUserContent,
  deleteContent,
  addContent,
} from "../../store/actions/contentActions";

import { SearchBar, ContentCard } from ".";

const UserContent = (props) => {
  const token = localStorage.getItem("jwt");
  const { getUserContent, userContent, addContent, logoutUser, deleteContent } =
    props;

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [data, setData] = useState(8);
  const [show, setShow] = useState(true);
  const [snackBar, setSnackBar] = useState(false);

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

  useEffect(() => {
    if (userContent.userContent.length <= data) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [userContent, data]);

  useEffect(() => {
    if (userContent.success) {
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 2000);
      userContent.success = false;
    }
  }, [userContent.success, userContent]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = {
      jwt: token,
      title: newContent.title,
      description: newContent.description,
      image: newContent.image,
    };
    addContent(content);
    setNewContent({
      title: "",
      description: "",
      image: "",
    });
  };

  const handleClose = () => {
    setSnackBar(false);
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
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
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
            disabled={show}
          >
            Show Next Row
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
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
