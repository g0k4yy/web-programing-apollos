import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, ListGroup, ListGroupItem, Row, Col, Button, Card, CardImg, CardBody, CardTitle, CardText, Input } from 'reactstrap';
import NavBar from './Navbar';

const Cart = () => {
    const [cart, setCart] = useState({ items: [] });
    const navigate = useNavigate();

    // Function to fetch cart data
    const fetchCartData = () => {
        axios.get('http://localhost:8081/api/v1/cart')
            .then(response => {
                setCart(response.data);
                console.log("Cart data:", response.data);
            })
            .catch(error => console.error('Error fetching cart', error));
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const updateQuantity = (coffeeId, newQuantity) => {
        const url = `http://localhost:8081/api/v1/cart?coffeeId=${coffeeId}&quantity=${newQuantity}`;

        axios.post(url)
            .then(response => {
                console.log('Quantity updated', response.data);
                fetchCartData(); // Re-fetch the cart data after updating quantity
            })
            .catch(error => console.error('Error updating quantity', error));
    };
    const removeFromCart = (coffeeId) => {
        const url = `http://localhost:8081/api/v1/cart/remove?coffeeId=${coffeeId}`;

        axios.post(url)
            .then(response => {
                console.log('Item removed', response.data);
                fetchCartData(); 
            })
            .catch(error => console.error('Error removing item from cart', error));
    };

    const createOrder = () => {
        axios.post('http://localhost:8081/api/v1/orders')
            .then(response => {
                console.log('Order created', response.data);
                fetchCartData();
            })
            .catch(error => console.error('Error creating order', error));
    };

    return (
        <Container>
            <NavBar />
            <Row>
                <Col>
                    <h1 className="text-center my-4">Your Cart</h1>
                    <ListGroup>
                        {cart.items.map((item) => (
                            <ListGroupItem key={item.id}>
                                <Card>
                                    <Row noGutters>
                                        <Col md={1} xs={1}>
                                            <CardImg top src={item.coffee.image} alt={item.coffee.name} />
                                        </Col>
                                        <Col md={5} xs={5}>
                                            <CardBody>
                                                <CardTitle tag="h5">{item.coffee.name}</CardTitle>
                                                <CardText>{item.coffee.description}</CardText>
                                                <CardText>Price: ${item.coffee.price}</CardText>
                                                <CardText>
                                                    Quantity: 
                                                    <Input 
                                                        type="number" 
                                                        value={item.quantity} 
                                                        onChange={(e) => updateQuantity(item.coffee.coffeeId, e.target.value)}
                                                        style={{ width: '80px', display: 'inline', marginLeft: '10px' }}
                                                    />
                                                    <Button 
                                                        color="danger" 
                                                        onClick={() => removeFromCart(item.coffee.coffeeId)} 
                                                        style={{ marginLeft: '10px' }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </CardText>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </Card>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <div className="text-center my-4">
                        <h3>Total: ${cart.total}</h3>
                        <Button color="primary" onClick={createOrder}>Make Order</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;