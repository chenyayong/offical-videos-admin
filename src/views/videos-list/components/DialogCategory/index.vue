<template>
  <div class="dialog-category">
    <el-dialog title="视频类别" :visible.sync="dialogVisible">
      <Table v-loading="loading" size="small" :data="categoryData" :current-page.sync="formData.page" :page-size.sync="formData.limit" :total="total" @change="paginationChange">
        <el-table-column width="55" align="center">
          <template v-slot="scope">
            <el-radio class="radio" :label="scope.row.category_id" v-model="categoryId"></el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" width="55" align="center" label="序号"> </el-table-column>
        <el-table-column property="name" label="类别名称"></el-table-column>
      </Table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Table from '@/components/Table/index.vue'
import { getCategoryList } from '@/api/category'
interface ICategory {
  // eslint-disable-next-line camelcase
  category_id: number
  name: string
}
@Component({
  name: 'dialog-category',
  components: {
    Table
  }
})
export default class extends Vue {
  @Prop(Boolean) visible!: boolean
  @Prop([Number, String]) category!: number | string | undefined
  private loading = false
  private total = 0
  private categoryId = this.category
  private categoryData: ICategory[] = []
  private formData = {
    page: 1,
    limit: 10
  }

  @Watch('visible')
  onVisibleChange(val: boolean) {
    if (val) {
      this.categoryId = this.category
    }
  }

  get dialogVisible() {
    return this.visible
  }

  set dialogVisible(value: boolean) {
    this.$emit('update:visible', value)
  }

  get categoryName() {
    let result = ''
    if (this.categoryData && this.categoryData.length) {
      const category = this.categoryData.find((item: ICategory) => item.category_id === this.categoryId)
      if (category) {
        result = category.name
      }
    }
    return result
  }

  dialogTableConfirm() {
    this.$emit('update:visible', false)
    this.$emit('update:category', this.categoryId)
    this.$emit('update:categoryName', this.categoryName)
  }

  paginationChange() {
    this.getCategoryData()
  }

  async getCategoryData() {
    this.loading = true
    const res = (await getCategoryList(this.formData)) as any
    if (res.data && res.data.length) {
      this.categoryData = res.data
      this.total = this.categoryData.length
    } else {
      this.categoryData = []
      this.total = 0
    }
    this.loading = false
  }

  async created() {
    this.getCategoryData()
  }
}
</script>

<style lang="scss" scoped>
.dialog-category {
  .radio ::v-deep .el-radio__label {
    display: none;
  }
}
</style>
