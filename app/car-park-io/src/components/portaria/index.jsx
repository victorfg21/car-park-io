import React, { useState, useEffect } from "react";
import logo from '../../assets/park.png';
import { Alert, Button, Image, Col, Container, Row, Modal, Form, FloatingLabel } from 'react-bootstrap';
import styles from "./index.module.css";
import { v4 as uuidv4 } from 'uuid';
import ReactLoading from 'react-loading';
import { IMaskInput } from "react-imask";
import api from "../../services/api"
import Estacionamento from "../estacionamento";

export default function Portaria() {
    const [placa, setPlaca] = useState("");
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirAlerta, setAbrirAlerta] = useState(false);
    const [valorInicial, setValorInicial] = useState("");
    const [valorHora, setValorHora] = useState("");
    const [horaEntrada, setHoraEntrada] = useState("");

    useEffect(() => {
        async function carregarEstacionamento() {
            const response = await api.get('listar-veiculos',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    }
                });
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
        setCarros([...carros, { id: myuuid, placa, horaEntrada, valorInicial, valorHora }]);
        setPlaca("");
        setValorInicial("");
        setValorHora("");
        setHoraEntrada("");
        setAbrirModal(false);
    }

    const maskMoeda = [
        {
            mask: 'R$ num',
            blocks: {
                num: {
                    mask: Number,
                    max: 99,
                    thousandsSeparator: '.',
                    scale: 2,
                    padFractionalZeros: true,
                    normalizeZeros: true,
                }
            }
        }
    ];

    if (loading) return (<ReactLoading type="spinningBubbles" color="#000" height={30} width={100} />)
    else
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
                    <Estacionamento carros={carros} />
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
                            <FloatingLabel controlId="floatingPlaca" label="Placa do Carro" className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="FBR2A23"
                                    maxLength={7}
                                    onChange={e => setPlaca(e.target.value.toString().toUpperCase())}
                                    className="text-uppercase" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingValorInicial" label="Valor Inicial" className="mt-3">
                                <Form.Control
                                    type="text"
                                    as={IMaskInput}
                                    mask={maskMoeda}
                                    onAccept={valor => setValorInicial(valor)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingValorHora" label="Valor P/Hora" className="mt-3">
                                <Form.Control
                                    type="text"
                                    as={IMaskInput}
                                    mask={maskMoeda}
                                    onChange={valor => setValorHora(valor)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingValorEntrada" label="Horário Entrada" className="mt-3">
                                <Form.Control type="time" onChange={e => setHoraEntrada(e.target.value)} />
                            </FloatingLabel>
                        </Form>
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