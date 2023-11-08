import React, { useState, useEffect } from "react";
import logo from '../../assets/park.png';
import { Alert, Button, Image, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import styles from "./index.module.css";
import { v4 as uuidv4 } from 'uuid';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import ReactLoading from 'react-loading';

import Carro from "../carro";

export default function Portaria() {
    const [placa, setPlaca] = useState("");
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirAlerta, setAbrirAlerta] = useState(false);
    const [horaEntrada, setHoraEntrada] = useState('10:00');

    useEffect(() => {
        async function carregarEstacionamento() {
            const response = await api.get('listar-veiculos');
            setCarros(response.data)
            setLoading(false);
        }

        carregarEstacionamento();
    }, []);

    function entrarCarro() {
        if (placa === '') {
            setAbrirAlerta(true);
            return;
        }
        let myuuid = uuidv4();
        setCarros([...carros, { id: myuuid, placa: placa }]);
        setPlaca("");
        setAbrirModal(false);
    }

    const estacionamento = carros.map((carro) =>
        <Col key={carro.id} sm={4} md={2}>
            <Carro data={carro.placa} />
        </Col>
    );
    return (
        <Container>
            <Row>
                <Col>
                    <Image src={logo} rounded className={styles.img} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="success" onClick={() => setAbrirModal(true)}>
                        Estacionar
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mt-3">
                    <h4>Total carros estacionados: {carros.length}</h4>
                </Col>
            </Row>
            <Row>
                {estacionamento}
            </Row>

            <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Portaria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert show={abrirAlerta} onClose={() => setAbrirAlerta(false)} variant="danger" dismissible>
                        A Placa não foi preenchida!
                    </Alert>
                    <Form>
                        <Form.Group className="mb-3" controlId="carro.Placa">
                            <Form.Label>Placa do Carro</Form.Label>
                            <Form.Control type="text" placeholder="FBR2A23" maxLength={7} onChange={e => setPlaca(e.target.value)} />
                        </Form.Group>
                        <Form.Label className="mb-12">Horário Entrada</Form.Label>
                        <br />
                        <TimePicker className="mb-3" onChange={setHoraEntrada} value={horaEntrada} disableClock={true} locale="pt-BR" amPmAriaLabel="sdsds" />                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAbrirModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={entrarCarro}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}