import { useEffect, useState } from "react";
import { ContainerPopupCustom, FilterOption, Footer, FooterButton, InputTextCustom, MessageValidationInput, SectionModel, SectionModelPopup, TableButton } from "../common";
import { Search } from "lucide-react";
import { obtenerFechaLocal } from "../../utils";
import { userSave } from "../../services/user";

export default function UserModel({onShowModel, data}) {
  const [userIdModel, setUserIdModel] = useState(0)
  const [personIdModel, setPersonIdModel] = useState(0)
  const [dniModel, setDniModel] = useState('')
  const [nameModel, setNameModel] = useState('')
  const [paternalModel, setPaternalModel] = useState('')
  const [maternoModel, setMaternoModel] = useState('')
  const [typePersonIdModel, setTypePersonIdModel] = useState('')
  const [userNameModel, setUserNameModel] = useState('')
  const [userPasswordModel, setUserPasswordModel] = useState('123')
  const [activo, setActivo] = useState("Activo")
  const [errores, setErrores] = useState({})

  useEffect(()=>{
    if(data){
      setUserIdModel(data.userId || 0)
      setPersonIdModel(data.personId || 0)
      setDniModel(data.personDNI || '')
      setNameModel(data.personName || '')
      setPaternalModel(data.personPaternalSurname || '')
      setMaternoModel(data.personMaternalSurname || '')
      setTypePersonIdModel(data.typePersonId || '')
      setUserNameModel(data.userName || '')
      setActivo(data.userStatus ? "Activo" : "Inactivo")
    }
    /*** "typePersonName": "string" */
  },[data])
  const validarCampos = () => {
    const nuevosErrores = {}
    if (!nameModel) nuevosErrores.nombre = "El campo Nombre es obligatorio."
    if (!paternalModel) nuevosErrores.apePat = "El campo Apellido Paterno es obligatorio."
    if (!maternoModel) nuevosErrores.apeMat = "El campo Apellido Materno es obligatorio."
    if (!typePersonIdModel) nuevosErrores.tipoPersonaId = "El campo Tipo Usuario es obligatorio."
    if (!userNameModel) nuevosErrores.userName = "El campo Usuario es obligatorio."
    if (userIdModel ==0 && !userPasswordModel) nuevosErrores.userPassword = "El campo Contraseña es obligatorio."
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async (e) =>{
    e.preventDefault()
    if(validarCampos()){
      let save = {
        personDNI: dniModel,
        personName: nameModel,
        personPaternalSurname: paternalModel,
        personMaternalSurname: maternoModel,
        typePersonId: typePersonIdModel        
      }
      if(userIdModel >0){
        save = {...save, userId: userIdModel, personId: personIdModel,
            userModifiedName: 'ADMIN', userModifiedAt: obtenerFechaLocal({date: new Date()})}
        const usuario = await userSave('PUT',save)
        return onShowModel(usuario)
      }
      save = {...save, 
        userName: userNameModel,
        userPassword: userPasswordModel,
        userCreatedName: 'ADMIN', userCreatedAt: obtenerFechaLocal({date: new Date()})}
      const usuario = await userSave('POST',save)
      return onShowModel(usuario)
    }
  }
  const handleCancelar = (e) =>{
    e.preventDefault()
    onShowModel({userId:0})
  }

  return (
    <ContainerPopupCustom>
      <SectionModelPopup title={'Registrar Usuario'} >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'TypePersonModel'} name={'Tipo Usuario'}>
              <InputTextCustom textValue={typePersonIdModel} valueError={errores.tipoPersonaId}
                placeholder="Selecciona" onChange={setTypePersonIdModel} />
              {errores.tipoPersonaId && <MessageValidationInput mensaje={errores.tipoPersonaId}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'DniModel'} name={'DNI'}>
              <InputTextCustom textValue={dniModel}
                placeholder="Ingrese el DNI (opcional)" onChange={setDniModel} />
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'NameModel'} name={'Nombre'}>
              <InputTextCustom textValue={nameModel} valueError={errores.nombre}
                placeholder="Ingrese el nombre" onChange={setNameModel} />
              {errores.nombre && <MessageValidationInput mensaje={errores.nombre}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'PaternoModel'} name={'Apellido Paterno'}>
              <InputTextCustom textValue={paternalModel} valueError={errores.apePat}
                placeholder="Ingrese el Apellido Paterno" onChange={setPaternalModel} />
              {errores.apePat && <MessageValidationInput mensaje={errores.apePat}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'MaternoModel'} name={'Apellido Materno'}>
              <InputTextCustom textValue={maternoModel} valueError={errores.apeMat}
                placeholder="Ingrese el Apellido Materno" onChange={setMaternoModel} />
              {errores.apeMat && <MessageValidationInput mensaje={errores.apeMat}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6 flex'>
            <FilterOption htmlFor={'UserNameModel'} name={'Usuario'}>
              <InputTextCustom textValue={userNameModel} valueError={errores.userName} 
                placeholder="Automático" onChange={setUserNameModel} />
              {errores.userName && <MessageValidationInput mensaje={errores.userName}/>}
            </FilterOption>
            <TableButton className={'text-blue-500 hover:text-blue-700 px-3 self-end pb-3'} 
		  	    >
                <Search size={18}/>
            </TableButton>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'PasswordModel'} name={'Contraseña'}>
              <InputTextCustom textValue={userPasswordModel} valueError={errores.userPassword}
                placeholder="Ingrese una contraseña" onChange={setUserPasswordModel} />
              {errores.userPassword && <MessageValidationInput mensaje={errores.userPassword}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
              <InputTextCustom textValue={activo} readOnly
                onChange={setActivo} />
            </FilterOption>
          </div>
        </div>
        <Footer>
          <FooterButton name={'Guardar'} accion={handleGuardar}/>
          <FooterButton name={'Cancelar'} accion={handleCancelar}/>
        </Footer>
      </SectionModelPopup>
    </ContainerPopupCustom>
  )
}