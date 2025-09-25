import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function TableUser() {
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        axios.get('http://localhost:3000/api/users')
            .then(response => {setUsers(response.data)})
            .catch(error => {
                alert('There was an error fetching the users!', error);
                console.error(error);
            });
    }
    
    // Quando renderizar, buscar os usuários
    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
            </thead>

            <tbody>
                {users.map(( u ) => (
                    <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.email}</td>
                            <td>{u.password}</td>
                    </tr>
                ))}
            </tbody>

            <tfoot>
                <tr>
                    <td>
                        <Button variant='outline-primary' size='sm' onClick={fetchUsers}>
                            Reload Data
                        </Button>
                    </td>

                    <td colSpan="2" className='text-end'>
                        Total Users: {users.length}
                    </td>
                </tr>
            </tfoot>

        </Table>

    );
}