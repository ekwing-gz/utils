const oProto = Object.prototype
const toString = oProto.toString
const hasOwnProperty = oProto.hasOwnProperty

export const noop = () => {}
export const identity = _ => _

// type check
function isType (name) {
  return function (obj) {
    return toString.call(obj) === '[object ' + name + ']'
  }
}

/**
 * is Function or not
 * @param {*} params
 * @returns {boolean}
 */
export const isFunction = isType('Function')

/**
 * is Array or not
 * @param {*} params
 * @returns {boolean}
 */
export const isArray = isType('Array')

/**
 * turn a array to map
 * @param {array} collection
 * @param {string} key
 * @returns {map}
 */
export const toMap = (collection, key) => {
  const res = new Map()
  for (let _ of collection) {
    res.set(_[key], _)
  }
  return res
}

/**
 *
 * @param {map} map
 * @param {string} key
 * @param {string} valueKey
 * @returns {*}
 */
export const pluckMap = (map, key, valueKey) => {
  if (!map.has(key)) return
  let item = map.get(key)
  if (!valueKey) return item
  return item[valueKey]
}

/**
 *
 * @param {function} callback
 * @param {number} duration
 * @param {boolean} [first=true]
 * @returns {string} id
 */
export const setTick = (fn, duration, first = true) => {
  first && fn()
  let id = setInterval(fn, duration)
  return () => clearInterval(id)
}

/**
 *
 * @param {date} endTime
 * @returns {string}
 */
export const fromNow = endTime => {
  let now = (new Date()).valueOf()
  let leftTime = (endTime - now) / 1000
  let res = []
  for (let divisor of [3600, 60, 1]) {
    let number = numberPrefix(parseInt(leftTime / divisor), 2)
    res.push(number)
    leftTime = leftTime % divisor
  }
  return res.join(':')
}
