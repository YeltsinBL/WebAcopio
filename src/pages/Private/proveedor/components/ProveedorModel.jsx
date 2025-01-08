import { useEffect, useState } from "react"
import { proveedorSave } from "../../../../services/proveedor"
import { obtenerFechaLocal } from "../../../../utils"
import { ButtonCustom, FilterOption, Footer, FooterButton, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, TableBodyCustom, TableButton, TableContainerCustom, TableHeaderCustom, TableTd, TitleCustom } from "../../../../components/common"
import { Edit, Power, Trash2 } from "lucide-react"

export const ProveedorModel = ({ onShowModel, data }) => {
  const [id, setId] = useState('')
  const [ut, setUt] = useState('')

  const [proveedorPersonId, setProveedorPersonId] = useState('')
  const [personId, setPersonId] = useState('')
  const [dni, setDni] = useState('')
  const [nombre, setNombre] = useState('')
  const [apePat, setApePat] = useState('')
  const [apeMat, setApeMat] = useState('')
  const [activo, setActivo] = useState("Activo")
  const [errores, setErrores] = useState({})

  const [proveedoresList, setProveedoresList] = useState([])

  const headers= ['DNI', 'Nombre','Apellido Paterno','Apellido Materno','Estado', 'Acciones']
  useEffect(() => {
    console.log(data)
    if(data.proveedorId){
      setId(data.proveedorId || 0)
      setUt(data.proveedorUT || '')
      setActivo(data.proveedorStatus ? "Activo" : "Inactivo")
      setProveedoresList(data.proveedorPerson || [])
    }
  }, [data])

  const handleAgregarProveedor = (e) => {
    e.preventDefault()
    if (validarCampos(true)) {
      const isDuplicado = proveedoresList.some(
        (item) => dni !== '' && item.personDNI === dni && item.proveedorPersonId !== proveedorPersonId
      )
      if(isDuplicado) return setErrores({dni:"El DNI ya ha sido agregado a otro proveedor"})
      if(proveedorPersonId !== ''){
        const updatePlacaList = proveedoresList.map((item) => 
          item.proveedorPersonId === proveedorPersonId
          ? { ...item, personDNI: dni, personName: nombre, 
              personPaternalSurname: apePat, personMaternalSurname: apeMat}
          : item)
        setProveedoresList(updatePlacaList)
      }else{
        const updatePlacaList = [...proveedoresList, 
          { proveedorPersonId: proveedorPersonId==''?`temp-${Date.now()}`: proveedorPersonId,
            personId: personId==''?`temp-${Date.now()}`: personId,
            personDNI: dni,
            personName: nombre,
            personPaternalSurname: apePat,
            personMaternalSurname: apeMat,
            proveedorPersonStatus: true}]
          setProveedoresList(updatePlacaList)
      }

    }
    setProveedorPersonId('')
    setPersonId('')
    setDni('')
    setNombre('')
    setApePat('')
    setApeMat('')
  }
  const onRowSelect = (proveedor) => {
    setProveedorPersonId(proveedor.proveedorPersonId)
    setPersonId(proveedor.personId)
    setDni(proveedor.personDNI)
    setNombre(proveedor.personName)
    setApePat(proveedor.personPaternalSurname)
    setApeMat(proveedor.personMaternalSurname)
  }
  const onRowDelete = (proveedor) => {
    if (typeof proveedor.proveedorPersonId === "string" && proveedor.proveedorPersonId.startsWith("temp")) {
        // Eliminar si es un ID temporal
        setProveedoresList(proveedoresList.filter((item) => item.proveedorPersonId !== proveedor.proveedorPersonId));
      } else {
        // Cambiar estado si tiene un ID del backend
        setProveedoresList(
          proveedoresList.map((item) =>
            item.proveedorPersonId === proveedor.proveedorPersonId
              ? { ...item, proveedorPersonStatus: !item.proveedorPersonStatus }
              : item
          )
        )
      }
  }

  const validarCampos = (agregar) => {
    const nuevosErrores = {}
    if(agregar){
      if (!ut) nuevosErrores.ut = "El campo UT es obligatorio."
      if (!nombre) nuevosErrores.nombre = "El campo Nombre es obligatorio."
      if (!apePat) nuevosErrores.apePat = "El campo Apellido Paterno es obligatorio."
      if (!apeMat) nuevosErrores.apeMat = "El campo Apellido Materno es obligatorio."
    }else {
      if(proveedoresList.length === 0) nuevosErrores.proveedoresList = "Debe agregar al menos un proveedor."
    }
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos(false)) {
      const save ={
        proveedorUT: ut,
        proveedorPersons: reemplazarIdTemporal(proveedoresList)
      }
      if(id > 0) {
        save.proveedorId = id
        save.userModifiedName ="ADMIN"
        save.userModifiedAt = obtenerFechaLocal({date: new Date()})
        const proveedor = await proveedorSave('PUT',save)
        return onShowModel(proveedor)
      }
      save.userCreatedAt= obtenerFechaLocal({date: new Date()})
      save.userCreatedName= "ADMIN"
      const proveedor = await proveedorSave('POST',save)
      return onShowModel(proveedor)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({proveedorId:0})
  }
  const reemplazarIdTemporal = (data) => {
    return data.map((item) => ({
      ...item,
      proveedorPersonId: typeof item.proveedorPersonId === "string" && item.proveedorPersonId.startsWith("temp")
        ? 0 : item.proveedorPersonId,
        personId: typeof item.personId === "string" && item.personId.startsWith("temp")
        ? 0 : item.personId,
    }))
  }
  return (
    <>
      <SectionModel title={(data.id >0 ? 'Editar' : 'Registrar') + ' Proveedor'}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
          <FilterOption htmlFor={'ProveedorUTModal'} name={'UT'}>
            <InputTextCustom textValue={ut} valueError={errores.ut}
              placeholder={'Ingrese el código UT'} onChange={setUt}/>
            {errores.ut && <MessageValidationInput mensaje={errores.ut}/>}
          </FilterOption>
          <FilterOption htmlFor={'ProveedorEstadoModal'} name={'UT'}>
            <InputTextCustom textValue={activo} />
          </FilterOption>
        </div>
      </SectionModel>
      <TableContainerCustom>
        <TableHeaderCustom grid>
          <TitleCustom titulo={'Proveedores Asignados'}  />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
            <FilterOption htmlFor={'ProveedorDNIModal'} name={'DNI'}>
              <InputTextCustom textValue={dni} valueError={errores.dni}
                placeholder={'Ingrese el DNI'} onChange={setDni}/>
              {errores.dni && <MessageValidationInput mensaje={errores.dni}/>}
            </FilterOption>
            <FilterOption htmlFor={'ProveedorNombreModal'} name={'Nombre'}>
              <InputTextCustom textValue={nombre} valueError={errores.nombre}
                placeholder={'Ingrese el nombre'} onChange={setNombre}/>
              {errores.nombre && <MessageValidationInput mensaje={errores.nombre}/>}
            </FilterOption>
            <FilterOption htmlFor={'ProveedorApePatModal'} name={'Apellido Paterno'}>
              <InputTextCustom textValue={apePat} valueError={errores.apePat}
                placeholder={'Ingrese el Apellido Paterno'} onChange={setApePat}/>
              {errores.apePat && <MessageValidationInput mensaje={errores.apePat}/>}
            </FilterOption>
            <FilterOption htmlFor={'ProveedorApeMatModal'} name={'Apellido Materno'}>
              <InputTextCustom textValue={apeMat} valueError={errores.apeMat}
                placeholder={'Ingrese el Apellido Materno'} onChange={setApeMat}/>
              {errores.apeMat && <MessageValidationInput mensaje={errores.apeMat}/>}
            </FilterOption>
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} name={'Agregar'} onClick={handleAgregarProveedor} />
          </div>
        </TableHeaderCustom>
        <TableBodyCustom headers={headers}>
          {proveedoresList.length > 0 ? (
            proveedoresList.map((item) => (
              <tr key={item.id}>
                <TableTd hidden>{item.proveedorPersonId}</TableTd>
                <TableTd hidden>{item.proveedorId}</TableTd>
                <TableTd hidden>{item.personId}</TableTd>
                <TableTd>{item.personDNI}</TableTd>
                <TableTd>{item.personName}</TableTd>
                <TableTd>{item.personPaternalSurname}</TableTd>
                <TableTd>{item.personMaternalSurname}</TableTd>
                <TableTd>{item.proveedorPersonStatus ? 'Activo':'Inactivo'}</TableTd>
                <TableTd>
                  <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                    onRowSelect={()=>onRowSelect(item)}>
                    <Edit size={18} />
                  </TableButton>
                  <TableButton className={`${item.proveedorPersonStatus ? 'text-red-400 hover:text-red-300':'text-blue-400 hover:text-blue-300'} `}
                    onRowSelect={()=>onRowDelete(item)}>
                    {item.proveedorPersonStatus ?(
                        <Trash2 size={18} />
                    ):(
                        <Power size={18}/>
                    )}
                  </TableButton>
                </TableTd>
              </tr>
            )))
            :(<NoRegistros colSpan={headers.length} />)}
        </TableBodyCustom>
        {errores.proveedoresList && <MessageValidationInput mensaje={errores.proveedoresList}/>}
      </TableContainerCustom>      
      <Footer>
        <FooterButton accion={handleGuardar} name={'Guardar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
    </>
  )
}
