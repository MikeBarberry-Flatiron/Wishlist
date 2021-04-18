import React from 'react';

const AuthToggle = ({ id, setPage, type }) => {
    return (
        <button id={id} onClick={setPage}>{type ? "register" : "login"}</button>
    )
}

export default AuthToggle