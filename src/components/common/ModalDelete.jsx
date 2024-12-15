import { ContainerPopupCustom, SectionModelPopup } from './ContainerPopupCustom'

export const ModalDelete = ({title, message, children}) => {
  return (
    <>
      <ContainerPopupCustom>
        <SectionModelPopup title={title}>
          <p className="justify-center text-white p-6" >{message}</p>
          {/*footer*/}
          {children}
        </SectionModelPopup>
      </ContainerPopupCustom>
    </>
  )
}
