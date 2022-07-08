import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './registerPage.module.scss'
import Form from '../../components/form/Form'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { register } from '../../store/actions/user/register'
import Input from '../../components/input/Input'
import ErrorMessage from '../../components/errorMessage/ErrorMessage'
import Button from '../../components/button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { RouteNames } from '../../routes'
import useInput from '../../hooks/useInput'
import { UserRoles } from '../../models/userRoles'
import Message from '../../components/message/Message'
import { login } from '../../store/actions/user/login'
import Select from '../../components/select/Select'
import { getAllOffices } from '../../store/actions/office/getAllOffices'

const RegisterPage = () => {
  const [clicked, setClicked] = useState(false)

  const dispatch = useAppDispatch()
  const { error, isLoading, user } = useAppSelector(state => state.userReducer)
  const navigate = useNavigate()

  const email = useInput('')
  const password = useInput('')
  const confirmPassword = useInput('')
  const { offices, isLoading: officesLoading, error: officesError } = useAppSelector(state => state.officeReducer)

  useEffect(() => {
    if (clicked && error === '') {
      navigate(RouteNames.MAIN)
    }
  }, [user])

  useEffect(() => {
    dispatch(getAllOffices())
  }, [])

  const [userOffice, setUserOffice] = useState<number>(0)

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email.value, password.value, UserRoles.ADMIN)
    dispatch(register(email.value, password.value, UserRoles.ADMIN, userOffice))
    setClicked(true)
  }

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserOffice(parseInt(e.target.value))
  }

  if (officesLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>REGISTER</h1>
      <Form classes={styles.form} onSubmit={registerUser}>
        <Input classes={styles.input} {...email} type='email' placeholder='Email...' required />
        <Input classes={styles.input} {...password} type='password' placeholder='Password...' required />
        <Input classes={styles.input} {...confirmPassword} type='password' placeholder='Confirm password...' required />
        <ErrorMessage classes={styles.error} isVisible={error !== ''}>
          {error}
        </ErrorMessage>
        <Select allData={offices} dataKey={'id'} dataValue={'address'} defaultValue={offices[0].id} onChange={onChangeSelect} />
        <Button classes={styles.btn} disabled={isLoading}>
          REGISTER
        </Button>
        <Link className={styles.link} to={RouteNames.LOGIN}>
          Уже есть аккаунт? - Войдите!
        </Link>
      </Form>
    </main>
  )
}

export default RegisterPage
