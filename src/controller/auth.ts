import { UserAttributes } from "../db/models/User.model";
import { createUser, getUserInfo, getUserInfoAndRoles } from "../services/auth";

import { ErrorResponse, SuccessResponse } from "../utils/Response";
import errorInfo from "../constants/errorInfo";
import { createHmac } from "../utils/createHmac";
import { createToken, getInfoByToken } from "../utils/token";
const { registerUserNameExistInfo, registerFailInfo, loginFailInfo } =
  errorInfo;

export interface LoginModel {
  username: string;
  password: string;
}

export const registerController = async (params: UserAttributes) => {
  const { username, password = "111111" } = params;
  // 注册前先看下用户是否已注册 getUserInfo services
  const userInfo = await getUserInfo({ username });
  if (userInfo) {
    // 如果已注册
    const { code, message } = registerUserNameExistInfo;
    return new ErrorResponse(code, message);
  }
  // 用户不存在
  try {
    const result = await createUser({
      // 创建用户
      ...params,
      password: createHmac(password),
    });
    return new SuccessResponse({});
  } catch (err) {
    // 注册失败
    const { code, message } = registerFailInfo;
    return new ErrorResponse(code, message);
  }
};

export const loginController = async (params: LoginModel) => {
  const { username, password } = params;
  // 根据用户名和密码 获取用户信息
  const userInfo = await getUserInfo({ username, password });
  if (userInfo) {
    // 能获取到返回token
    const { id, username } = userInfo;
    const token = createToken({
      // 根据用户id和用户名生成token
      id,
      username,
    });
    return new SuccessResponse({ token });
  }
  // 获取不到返回 登录失败
  const { code, message } = loginFailInfo;
  return new ErrorResponse(code, message);
};

/**
 * 用户信息
 * param
 */
interface UserTokenInfo {
  id: number;
  username: string;
}

export const userInfoController = async (param = "") => {
  const token = param.split(" ")[1];
  if (token) {
    // 根据token解析token信息
    const tokenInfo = await getInfoByToken<UserTokenInfo>(token);
    if (tokenInfo) {
      const {id } = tokenInfo
      const userInfo = await getUserInfoAndRoles(id)
      return new SuccessResponse(userInfo)
    }
  }
}