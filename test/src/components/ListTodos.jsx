import React, {Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {

        const getTodos = async () => {
            setIsLoading(true);

            try {
                const response = await fetch("/todos");
                const jsonData = await response.json();

                setTodos(jsonData);
            } catch(err) {
                console.error(err.message);
            }
            setIsLoading(false);
        }

        getTodos();
    }, []);

    return (
        <Fragment>
            {" "}
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary mt-5 text-center" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (

                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo}/></td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.todo_id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
              )}
        </Fragment>
    );
};

export default ListTodos;
