export async function createImage(blobUrl) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], `imagen_${Date.now()}.jpg`, { type: blob.type });
  }