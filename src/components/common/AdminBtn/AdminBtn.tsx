import React, {SyntheticEvent} from 'react';
import {Link} from 'react-router-dom';
import {ProductEntity} from 'types';
import './AdminBtn.css';

interface Props {
    text: string;
    to?: string;
    onClick?:
        (() => void)
        | ((e: SyntheticEvent) => Promise<void>)
        | ((e: SyntheticEvent) => Promise<null | undefined>);
    product?: ProductEntity;
}

export const AdminBtn = (props: Props) => (
    props.to
        ? <Link to={props.to}>
            <button onClick={props.onClick}>{props.text}</button>
        </Link>
        : <button onClick={props.onClick}>{props.text}</button>
)