import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ExitToApp } from '@mui/icons-material';

import { logoutUser } from '../../store/actions/authActions';
import {
  getUserContent,
  deleteContent,
  addContent,
} from '../../store/actions/contentActions';

import SearchBar from './SearchBar';
import ContentCard from './ContentCard';

const UserContent = ({
  getUserContent,
  userContent,
  addContent,
  logoutUser,
  deleteContent,
}) => {
  const [contentToAdd, setContentToAdd] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [searchCriteria, setSearchCriteria] = useState('');
  const [numberOfCards, setNumberOfCards] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const token = localStorage.getItem('jwt');
  const searchResults = useMemo(
    () =>
      userContent.userContent
        .filter((item) => {
          return item.title
            .toLowerCase()
            .includes(searchCriteria.toLowerCase());
        })
        .slice(0, numberOfCards),
    [userContent, searchCriteria, numberOfCards]
  );

  useEffect(() => {
    getUserContent(token);
  }, [token, getUserContent]);

  const handleSearch = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleShowMoreCards = () => {
    setNumberOfCards(numberOfCards + 4);
  };

  const handleInput = (e) => {
    setContentToAdd({
      ...contentToAdd,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (title) => {
    deleteContent({ jwt: token, title });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addContentRequest = {
      jwt: token,
      title: contentToAdd.title,
      description: contentToAdd.description,
      image: contentToAdd.image,
    };
    addContent(addContentRequest, handleLoading, handleShowSnackbar);
    setContentToAdd({
      title: '',
      description: '',
      image: '',
    });
  };

  const handleLoading = (bool) => {
    setIsLoading(bool);
  };

  const handleShowSnackbar = (bool) => {
    setShowSnackbar(bool);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ff6347',
        overflowY: 'scroll',
      }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '17pc',
          width: '100%',
          backgroundColor: 'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '1em',
          borderBottom: '4mm ridge rgb(170, 50, 220, .6)',
          zIndex: 3,
        }}>
        <Box
          sx={{
            gridColumnStart: 1,
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'end',
            paddingBottom: '25px',
          }}>
          <Button
            variant='outlined'
            onClick={handleLogout}>
            Logout <ExitToApp />
          </Button>
        </Box>
        <Box
          sx={{
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            gridColumn: 'span 2 / span 2',
            gridColumnStart: 2,
          }}>
          <TextField
            label='Title'
            placeholder='Enter product title'
            value={contentToAdd.title}
            onChange={handleInput}
            name='title'
          />
          <TextField
            label='Description'
            placeholder='Enter product description'
            value={contentToAdd.description}
            onChange={handleInput}
            name='description'
          />
          <TextField
            label='Image'
            placeholder='Enter link to product image'
            value={contentToAdd.image}
            onChange={handleInput}
            name='image'
          />
          <LoadingButton
            variant='contained'
            onClick={handleSubmit}
            loading={isLoading}>
            Submit
          </LoadingButton>
        </Box>
        <Box
          sx={{
            gridColumnStart: 4,
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'end',
            paddingBottom: '25px',
          }}>
          <SearchBar searchBar={handleSearch} />
        </Box>
      </Box>
      <Box
        sx={{
          paddingTop: '3em',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '10px',
          maxWidth: '100%',
          paddingLeft: '20px',
        }}>
        {searchResults.map((post) => {
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
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: '7%' }}>
          <Button
            onClick={handleShowMoreCards}
            variant='contained'
            sx={{ marginBottom: '5px' }}
            disabled={userContent.userContent.length <= numberOfCards}>
            Show Next Row
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          severity='success'
          sx={{ width: '100%' }}>
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
