import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import { ButtonCustom, FilterOption, InputTextCustom, MessageValidationInput, NoRegistros,
  TableBodyCustom, TableButton, TableContainerCustom,
  TableFooterCustom, TableHeaderCustom, TableTd, TitleCustom
} from "../../../../components/common"
import { obtenerFechaLocal } from "../../../../utils"
import { typeUserGetById, typeUserSave } from "../../../../services/tipousuario"

export const TipoUsuarioTable = ({data, onSave, onDelete}) => {
  const header = ['Tipo Usuario', 'Activo', 'Acciones']
  const [tipoUsuarioId, setTipoUsuarioId] = useState(0)  
  const [nameModel, setNameModel] = useState('')
  const [errores, setErrores] = useState({})

  const validarCampos = () => {
    const nuevosErrores = {}
    if(!nameModel) nuevosErrores.nombre = "La campo NOMBRE es obligatorio."
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0
  }
  const handleAgregarTipoUsuario = async(event) => {
    event.preventDefault()
    if(validarCampos()){
      let save = {tipoUsuarioNombre:nameModel}
      save = {...save,
        userCreatedAt: obtenerFechaLocal({date: new Date()}),
        userCreatedName: 'ADMIN'        
      }
      const tipo = await typeUserSave('POST', save)
      setTipoUsuarioId(0)
      setNameModel('')
      return onSave(tipo)
    }
  }
  const handleActualizarTipoUsuario = async(event) => {
    event.preventDefault()
    if(validarCampos()){
      let save = {tipoUsuarioNombre:nameModel}
      if(tipoUsuarioId==0) return onSave({})
      save = {...save, tipoUsuarioId,
        userModifiedAt: obtenerFechaLocal({date: new Date()}),
        userModifiedName: 'ADMIN'
      }
      const tipo = await typeUserSave('PUT', save)
      setTipoUsuarioId(0)
      setNameModel('')
      return onSave(tipo)
    }
  }
  
  const onRowSelect = async(rowData) =>{
    if(rowData.tipoUsuarioId){
      const user = await typeUserGetById({id:rowData.tipoUsuarioId})
      setTipoUsuarioId(user.tipoUsuarioId)
      setNameModel(user.tipoUsuarioNombre)
    }
  }
  return (
    <TableContainerCustom>
      <TableHeaderCustom grid>
        <TitleCustom titulo={'Lista de Tipo de Usuario'} />
        <TableFooterCustom>
          <FilterOption htmlFor={'NameFilter'} name={'Nombre'}>
            <InputTextCustom placeholder="Ingrese el nombre" 
              textValue={nameModel} onChange={setNameModel}/>
            {errores.nombre && <MessageValidationInput mensaje={errores.nombre}/> }
          </FilterOption>
          <div className="grid grid-cols-1 md:flex md:gap-4">
          <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Agregar'} 
            onClick={handleAgregarTipoUsuario} />
          {tipoUsuarioId>0 && (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Actualizar'} 
            onClick={handleActualizarTipoUsuario} />
          )}
          </div>
        </TableFooterCustom>
      </TableHeaderCustom>
      <TableBodyCustom headers={header}>
        {data.length >0 ?
          data.map((user) =>(
          <tr key={user.tipoUsuarioId}>
          <TableTd hidden>{user.tipoUsuarioId}</TableTd>
          <TableTd>{user.tipoUsuarioNombre}</TableTd>
          <TableTd>{user.tipoUsuarioEstado ? 'Activo':'Inactivo'}</TableTd>
          <TableTd>
          <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
              onRowSelect={()=>onRowSelect(user)}>
              <Edit size={18} />
          </TableButton>
          { user.tipoUsuarioEstado && (
          <TableButton className={'text-red-400 hover:text-red-300 '} 
              onRowSelect={()=>onDelete(user)}>
              <Trash2 size={18} />
          </TableButton>
          )}
          </TableTd>
          </tr>
          )):( <NoRegistros colSpan={header.length}/>)
        }        
      </TableBodyCustom>
    </TableContainerCustom>
  )
}