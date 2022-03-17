<template>
  <div class="videos-list app-container">
    <el-form :inline="true" :model="tableFormData" class="demo-form-inline" size="mini">
      <el-form-item label="名称">
        <el-input placeholder="请输入名称" @change="nameChange" v-model="tableFormData.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="success" @click="handleAdd">类别新增</el-button>
      </el-form-item>
    </el-form>
    <Table
      v-loading="tableLoading"
      size="small"
      :data="tableRenderData"
      :current-page.sync="tableFormData.page"
      :page-size.sync="tableFormData.limit"
      :total="tableTotal"
      @change="paginationChange"
    >
      <el-table-column prop="name" label="名称" align="center" show-overflow-tooltip> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleLook(scope)">查看</el-button> -->
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" @click="handleDele(scope)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>
<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component } from 'vue-property-decorator'
import Table from '@/components/Table/index.vue'
import { getCategoryList, addCategory, editCategory, delCategory, ICategoryData } from '@/api/category'
import { ITableFormData, IExecuteApi, IApi } from '@/mixins'
interface IScope {
  $index: number
  column: any
  row: {
    category_id: number
    name: string
  }
  store: any
}

@Component({
  name: 'videos-category',
  components: {
    Table
  }
})
export default class extends Vue {
  private tableLoading!: boolean
  private executeApi!: IExecuteApi
  private getTableData!: (api: IApi) => undefined
  private tableRenderData!: ICategoryData[]
  private tableTotal!: number
  private tableFormData: ITableFormData = {
    name: ''
  }

  async AddCategoryApi(data: ICategoryData) {
    const res = await this.executeApi(addCategory, data)
    if (res.code === 20000) {
      this.$message({
        type: 'success',
        message: res.msg || '新增成功'
      })
      if (res.code === 20000) {
        this.paginationChange()
      }
    }
  }

  async editCategoryApi(data: ICategoryData) {
    const res = await this.executeApi(editCategory, data)
    if (res.code === 20000) {
      this.$message({
        type: 'success',
        message: res.msg || '编辑成功'
      })
      if (res.code === 20000) {
        this.paginationChange()
      }
    }
    return res
  }

  async deleCategoryApi(data: ICategoryData) {
    const res = await this.executeApi(delCategory, data)
    if (res.code === 20000) {
      this.$message({
        type: 'success',
        message: res.msg || '编辑成功'
      })
      if (res.code === 20000) {
        this.paginationChange()
      }
    }
    return res
  }

  async getCategoryListApi() {
    const res = await this.executeApi(getCategoryList, this.tableFormData)
    if (res.data) {
      this.tableRenderData = res.data
      this.tableTotal = res.data.length
    } else {
      this.tableRenderData = []
      this.tableTotal = 0
    }
  }

  created() {
    this.paginationChange()
  }

  paginationChange() {
    this.getCategoryListApi()
  }

  nameChange() {
    this.tableFormData.page = 1
    this.paginationChange()
  }

  titleCategory() {
    this.tableFormData.page = 1
    this.paginationChange()
  }

  handleAdd() {
    this.$prompt('请输入类别名称', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValidator: (res) => {
        if (!res) {
          return '请输入类别名称'
        }
        return true
      },
      inputErrorMessage: '请输入类别名称'
    }).then((res: any) => {
      this.AddCategoryApi({
        name: res.value
      })
    })
  }

  handleEdit(scope: IScope) {
    this.$prompt('请输入类别名称', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValidator: (res) => {
        if (!res) {
          return '请输入类别名称'
        }
        return true
      },
      inputValue: scope.row.name
    }).then((res: any) => {
      this.editCategoryApi({
        category_id: scope.row.category_id,
        name: res.value
      })
    })
  }

  handleDele(scope: IScope) {
    this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.deleCategoryApi({
        category_id: scope.row.category_id
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.poster {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
