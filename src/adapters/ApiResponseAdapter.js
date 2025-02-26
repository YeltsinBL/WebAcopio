export const ApiResponseAdapter = (data) => {
  return {...data,
    message: data.errorMessage
  }
}