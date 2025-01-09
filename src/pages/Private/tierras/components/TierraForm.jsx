import { useEffect, useState } from "react"
import { obtenerFechaLocal } from "../../../../utils"
import { 
  ContainerPopupCustom,
  FilterOption, Footer, FooterButton, InputTextCustom, MessageValidationInput,
  SectionModelPopup
} from "../../../../components/common"
import { tierraSave, tierraUpdate } from "../../../../services/tierra"

export const TierraForm = ({ onShowModel, data }) => {
  const [id, setId] = useState('')
  const [uc, setUc] = useState('')
  const [campo, setCampo] = useState('')
  const [sector, setSector] = useState('')
  const [valle, setValle] = useState('')
  const [ha, setHA] = useState('')
  const [activo, setActivo] = useState(true)
  const [errores, setErrores] = useState({})

  useEffect(() => {
    if(data){
      setId(data.tierraId || 0)
      setUc(data.tierraUc || '')
      setCampo(data.tierraCampo || '')
      setSector(data.tierraSector || '')
      setValle(data.tierraValle || '')
      setHA(data.tierraHa || '')
      setActivo(data.tierraStatus)
    }
  }, [])

  const validarCampos = () => {
    const nuevosErrores = {}
    if (!uc) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!campo) nuevosErrores.campo = "El campo Campo es obligatorio."
    if (!sector) nuevosErrores.sector = "El campo Sector es obligatorio."
    if (!valle) nuevosErrores.valle = "El campo Valle es obligatorio."
    if (!ha) nuevosErrores.ha = "El campo H.A. es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      let tierraModel = {
        tierraUc: uc,
        tierraCampo: campo,
        tierraSector: sector,
        tierraValle: valle,
        tierraHa: ha,
        tierraStatus: activo,
      }
      if(id > 0) {
        tierraModel = {...tierraModel,
          tierraId :id,
          userModifiedName: "ADMIN",
          userModifiedAt: obtenerFechaLocal({date: new Date()})}
        const tierra = await tierraUpdate(tierraModel)
        return onShowModel(tierra)
      }
      tierraModel = {...tierraModel, 
        userCreatedName: "ADMIN",
        userCreatedAt: obtenerFechaLocal({date: new Date()})}
      const tierra = await tierraSave(tierraModel)
      return onShowModel(tierra)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({tierraId:0})
  }
  return (
    <ContainerPopupCustom>
      <SectionModelPopup title={(id >0 ? 'Editar' : 'Registrar') +' Tierra'} >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='pl-6 pr-6'>
            <FilterOption  htmlFor={'TierraUCModal'} name={'UC'}>
              <InputTextCustom
                onChange={setUc}
                placeholder='Ingrese el código UC'
                textValue={uc}
                valueError={errores.uc}
              />
              {errores.uc && <MessageValidationInput mensaje={errores.uc}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'TierraCampoModal'} name={'Campo'}>
              <InputTextCustom 
                onChange={setCampo}
                placeholder='Ingrese el Campo'
                textValue={campo}
                valueError={errores.campo}
                />
                {errores.campo && <MessageValidationInput mensaje={errores.campo}/>}
            </FilterOption>          
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'TierraSectorModal'} name={'Sector'}>
              <InputTextCustom 
                onChange={setSector}
                placeholder='Ingrese el sector'
                textValue={sector}
                valueError={errores.sector}
              />
              {errores.sector && <MessageValidationInput mensaje={errores.sector}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'TierraValleModal'} name={'Valle'}>
                <InputTextCustom 
                  onChange={setValle}
                  placeholder='Ingrese el valle' 
                  textValue={valle}
                  valueError={errores.valle}
                />
                {errores.valle && <MessageValidationInput mensaje={errores.valle}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'TierraHAModal'} name={'H.A.'}>
                <InputTextCustom 
                  onChange={setHA}
                  placeholder='Ingrese el H.A.'
                  textValue={ha}
                  valueError={errores.ha}
                />
                {errores.ha && <MessageValidationInput mensaje={errores.ha}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor="TierraActivoModal" name={'Activo'}>
              <InputTextCustom 
                  onChange={setActivo}
                  textValue={activo ? 'Activo':'Inactivo'}
                  readOnly
                />
            </FilterOption>
          </div>
        </div>
        <Footer>
          {!activo ?''          
          :<FooterButton name={'Guardar'} accion={handleGuardar}/>}
          <FooterButton name={'Cancelar'} accion={handleCancelar}/>
        </Footer>
      </SectionModelPopup>
    </ContainerPopupCustom>
  )
}
