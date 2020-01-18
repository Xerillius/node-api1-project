import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import styled from 'styled-components';

import UserCard from './userCard';

const Dashboard = props => {
    const [count, setCount] = useState(0);

    const updateUser = (id, changes) => {

    }

    return (
        <>
        <button onClick={props.getUsers}>Get Users</button>
        <UserList>
            {props.users.map(user => {
                return (
                    <UserCard data={user} update={updateUser} key={user.id}/>
                );
            })}
        </UserList>
        </>
    );
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, { getUsers })(Dashboard);

const UserList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`