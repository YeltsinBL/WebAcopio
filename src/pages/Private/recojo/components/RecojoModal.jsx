import { 
  InputDateCustom, FilterOption, Footer, FooterButton, SectionModel, 
  InputDecimalCustom, InputTextCustom
} from '~components/common'
import { 
  useCalcularRecojoTotal, useInitialRecojoModal, useValidateRecojoModal
} from '../hooks'
import { recojoSave } from '~services/recojo'
import { RecojoAdapterSave } from '../adapter/RecojoAdapter'

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
    let recojoModel={
      fechaInicioModel, fechaFinModel, cantidadCamionModel,
      precioCamionModel, cantidadDiasModel, precioDiasModel,
      recojoTotalModel, campoModel, recojoId, recojoEstado
    }
    const { isValid } = validate(recojoModel)
    if(isValid){
      const recojo = await recojoSave({
        method:recojoId > 0?'PUT':'POST', 
        recojo: RecojoAdapterSave(recojoModel)
      })
      return onShowModel(recojo)
    }
  }
  const handleCancelar = (e) =>{
    e.preventDefault()
    onShowModel({recojoId:0})
  }

  return (
    <>
      <SectionModel title={(recojoId > 0 ? 'Información del':'Registrar') + ' Recojo'}>
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
