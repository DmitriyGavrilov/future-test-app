import React from 'react';

const Item = (props) => {
    return (
            <tr><th scope="row">{props.index}</th>
            <td>{props.id}</td> 
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td></tr>
    );
};

export default Item;