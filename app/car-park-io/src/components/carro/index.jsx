import React from "react";
import carro from '../../assets/car.png';
import Image from 'react-bootstrap/Image';
import styles from "./index.module.css";

export default function Carro(props) {
    return (
        <div className={styles.container}>
            <Image src={carro} thumbnail className={styles.carro} />
            <p className={styles.placa}>{props.data.toUpperCase()}</p>
        </div>
    );
}