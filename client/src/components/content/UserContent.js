import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'


const UserContent =  ({ handleDelete, content }) => {
    return(
       content?.map(post => {
            const cb = () => {handleDelete(post.id)}
            return <Box sx={{display: 'flex', flex: 'auto', width: 300, height: 350, flexDirection: 'column', justifyContent: 'center', padding: '20px'}}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            width="260"
                            src={post.image}
                            alt="content_image"
                        />
                        <CardContent sx={{justifySelf: 'center'}}> 
                            <Typography gutterBottom variant="h5" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'center'}}>
                            <Button onClick={cb}size="small"><Delete /></Button>
                        </CardActions>
                    </Card>
                </Box>
        })
    )
}

export default UserContent
