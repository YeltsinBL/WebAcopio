import { asignaTierraDelete } from "../../services/asignartierra"
import { localISOString } from "../mocks/DataList"

const AsignaTierraModelDelete = ({onShowModel, data}) => {
    const handleGuardar = async(e) => {
        e.preventDefault()
        const asigna = await asignaTierraDelete({
          asignarTierraId:data,
          userModifiedName: "ADMIN",
          userModifiedAt: localISOString
        })
        if(asigna) return sendDataDismissModel(data)
        return sendDataDismissModel(0)
    }
    const handleCancelar = (e) => {
        e.preventDefault()
        sendDataDismissModel(0)
    }
    const sendDataDismissModel = (valor) => {
        onShowModel({id:valor})
    }
  return (
    <>
      <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold text-black">
                Desactivar la Asignación de Tierra
              </h3>
            </div>
            {/*body*/}
            <p className="justify-center text-black p-3" >¿Estás seguro(a) que deseas desactivar la Asignación de Tierra?</p>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="bg-[#313395] text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={ handleGuardar}
                >
                  Desactivar
                </button>
                <button
                  className="bg-gray-500 text-white active:bg-gray-300 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default AsignaTierraModelDelete