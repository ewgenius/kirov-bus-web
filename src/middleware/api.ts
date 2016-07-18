export const CALL_API = Symbol('CALL_API')

export default store => next => action => {
  return next(action)
}
