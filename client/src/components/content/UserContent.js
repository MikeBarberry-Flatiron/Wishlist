import React from 'react';
import styled  from 'styled-components'
import { Delete } from '@material-ui/icons'


const OuterContainer = styled.div`
    overflow-x: scroll;
    box-sizing: content-box;
    display: flex;
    background-color: #434343;
    border-right: thick solid;
`
const ContentContainer = styled.div`
    padding: 3rem 0 3rem 2rem;    
    display: flex;
    overflow-x: visible;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
    position: relative;
`
const Posts =  styled.div`
    background-color: white;
    border: 1px solid black;
    border-radius: 20px;
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

const UserContent =  ({ handleDelete, content }) => {
    return(
        <OuterContainer>
            <ContentContainer>
                {content?.map(content => {
                    const cb = () => { handleDelete(content.id) }
                    return <Posts key={content.id}>
                        <DeleteButton onClick={cb}><Delete /></DeleteButton>
                        <h2>{content.description}</h2>
                        <a href={content.url} target="_blank" rel="noreferrer"><Image src={content.image} alt="user_content_image"></Image></a>
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><svg id="external_link" className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline><path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path></svg></svg>
                    </Posts>
                })}
            </ContentContainer>
        </OuterContainer>
    )
}

export default UserContent
