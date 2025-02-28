import { useEffect, useState } from "react"
import { 
    ContainerPopupCustom, FilterOption, Footer, FooterButton, InputTextCustom, 
    SectionModelPopup, 
} from "~components/common"
import { ImageCropper } from "./ImageCropper"


export const CorteFormImage = ({onImageCharge}) =>{

  const [imagenComentario, setImagenComentario] = useState('.')
  const [selectedImage, setSelectedImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  useEffect(() => {
    setSelectedImage(null)
  }, [croppedImage])

  const handleImageUpload = (event) => {
    setCroppedImage(null)
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setSelectedImage(reader.result)
      reader.readAsDataURL(file)
    }
  }
  const handleAgregar = (e) => {
    e.preventDefault()
    onImageCharge({image:croppedImage, comentario:imagenComentario})
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onImageCharge(null)
  }
  return (
    <ContainerPopupCustom>
      <SectionModelPopup title={'Cargar Imagen'}>
      <div className='grid grid-cols-1 gap-4'>
        <div className='pl-6 pr-6'>
            <input type="file" name="file" accept="image/*"
          placeholder='Upload an image' onChange={handleImageUpload} />
        </div>
        <div className='pl-6 pr-6'>
            {selectedImage && (
          <ImageCropper image={selectedImage} onCropComplete={setCroppedImage} />
        )}
        </div>
        <div className='pl-6 pr-6'>
            {croppedImage && 
        <>
        <img className="relative w-full h-80" src={croppedImage} alt="Cropped" />
        <FilterOption htmlFor={'ComentarioModal'} name={'Comentario'}>
          <InputTextCustom textValue={imagenComentario} placeholder="Ingrese un comentario de la imagen" onChange={setImagenComentario} />
        </FilterOption>
        </>
        }
        </div>
      </div>
      </SectionModelPopup>
      <Footer>
      { croppedImage &&       
        <FooterButton name={'Agregar'} accion={handleAgregar}/>
      }
        <FooterButton name={'Cancelar'} accion={handleCancelar}/>
      </Footer>
    </ContainerPopupCustom>
  )
}