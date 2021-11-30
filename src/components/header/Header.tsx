import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../routes';
import Container from '../container/Container';
import styles from './header.module.scss';
import logo from './img/logo.svg';
import unregisteredUser from './img/user_unregistered.png';

export interface HeaderProps {

}

const Header:FC<HeaderProps> = () => {
    return (
        <header className={styles.header}>
            <Container>

                <ul className={styles.wrapper}>
                    <li>
                        <Link to={RouteNames.MAIN}>
                            <img className={styles.logo} src={logo} alt="LOGO"/>
                        </Link>
                    </li>
                    
                    <li className={styles.cabinet}>
                        <Link to={RouteNames.LOGIN}>
                            <img className={styles.user} src={unregisteredUser} alt="USER CABINET"/>
                        </Link>
                    </li>
                </ul> 

            </Container>
        </header>
    );
};

export default Header;