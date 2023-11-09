import React from "react";
import carroImg from '../../assets/car.png';
import Image from 'react-bootstrap/Image';
import styles from "./index.module.css";

export default function Carro({ carro }) {
    return (
        <div className={styles.container}>
            <Image src={carroImg} thumbnail className={styles.carro} />
            <p className={styles.placa}>{carro.placa.toUpperCase()}</p>
            <p className={styles.horaEntrada}>{carro.horaEntrada}</p>
            <p className={styles.valorInicial}>{carro.valorInicial}</p>
            <p className={styles.valorHora}>{carro.valorHora}</p>
        </div>
    );
}