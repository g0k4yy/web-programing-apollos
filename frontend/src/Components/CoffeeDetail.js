import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormGroup, Label, Input } from 'reactstrap';
import NavBar from './Navbar';
const CoffeeDetail = () => {
    const [coffee, setCoffee] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { coffeeId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/v1/coffee/${coffeeId}`)
            .then(response => setCoffee(response.data))
            .catch(error => console.error('Error fetching coffee details', error));
    }, [coffeeId]);

    const addToCart = () => {
        const url = `http://localhost:8081/api/v1/cart?coffeeId=${coffeeId}&quantity=${quantity}`;
    
        axios.post(url)
            .then(response => {
                navigate('/cart'); // Navigate to cart page
            })
            .catch(error => console.error('Error adding coffee to cart', error));
    };

    return (
        <Container className="my-5">
            <NavBar></NavBar>
            <Row className="justify-content-center">
                <Col md={8}>
                    {coffee && (
                        <Card>
                            <Row noGutters>
                                <Col md={5}>
                                    <CardImg top src={coffee.image} alt={coffee.name} style={{ width: '100%', objectFit: 'cover' }} />
                                </Col>
                                <Col md={7}>
                                    <CardBody>
                                        <CardTitle tag="h3">{coffee.name}</CardTitle>
                                        <CardText>{coffee.description}</CardText>
                                        <CardText>Price: ${coffee.price}</CardText>
                                        <FormGroup row>
                                            <Label for="quantitySelect" sm={3}>Quantity</Label>
                                            <Col sm={9}>
                                                <Input 
                                                    type="number" 
                                                    name="quantity" 
                                                    id="quantitySelect" 
                                                    value={quantity} 
                                                    onChange={e => setQuantity(e.target.value)} 
                                                    min="1" 
                                                />
                                            </Col>
                                        </FormGroup>
                                        <Button color="primary" onClick={addToCart}>Add to Cart</Button>
                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CoffeeDetail;
