/* eslint-disable camelcase */
import { Vue, Component } from 'vue-property-decorator'
import { AxiosPromise } from 'axios'
import { IResponse } from '@/api/types'

export interface IApi {
  (params: any): AxiosPromise<any>
}

export interface IExecuteApi {
  (api: IApi, params?: any): Promise<IResponse>
}

export interface ITableFormData {
  page?: number
  limit?: number
  [key: string]: any
}

@Component
export default class BasicMixin extends Vue {
  tableLoading = false
  tableTotal = 0
  tableRenderData = []
  tableFormData: ITableFormData = {
    page: 1,
    limit: 20
  }

  async executeApi(api: IApi, params?: any) {
    this.tableLoading = true
    const res = await api(params)
    this.$nextTick(() => {
      this.tableLoading = false
    })
    return (res as unknown) as IResponse
  }

  async getTableData(api: IApi) {
    const res = await this.executeApi(api, this.tableFormData)
    if (res.data && res.data.items && res.data.items.length) {
      this.tableRenderData = res.data.items
      this.tableTotal = res.data.total
    } else {
      this.tableRenderData = []
      this.tableTotal = 0
    }
  }
}
Vue.mixin(BasicMixin)
