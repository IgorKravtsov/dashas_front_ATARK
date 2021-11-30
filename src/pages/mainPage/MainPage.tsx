import React, {ReactElement, useEffect} from 'react';
import styles from './mainPage.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Link} from "react-router-dom";
import {RouteNames} from "../../routes";
import {setError} from "../../store/actions/user/setError";
import Container from "../../components/container/Container";
import OfficesSection from "../../sections/officesSection/OfficesSection";
import {isObjectEmpty, getUserFromLocalstorage} from "../../util";
import {userSlice} from "../../store/slices";
import {getAllOffices} from "../../store/actions/office/getAllOffices";

const MainPage = (): ReactElement => {
    const {user, isAuth, error, isLoading} = useAppSelector(state => state.userReducer);
    const {offices} = useAppSelector(state => state.officeReducer);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(setError(''));
        if(!isObjectEmpty(user, 'id')) {
            const user = getUserFromLocalstorage();
            user && dispatch(userSlice.actions.setUser(user));
            if(offices.length === 0) {
                dispatch(getAllOffices());
            }
        }
    }, [])

    useEffect(() => {
        console.log(offices)
    }, [offices])

    // if(isLoading) {
    //     return <h1>LOADING....</h1>
    // }

    if(error !== '') {
        return <h1>{error}</h1>
    }

    return (
        <main className={styles.wrapper}>
            <Container>
                {isAuth ?
                    <OfficesSection />:
                    <h1 className={styles.notLoggedIn}>Please <Link to={RouteNames.LOGIN}>log in</Link> to use that application</h1>
                    }
            </Container>
        </main>
    );
};

export default MainPage;