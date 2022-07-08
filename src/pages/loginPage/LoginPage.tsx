import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './loginPage.module.scss'
import Input from '../../components/input/Input'
import useInput from '../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { login } from '../../store/actions/user/login'
import Button from '../../components/button/Button'
import Form from '../../components/form/Form'
import ErrorMessage from '../../components/errorMessage/ErrorMessage'
import { Link, useNavigate } from 'react-router-dom'
import { RouteNames } from '../../routes'

const LoginPage = () => {
  const [clicked, setClicked] = useState(false)

  const email = useInput('')
  const password = useInput('')
  const dispatch = useAppDispatch()
  const { error, isLoading, user } = useAppSelector(state => state.userReducer)
  const navigate = useNavigate()

  useEffect(() => {
    if (clicked && error === '') {
      navigate(RouteNames.MAIN)
    }
  }, [user])

  const loginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(email.value, password.value))
    setClicked(true)
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>LOGIN</h1>
      <Form classes={styles.form} onSubmit={loginUser}>
        <Input classes={styles.input} {...email} type='email' placeholder='Email...' required />
        <Input classes={styles.input} {...password} type='password' placeholder='Password...' required />
        <ErrorMessage isVisible={error !== ''}>{error}</ErrorMessage>
        <Button classes={styles.btn} disabled={isLoading}>
          SEND
        </Button>
        <Link className={styles.link} to={RouteNames.REGISTER}>
          Еще нет аккаунта? - Зарегистрируйтесь!
        </Link>
      </Form>
    </main>
  )
}

export default LoginPage
