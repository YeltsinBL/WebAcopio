import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, FilterOption, InputTextCustom, MessageValidationInput, 
  NoRegistros, TableBodyCustom, TableButton, TableContainerCustom, 
  TableFooterCustom, TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { useInitialDistribuidor, useValidationDistribuidor } from "../hooks"
import { distribuidorGetById, distribuidorSave } from "~services/distribuidor"
import { distribuidorAdapterSave } from "../adapter/DistribuidorAdapter"

export const DistribuidorTable = ({data, onSave, onDelete}) => {
  const header = ['RUC','Distribuidor', 'Activo', 'Acciones']
  const {
    distribuidorId, distribuidorNombre, distribuidorRuc, 
    setDistribuidorId, setDistribuidorNombre, setDistribuidorRuc
  } = useInitialDistribuidor()
  const {validate, errores} = useValidationDistribuidor()

  const handleCreateDistribuidor = async(event) => {
    event.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const {isValid} = validate({distribuidorRuc, distribuidorNombre})
    if(isValid){
      let dataAdapter = distribuidorAdapterSave({ distribuidorId:0, distribuidorRuc, distribuidorNombre })
      const response = await distribuidorSave('POST', dataAdapter)
      if(response.result === false) 
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      setDistribuidorId(0)
      setDistribuidorNombre('')
      setDistribuidorRuc('')
      toast.success(response.message, {id: toastLoadingCustom})
      return onSave(response)
    }    
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleUpdateDistribuidor = async(event) => {
    event.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const {isValid} = validate({distribuidorRuc, distribuidorNombre})
    if(isValid){
      if(distribuidorId==0) return onSave({})
      let dataAdapter = distribuidorAdapterSave({
        distribuidorId, distribuidorRuc, distribuidorNombre
      })
      const response = await distribuidorSave('PUT', dataAdapter)
      if(response.result === false) 
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      setDistribuidorId(0)
      setDistribuidorNombre('')
      setDistribuidorRuc('')
      toast.success(response.message, {id: toastLoadingCustom})
      return onSave(response)
    }    
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const onRowSelect = async(rowData) =>{
    if(rowData.distribuidorId){
      const toastLoadingCustom = toast.loading('Cargando...')
      const response = await distribuidorGetById({id:rowData.distribuidorId})
      if(response.result === false)
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      setDistribuidorId(response.data.distribuidorId)
      setDistribuidorNombre(response.data.distribuidorNombre)
      setDistribuidorRuc(response.data.distribuidorRuc)
      toast.success(response.message, {id: toastLoadingCustom})
    }
  }

  return (
    <TableContainerCustom>
      <TableHeaderCustom grid>
        <TitleCustom titulo={'Lista de Distribuidores'} />
        <TableFooterCustom>
          <FilterOption htmlFor={'RucForm'} name={'RUC'}>
            <InputTextCustom placeholder="Ingrese el RUC" valueError={errores.ruc}
              textValue={distribuidorRuc} onChange={setDistribuidorRuc}/>
            {errores.ruc && <MessageValidationInput mensaje={errores.ruc}/> }
          </FilterOption>
          <FilterOption htmlFor={'NameForm'} name={'Nombre'}>
            <InputTextCustom placeholder="Ingrese el nombre" valueError={errores.nombre}
              textValue={distribuidorNombre} onChange={setDistribuidorNombre}/>
            {errores.nombre && <MessageValidationInput mensaje={errores.nombre}/> }
          </FilterOption>
          <div className="grid grid-cols-1 md:flex md:gap-4">
          <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Agregar'} 
            onClick={handleCreateDistribuidor} />
          {distribuidorId>0 && (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Actualizar'} 
            onClick={handleUpdateDistribuidor} />
          )}
          </div>
        </TableFooterCustom>
      </TableHeaderCustom>
      <TableBodyCustom headers={header}>
        {data.length >0 ?
          data.map((user) =>(
          <tr key={user.distribuidorId}>
          <TableTd hidden>{user.distribuidorId}</TableTd>
          <TableTd>{user.distribuidorRuc}</TableTd>
          <TableTd>{user.distribuidorNombre}</TableTd>
          <TableTd>{user.distribuidorStatus ? 'Activo':'Inactivo'}</TableTd>
          <TableTd>
          <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
              onRowSelect={()=>onRowSelect(user)}>
              <Edit size={18} />
          </TableButton>
          { user.distribuidorStatus && (
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