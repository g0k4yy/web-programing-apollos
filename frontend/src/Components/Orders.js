import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, ListGroupItem, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import NavBar from './Navbar';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/orders')
            .then(response => {
                console.log(response.data)
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders', error);
            });
    }, []);

    return (
        <Container>
            <NavBar />
            <h1 className="text-center my-4">Last 10 Orders</h1>
            <ListGroup>
                {orders.map(order => (
                    <ListGroupItem key={order.orderId}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Order ID: {order.orderId}</CardTitle>
                                {/* Display other order details as needed */}
                                <CardText>Date: {new Date(order.orderDate).toLocaleDateString()}</CardText>
                                <CardText>Total: {order.totalAmount}</CardText>
                                {/* Add more details you want to show for each order */}
                            </CardBody>
                        </Card>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Orders;
