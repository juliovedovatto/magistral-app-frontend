export default function objectFilter (obj: GenericObject, predicate: Function): GenericObject {
  return Object.keys(obj).filter(key => predicate(obj[key], key))
    .reduce((res: GenericObject, key) => (res[key] = obj[key], res), {})
}
