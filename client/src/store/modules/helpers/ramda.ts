import * as R from 'ramda'

export function get<T>(path: string) {
  return R.path<T>(R.split('.', path))
}

export function getOr<T>(path: string, defaultValue: any) {
  return R.pathOr<T>(defaultValue, R.split('.', path))
}
