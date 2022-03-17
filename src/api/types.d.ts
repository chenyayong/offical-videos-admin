/* eslint-disable camelcase */

export interface IResponse {
  code: number
  msg: string
  total?: number
  data?: any
}

export interface IFormData {
  limit?: number
  page?: number
  [key: string]: any
}

declare enum ICodeType {
  // 1：统一社会信用代码， 2：组织机构代码，3：营业执照注册号'
  creditCode = 1,
  organizationCode,
  licenseCode
}
declare enum IStatus {
  // 0草稿 1申请 2提交微信 3退回 4完结'
  draft,
  apply,
  submit,
  back,
  end
}
export interface IApply {
  apply_id: string | number
  name: string
  code: string
  code_type: ICodeType
  legal_persona_wechat: string
  legal_persona_name: string
  submit_time: Date
  end_time: Date
  status: IStatus
}
export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}
