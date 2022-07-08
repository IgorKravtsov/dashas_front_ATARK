import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from 'react'
import styles from './editPlantPage.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useInput from '../../hooks/useInput'
import Input from '../../components/input/Input'
import Form from '../../components/form/Form'
import { IPlant } from '../../models/IPlant'
import Button from '../../components/button/Button'
import { isObjectEmpty } from '../../util'
import { useNavigate, useParams } from 'react-router-dom'
import { UserRoles } from '../../models/userRoles'
import Select from '../../components/select/Select'
import cn from 'classnames'
import { PlantCreateDTO } from '../../models/DTOs/plantCreateDTO'
import { PlantService } from '../../services/plantService'
import Message from '../../components/message/Message'

const EditPlantPage: FC = (): ReactElement => {
  const { plant } = useAppSelector(state => state.plantReducer)
  const { user } = useAppSelector(state => state.userReducer)
  const { fertilisers } = useAppSelector(state => state.fertiliserReducer)

  const params = useParams()

  const [formValues, setFormValues] = useState(plant)
  const [isVisibleMessage, setIsVisibleMessage] = useState(false)

  const navigate = useNavigate()
  const name = useInput(plant.name || ''),
    wateringQuantity = useInput(plant.wateringQuantity.toString() || ''),
    periodOfWatering = useInput(plant.periodOfWatering || ''),
    pruningPeriod = useInput(plant.pruningPeriod.toString() || ''),
    plantingDate = useInput(plant.plantingDate.toString() || '')

  useEffect(() => {
    console.log(plant)
    if (!isObjectEmpty(plant, 'id')) {
      navigate(-1)
    }
  }, [])

  const maxDate = new Date()

  const sendInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const plantInfoToSend: IPlant = {
      ...formValues,
      // name: name.value,
      // plantingDate: new Date(plantingDate.value),
    }
    console.log('plantInfoToSend...', plantInfoToSend)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const copyFormValues = { ...formValues }
    // @ts-ignore
    copyFormValues[name] = e.target.value
    setFormValues(copyFormValues)
  }

  const onChangeSelect = (selectId: number, index: number) => {
    console.log('selectId', selectId)
    console.log('index', index)
    const copyFormValues = { ...formValues }
    if (copyFormValues.fertilisers) {
      console.log(copyFormValues.fertilisers[index].fertiliserId)
      // copyFormValues.fertilisers[index].fertiliserId = selectId;
    }
    setFormValues(copyFormValues)
  }

  const getType = (type: any): string => {
    console.log(type)
    return type
  }

  const updateOne = async (plantId: number) => {
    const request: PlantCreateDTO = {
      name: name.value,
      wateringQuantity: +wateringQuantity.value,
      periodOfWatering: periodOfWatering.value,
      pruningPeriod: +pruningPeriod.value,
      //   plantingDate: plant.plantingDate,
      officeId: Number(params.officeId) || 0,
      userId: user.id || 0,
    }
    try {
      await PlantService.updateOne(plantId, request)
      setIsVisibleMessage(true)
      setTimeout(() => setIsVisibleMessage(false), 5000)
    } catch (e) {
      console.log(e)
    }
  }

  // const getRenderInputs = (): ReactElement[] => {
  //     let renderItems: ReactElement[] = [];
  //     for(const key in formValues) {
  //         if (key !== 'id' &&
  //             key !== 'fertilisers' &&
  //             key !== 'userId' &&
  //             key !== 'officeId' &&
  //             key !== 'lastPruningDate' &&
  //             key !== 'lastWateringTime' &&
  //             key !== 'plantingDate' &&
  //             key !== 'updatedAt' &&
  //             key !== 'createdAt'
  //         ) {
  //             renderItems.push(<Input
  //                 // @ts-ignore
  //                 value={formValues[key]}
  //                 label={key}
  //                 onChange={(e) => onChange(e, key)}
  //             />)
  //         }
  //          if (key === 'fertilisers') {
  //             // @ts-ignore
  //             const selects = formValues[key].filter(fertiliserInNowPlant =>
  //                 fertilisers.filter(fertiliserInDatabase => fertiliserInNowPlant.fertiliserId === fertiliserInDatabase.id))
  //             // renderItems.push(<Select allFertilisers={fertilisers}/>)
  //             const selectsToRender = selects.map(select =>
  //                 <Select
  //                     onChange={onChangeSelect}
  //                     fertiliserPlant={select}
  //                     allFertilisers={fertilisers}
  //                 />)
  //             // @ts-ignore
  //             renderItems.push(selectsToRender)
  //             renderItems.push(<Button classes={cn(styles.btn_add, {
  //                 [styles.btn_disabled]: selects.length === fertilisers.length,
  //             })} disabled={selects.length === fertilisers.length}>ADD</Button>)
  //         }
  //     }
  //     return renderItems;
  // }

  return (
    <main>
      <Message isVisible={isVisibleMessage} message='Plant successfully updated' />
      <Form classes={styles.form} onSubmit={sendInfo}>
        <Input {...name} label={'Name of the plant...'} required />
        <Input {...wateringQuantity} min={0} type={'number'} label='Watering quantity per minute...' required />
        <Input {...periodOfWatering} min={0} type={'number'} label='Period of watering in minutes...' required />
        <Input {...pruningPeriod} min={0} type={'number'} label='Period of pruning in days...' required />

        {/* <Select
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
        </div> */}
        {/*<Button>{checkObjectNotEmpty(plant, 'id') ? "Edit Plant" : "Add Plant"}</Button>*/}
        <Button classes={[styles.btn, styles.btn_save].join(' ')} onClick={() => updateOne(Number(params.plantId) || 0)}>
          SAVE
        </Button>
      </Form>
    </main>
  )
}

export default EditPlantPage
