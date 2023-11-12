import React from "react";
import { Col } from 'react-bootstrap';
import Carro from "../carro";

export default function Estacionamento({ carros }) {
    console.log(carros);
    const estacionamento = carros.map((carro) =>
        <Col key={carro.id} sm={4} md={2}>
            <Carro carro={carro} />
        </Col>
    );

    return estacionamento;
}