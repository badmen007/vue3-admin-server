import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/auth'
import util from 'util'

export const createToken = (payload: any) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '6h' })
}

const jwtVerify = util.promisify<string, string>(jwt.verify)
export const getInfoByToken = async <T>(token: string): Promise< T | null> => {
  try {
    const res = await jwtVerify(token, jwtSecret)
    return res as unknown as T
  } catch (error) {
    return null
  }
}