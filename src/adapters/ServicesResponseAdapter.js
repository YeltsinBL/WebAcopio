export const ServicesResponseAdapter = (data) => {
  return {...data,
    message: data.errorMessage
  }
}