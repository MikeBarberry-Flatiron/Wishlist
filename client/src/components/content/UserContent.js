import React from 'react';
import styled  from 'styled-components'

const ContentContainer = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`
const PostContainer =  styled.div`
    border: 1px solid black;
    margin: 0 15px 15px 0;
    padding: 1rem 3rem 1rem 3rem; 
    justify-content: center;
    text-align: center;
    flex-direction: inherit;
`

const DeleteButton = styled.button`
    color: red;
    border-radius: 0.5rem;
    &:hover {
        cursor: pointer;
    }
`

const Image = styled.img`
    width: 170px;
    height: 190px;
`

const UserContent =  ({ handleDelete, content, handleInput }) => {
    return(
        <>
            <ContentContainer>
                {content?.map(content => {
                    const cb = () => { handleDelete(content.id) }
                    return <PostContainer key={content.id}>
                        <DeleteButton onClick={cb}>remove</DeleteButton>
                        <h2>{content.category}</h2>
                        <a href={content.url} target="_blank" rel="noreferrer"><Image src={content.image} alt="user_content_image"></Image></a>
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><svg id="external_link" className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline><path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path></svg></svg>
                        <p>{content.description}</p>
                    </PostContainer>
                })}
            </ContentContainer>
        </>
    )
}

export default UserContent
