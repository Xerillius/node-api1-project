import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UserCard = props => {
    return (
        <Div>
            <h1>{props.data.name}</h1>
            <p>{props.data.bio}</p>
            <button onClick={() => deleteUser(props.data.id)}>Delete User</button>
        </Div>
    );
}

const deleteUser = id => {
    console.log(id);
    axios
        .delete(`http://localhost:4000/api/users/${id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}

export default UserCard;

const Div = styled.div`
    width: 46%;
    border: 1px solid black;
    border-radius: 25px;
    margin: 1%;
`