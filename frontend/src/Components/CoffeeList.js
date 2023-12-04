import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import NavBar from './Navbar';

const CoffeeList = () => {
    const [coffees, setCoffees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/coffee')
            .then(response =>  {
                setCoffees(response.data)
                console.log(response)
            })
            .catch(error => console.error('Error fetching coffees', error));
    }, []);

    const goToCoffeeDetail = (coffeeId) => {
        navigate(`/coffee/${coffeeId}`);
    };

    return (
        <Container>
            <NavBar />
            <Row>
                {coffees.map(coffee => (
                    <Col xs={6} key={coffee.coffeeId} className="mb-3 mt-5">
                        <Card
                            onClick={() => goToCoffeeDetail(coffee.coffeeId)}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center', // Center content horizontally
                                justifyContent: 'center', // Center content vertically
                                minHeight: '400px', // Set a minimum height for the card
                                padding: '20px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                                borderRadius: '10px', // Add rounded corners
                            }}
                        >
                            <CardImg
                                top
                                width="200px"
                                src={coffee.image}
                                alt={coffee.name}
                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                            <CardBody style={{ textAlign: 'center' }}>
                                <CardTitle tag="h2">{coffee.name}</CardTitle>
                                <CardText>{coffee.description}</CardText>
                                <CardText>Price: ${coffee.price}</CardText>
                                <CardText>Stock: {coffee.stock}</CardText>
                                <CardText>Size: {coffee.size}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CoffeeList;
