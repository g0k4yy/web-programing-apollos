import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import NavBar from './Navbar';

const AddCoffee = () => {
    const [coffee, setCoffee] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        stock: '',
        size: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCoffee({ ...coffee, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { name, description, image, price, stock, size } = coffee;
        if (!name || !description || !image || !price || !stock || !size) {
            setError('Please fill in all fields.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:8081/api/v1/coffee', JSON.stringify(coffee), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
                navigate('/'); // Redirect to home page
            })
            .catch(error => {
                console.error('Error adding coffee', error);
                setError('Failed to add coffee. Please try again.');
            });
        }
    };
    return (
        <Container>
            <NavBar></NavBar>
            <h1 className="my-4">Add Coffee</h1>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={coffee.name} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" id="description" value={coffee.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image URL</Label>
                    <Input type="text" name="image" id="image" value={coffee.image} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" name="price" id="price" value={coffee.price} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="stock">Stock</Label>
                    <Input type="number" name="stock" id="stock" value={coffee.stock} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="size">Size</Label>
                    <Input type="select" name="size" id="size" value={coffee.size} onChange={handleChange}>
                        <option value="">Select a size</option>
                        <option value="SMALL">Small</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LARGE">Large</option>
                    </Input>
                </FormGroup>
                <Button type="submit" color="primary">Add Coffee</Button>
            </Form>
        </Container>
    );
};

export default AddCoffee;
