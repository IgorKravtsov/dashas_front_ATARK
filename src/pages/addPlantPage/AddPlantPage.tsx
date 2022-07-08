import React, { ChangeEvent, FormEvent, memo, ReactElement, useEffect, useState } from 'react'
import Form from '../../components/form/Form'
import styles from '../editPlantPage/editPlantPage.module.scss'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import useInput from '../../hooks/useInput'
import { useAppSelector } from '../../hooks/redux'
import Select from '../../components/select/Select'
import cn from 'classnames'
import { FertiliserCreateDTO } from '../../models/DTOs/fertiliserCreateDTO'
import { PlantCreateDTO } from '../../models/DTOs/plantCreateDTO'
import { PlantService } from '../../services/plantService'
import Message from '../../components/message/Message'
import { useParams } from 'react-router-dom'

const AddPlantPage = () => {
  const { user } = useAppSelector(state => state.userReducer)
  const { curOfficeId, offices } = useAppSelector(state => state.officeReducer)
  const { fertilisers } = useAppSelector(state => state.fertiliserReducer)

  const params = useParams()
  console.log(params.officeId)

  const name = useInput(''),
    wateringQuantity = useInput(''),
    periodOfWatering = useInput(''),
    pruningPeriod = useInput('')

  const [choosedFertilisers, setChoosedFertilisers] = useState<number[]>([])
  const [choosedOfficeId, setChoosedOfficeId] = useState<number>(Number(params.officeId) || 0)
  const [fertiliserToSend, setFertiliserToSend] = useState<FertiliserCreateDTO[]>([
    { fertiliserQuantity: 1, periodOfFertilising: 1, id: 0 },
    { fertiliserQuantity: 1, periodOfFertilising: 1, id: 0 },
  ])
  const [fertiliserSelects, setFertiliserSelects] = useState<ReactElement[]>([])
  const [isVisibleMessage, setIsVisibleMessage] = useState(false)

  console.log(user)

  const sendInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('choosedOfficeId', choosedOfficeId)

    const plantInfoToSend: PlantCreateDTO = {
      name: name.value,
      wateringQuantity: parseInt(wateringQuantity.value),
      pruningPeriod: parseInt(pruningPeriod.value),
      userId: user.id,
      officeId: choosedOfficeId,
      periodOfWatering: periodOfWatering.value,
      fertilisers: getFertilisers(),
    }
    try {
      await PlantService.create(plantInfoToSend)
      setIsVisibleMessage(true)
      setTimeout(() => setIsVisibleMessage(false), 5000)
    } catch (e) {
      console.log(e)
    }
    // console.log("plantInfoToSend...", plantInfoToSend);
  }

  const addFertiliser = (index: number) => {
    if (fertiliserSelects.length === fertilisers.length) return
    console.log('index', index)
    const fertiliserSelectsCopy = [...fertiliserSelects]
    // console.log("fertiliserToSend[index]",fertiliserToSend[index])
    fertiliserSelectsCopy.push(
      <div className={styles.fertiliser_select_inputs_container}>
        <Select
          label='Fertilisers of the plant...'
          allData={fertilisers}
          dataKey={'id'}
          defaultValue={fertilisers[index].id}
          dataValue={'name'}
          onChange={changeFertiliser}
        />
        {/*<Input*/}
        {/*    onChange={(e) => changeFertiliserToSend(e, index)}*/}
        {/*    name="fertiliserQuantity" type='number'*/}
        {/*    min={1}*/}
        {/*    value={fertiliserToSend[index].fertiliserQuantity}*/}
        {/*    label="fertiliser quantity..." />*/}
        {/*<Input*/}
        {/*    onChange={(e) => changeFertiliserToSend(e, index)}*/}
        {/*    name="periodOfFertilising"*/}
        {/*    type='number'*/}
        {/*    min={1}*/}
        {/*    value={fertiliserToSend[index].periodOfFertilising}*/}
        {/*    label="period of fertilising..." />*/}
      </div>
    )
    setFertiliserSelects(fertiliserSelectsCopy)
  }

  const changeFertiliser = (e: ChangeEvent<HTMLSelectElement>) => {
    const copyChoosedFertilisers = [...choosedFertilisers]
    const fertiliserId = parseInt(e.target.value)
    if (!copyChoosedFertilisers.includes(fertiliserId)) {
      copyChoosedFertilisers.push(fertiliserId)
    }
    setChoosedFertilisers(copyChoosedFertilisers)
  }

  const changeOfficeId = (e: ChangeEvent<HTMLSelectElement>) => {
    setChoosedOfficeId(parseInt(e.target.value))
    console.log(e.target.value)
  }

  const changeFertiliserToSend = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const copy = [...fertiliserToSend]
    // @ts-ignore
    console.log('[e.target.name]', [e.target.name])
    // @ts-ignore
    copy[index][e.target.name] = e.target.value
    setFertiliserToSend(copy)
    console.log(copy)
  }

  const getFertilisers = (): FertiliserCreateDTO[] => {
    return choosedFertilisers.map(fertiliserId => ({ fertiliserQuantity: 100, periodOfFertilising: 100, id: fertiliserId }))
  }

  return (
    <main className={styles.wrapper}>
      <Message isVisible={isVisibleMessage} message='Plant successfully added' />
      <Form classes={styles.form} onSubmit={sendInfo}>
        <Input {...name} label={'Name of the plant...'} required />
        <Input {...wateringQuantity} min={0} type={'number'} label='Watering quantity per minute...' required />
        <Input {...periodOfWatering} min={0} type={'number'} label='Period of watering in minutes...' required />
        <Input {...pruningPeriod} min={0} type={'number'} label='Period of pruning in days...' required />

        <Select
          label='Office of the plant...'
          allData={offices}
          dataKey={'id'}
          defaultValue={curOfficeId ? curOfficeId : ''}
          dataValue={'address'}
          onChange={changeOfficeId}
        />
        <div className={styles.fertilisers_wrapper}>
          <h5 className={styles.fertilisers_title}>Fertilisers</h5>
          {fertiliserSelects}

          <div
            className={cn(styles.btn, { [styles.btn_disabled]: fertiliserSelects.length === fertilisers.length })}
            // disabled={fertiliserSelects.length === fertilisers.length}
            onClick={() => addFertiliser(fertiliserSelects.length)}
          >
            ADD
          </div>
        </div>
        {/*<Button>{checkObjectNotEmpty(plant, 'id') ? "Edit Plant" : "Add Plant"}</Button>*/}
        <Button classes={[styles.btn, styles.btn_save].join(' ')}>SAVE</Button>
      </Form>
    </main>
  )
}

export default memo(AddPlantPage)
