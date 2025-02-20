import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, FilterOption, InputTextCustom, MessageValidationInput, NoRegistros, 
  TableBodyCustom, TableButton, TableContainerCustom, TableFooterCustom, TableHeaderCustom, 
  TableTd, TitleCustom 
} from "~components/common"
import { useClienteInitialForm, useClienteValidation } from "../hooks"
import { clienteGetById, clienteSave } from "~services/cliente"
import { clienteAdapterSave } from "../adapter/ClienteAdapter"

export const ClienteTable = ({data, onSave, onDelete}) => {

  const {
    clienteId, clienteNombre, clienteDni, clienteApePaterno, clienteApeMaterno,
    setClienteId, setClienteNombre, setClienteDni, setClienteApePaterno,
    setClienteApeMaterno, header,
  } = useClienteInitialForm()
  const {validate, errores} = useClienteValidation()

  const handleCreateCliente = async(event) => {
    event.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const {isValid} = validate({clienteNombre})
    if(isValid){
      let dataAdapter = clienteAdapterSave({ 
        clienteId:0, clienteDni, clienteNombre, clienteApePaterno, clienteApeMaterno 
      })
      const response = await clienteSave('POST', dataAdapter)
      if(response.result === false) 
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      setClienteId(0)
      setClienteDni('')
      setClienteNombre('')
      setClienteApePaterno('')
      setClienteApeMaterno('')
      toast.success(response.message, {id: toastLoadingCustom})
      return onSave(response)
    }    
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleUpdatecliente = async(event) => {
    event.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const {isValid} = validate({clienteNombre})
    if(isValid){
      if(clienteId==0) return onSave({})
      let dataAdapter = clienteAdapterSave({
        clienteId, clienteDni, clienteNombre, clienteApePaterno, clienteApeMaterno 
      })
      const response = await clienteSave('PUT', dataAdapter)
      if(response.result === false) 
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      setClienteId(0)
      setClienteDni('')
      setClienteNombre('')
      setClienteApePaterno('')
      setClienteApeMaterno('')
      toast.success(response.message, {id: toastLoadingCustom})
      return onSave(response)
    }    
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const onRowSelect = async(rowData) =>{
    if(rowData.clienteId){
      const toastLoadingCustom = toast.loading('Cargando...')
      const response = await clienteGetById({id:rowData.clienteId})
      if(response.result === false)
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      setClienteId(response.data.clienteId)
      setClienteDni(response.data.clienteDni)
      setClienteNombre(response.data.clienteNombre)
      setClienteApePaterno(response.data.clienteApellidoPaterno)
      setClienteApeMaterno(response.data.clienteApellidoMaterno)
      toast.success(response.message, {id: toastLoadingCustom})
    }
  }
  return (
    <TableContainerCustom>
      <TableHeaderCustom grid>
        <TitleCustom titulo={'Lista de Clientes'} />
        <TableFooterCustom>
          <FilterOption htmlFor={'DniForm'} name={'DNI'}>
            <InputTextCustom placeholder="Ingrese el DNI"
              textValue={clienteDni} onChange={setClienteDni}/>
          </FilterOption>
          <FilterOption htmlFor={'NameForm'} name={'Nombre'}>
            <InputTextCustom placeholder="Ingrese el nombre" valueError={errores.nombre}
              textValue={clienteNombre} onChange={setClienteNombre}/>
            {errores.nombre && <MessageValidationInput mensaje={errores.nombre}/> }
          </FilterOption>
          <FilterOption htmlFor={'PaternoForm'} name={'Ape. Paterno'}>
            <InputTextCustom placeholder="Ingrese el apellido paterno"
              textValue={clienteApePaterno} onChange={setClienteApePaterno}/>
          </FilterOption>
          <FilterOption htmlFor={'MaternoForm'} name={'Ape. Materno'}>
            <InputTextCustom placeholder="Ingrese el apellido materno"
              textValue={clienteApeMaterno} onChange={setClienteApeMaterno}/>
          </FilterOption>
          <div className="grid grid-cols-1 md:flex md:gap-4">
          <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Agregar'} 
            onClick={handleCreateCliente} />
          {clienteId>0 && (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Actualizar'} 
            onClick={handleUpdatecliente} />
          )}
          </div>
        </TableFooterCustom>
      </TableHeaderCustom>
      <TableBodyCustom headers={header}>
        {data.length >0 ?
          data.map((user) =>(
          <tr key={user.clienteId}>
          <TableTd hidden>{user.clienteId}</TableTd>
          <TableTd>{user.clienteDni}</TableTd>
          <TableTd>{user.clienteNombre}</TableTd>
          <TableTd>{user.clienteStatus}</TableTd>
          <TableTd>
          <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
              onRowSelect={()=>onRowSelect(user)}>
              <Edit size={18} />
          </TableButton>
          { user.clienteStatus =='Activo' && (
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