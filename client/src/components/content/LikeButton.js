import React from 'react';
import { useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
  
const LikeButton = ({ cb }) => {

  const [liked, setLiked] = useState(false);

  return (
      <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />}
          name="likeButton" />}
        onChange={() => cb()}
      />
  );
}
  
export default LikeButton;