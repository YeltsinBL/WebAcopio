import { 
  InputDateCustom, FilterOption, Footer, FooterButton, SectionModel, 
  InputDecimalCustom, InputTextCustom
} from '../../../../components/common'
import { 
  useCalcularRecojoTotal, useInitialRecojoModal, useValidateRecojoModal
} from '../hooks'
import { recojoSave } from '../../../../services/recojo'
import { 
  convertirFechaDDMMYYYY, obtenerFechaLocal 
} from '../../../../utils'

export const RecojoModal = ({onShowModel, data}) => {
  /**Custom Hooks**/
  const {
    recojoId, fechaInicioModel, fechaFinModel,
    cantidadCamionModel,
    precioCamionModel, cantidadDiasModel,
    precioDiasModel, recojoEstado,campoModel,
    setFechaInicioModel, setFechaFinModel,
    setCantidadCamionModel,
    setPrecioCamionModel, setCantidadDiasModel,
    setPrecioDiasModel, setRecojoEstado,setCampoModel
  } = useInitialRecojoModal(data)
  const {validate, errores} = useValidateRecojoModal()
  const recojoTotalModel = useCalcularRecojoTotal(
    cantidadCamionModel, precioCamionModel,
    cantidadDiasModel, precioDiasModel
  )

  const handleGuardar = async(e) =>{
    e.preventDefault()
    const { isValid } = validate({
        fechaInicioModel,fechaFinModel,
        cantidadCamionModel,
        precioCamionModel,cantidadDiasModel,
        precioDiasModel,recojoTotalModel
    })
    if(isValid){
      let recojoModel={
        recojoFechaInicio: fechaInicioModel,
        recojoFechaFin: fechaFinModel,
        recojoCamionesCantidad: cantidadCamionModel,
        recojoCamionesPrecio: precioCamionModel,
        recojoDiasCantidad: cantidadDiasModel,
        recojoDiasPrecio: precioDiasModel,
        recojoTotalPrecio: recojoTotalModel,
        recojoCampo: campoModel
      }
      if(recojoId > 0){
        recojoModel.recojoId= recojoId
        recojoModel.recojoEstadoDescripcion= recojoEstado
        recojoModel.userModifiedAt = obtenerFechaLocal({date: new Date()})
        recojoModel.userModifiedName= "ADMIN"
        const recojo = await recojoSave({method:'PUT', recojo: recojoModel})
        return onShowModel({...recojo, 
                recojoFechaInicio: convertirFechaDDMMYYYY(recojo.recojoFechaInicio),
                recojoFechaFin   : convertirFechaDDMMYYYY(recojo.recojoFechaFin)})
      }else{
        recojoModel.userCreatedAt = obtenerFechaLocal({date: new Date()})
        recojoModel.userCreatedName= "ADMIN"
        const recojo = await recojoSave({method:'POST', recojo: recojoModel})
        return onShowModel({...recojo, 
          recojoFechaInicio: convertirFechaDDMMYYYY(recojo.recojoFechaInicio),
          recojoFechaFin   : convertirFechaDDMMYYYY(recojo.recojoFechaFin)})
      }
    }
  }
  const handleCancelar = (e) =>{
    e.preventDefault()
    onShowModel({recojoId:0})
  }

  return (
    <>
      <SectionModel title={(data.recojoId > 0 ? 'Información del':'Registrar') + ' Recojo'}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
          <FilterOption htmlFor={'FechaInicioModel'} name={'Fecha Inicio'}>
            <>
              <InputDateCustom fechaValue={fechaInicioModel}
                valueError={errores.fechaInicio ? true: false}
                setFechaValue={setFechaInicioModel}/>
              {errores.fechaInicio && <p className="text-red-500 text-sm">{errores.fechaInicio}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'FechaFinalModel'} name={'Fecha Final'}>
            <>
              <InputDateCustom fechaValue={fechaFinModel}
                valueError={errores.fechaFin ? true: false}
                setFechaValue={setFechaFinModel}/>
              {errores.fechaFin && <p className="text-red-500 text-sm">{errores.fechaFin}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'CampoModel'} name={'Campo'}>
            <InputTextCustom textValue={campoModel} 
              placeholder='Ingrese el nombre del campo (opcional)' onChange={setCampoModel}/>
          </FilterOption>
          <FilterOption htmlFor={'CantidadCamionModel'} name={'Cantidad Camión'}>
            <InputDecimalCustom textValue={cantidadCamionModel} placeholder='Ejm: 1'
              onChange={setCantidadCamionModel} valueError={errores.cantidadCamion} decimales={1} /> 
            {errores.cantidadCamion && <p className="text-red-500 text-sm">{errores.cantidadCamion}</p>}
          </FilterOption>
          <FilterOption htmlFor={'PrecioCamionModel'} name={'Precio Camión'}>
            <InputDecimalCustom onChange={setPrecioCamionModel}
              valueError={errores.precioCamion} decimales={2}
              placeholder={'Ejm: 10.55'} textValue={precioCamionModel} />
            {errores.precioCamion && <p className="text-red-500 text-sm">{errores.precioCamion}</p>}
          </FilterOption>
          <FilterOption htmlFor={'CantidadDiasModel'} name={'Cantidad Días'}>
            <>
              <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                  errores.cantidadDias ? "border-red-500" : ""
                }`}
                name='query' placeholder='Ejm: 1'
                value={cantidadDiasModel}
                onChange={(e) => setCantidadDiasModel(parseInt(e.target.value) || '')}
              />
              {errores.cantidadDias && <p className="text-red-500 text-sm">{errores.cantidadDias}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'PrecioDiasModel'} name={'Precio Días'}>
            <InputDecimalCustom onChange={setPrecioDiasModel}
              valueError={errores.precioDias} decimales={2}
              placeholder={'Ejm: 10.55'} textValue={precioDiasModel} />
            {errores.precioDias && <p className="text-red-500 text-sm">{errores.precioDias}</p>}
          </FilterOption>
          <FilterOption htmlFor={'TotalModel'} name={'Total'}>
            <>
              <InputDecimalCustom onChange={()=>{}}
                valueError={errores.total}
                placeholder={'Ejm: 10.55'} textValue={recojoTotalModel} />
              
              {errores.total && <p className="text-red-500 text-sm">{errores.total}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
            <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
              name='query' placeholder='Automático'
              value={recojoEstado}
              onChange={(e) => setRecojoEstado(e.target.value)}
              readOnly
            />
          </FilterOption>
        </div>
      </SectionModel>
      <Footer>
        {recojoEstado.toLowerCase() =='activo'? (
          <FooterButton accion={handleGuardar} name={'Guardar'} />
        ):''}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
    </>
  )
}
