import { SuccessResponse, createErrorResponse } from './../utils/Response';
import { AccessAttributes } from './../db/models/Access.model';
import errorInfo from "../constants/errorInfo";
import { createAccess, getAllAccess, removeAccessById, updateAccessById, updateBulkAccess } from '../services/access';

const {
  addAccessFailInfo,
  getAccessAllFailInfo,
  removeAccessFailInfo,
  updateAccessFailInfo
} = errorInfo


export const addAccessController = async (params: AccessAttributes) => {
  if (params) {
    try {
      const result = await createAccess({
        ...params
      })
      return new SuccessResponse(result)
    } catch (error) {
      return createErrorResponse(addAccessFailInfo)
    }
  }
}

export const getAccessAllController = async () => {
  try {
    const result = await getAllAccess();
    return new SuccessResponse(result);
  } catch (error) {
    return createErrorResponse(getAccessAllFailInfo);
  }
};

export const removeAccessController = async (id: number) => {
  try {
    await removeAccessById(id)
    return new SuccessResponse(null, '删除成功')
  } catch (error) {
    return createErrorResponse(removeAccessFailInfo)
  }
}

export const updateAccessController = async (id: number, data: AccessAttributes) => {
  try {
    await updateAccessById(id, data)
    return new SuccessResponse(null, '更新成功')
  } catch (error) {
    return createErrorResponse(updateAccessFailInfo)
  }
}

export const updateBulkAccessController = async (data: AccessAttributes[]) => {
  try {
    await updateBulkAccess(data);
    return new SuccessResponse(null, "菜单更新成功!");
  } catch (error) {
    return createErrorResponse(updateAccessFailInfo);
  }
};


