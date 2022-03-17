<template>
  <div class="magic-able">
    <div class="el-table-container">
      <el-table :data="data" border v-bind="$attrs">
        <slot></slot>
      </el-table>
    </div>
    <div class="el-pagination-container">
      <el-pagination
        :layout="layout"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="page"
        :page-sizes="pageSizes"
        :page-size.sync="limit"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
@Component({
  name: 'MagicTable'
})
export default class extends Vue {
  @Prop(Array) readonly data!: any[]
  @Prop({ type: String, default: 'prev, pager, next, sizes, total' }) layout!: string
  @Prop({ type: Number, default: 0 }) total!: number
  @Prop({ type: Number, default: 1 }) currentPage!: number
  @Prop({ type: Array, default: () => [10, 15, 20, 30] }) pageSizes!: number[]
  @Prop({ type: Number, default: 10 }) pageSize!: number

  get page() {
    return this.currentPage
  }

  set page(page: number) {
    this.$emit('update:currentPage', page)
  }

  get limit() {
    return this.pageSize
  }

  set limit(size: number) {
    this.$emit('update:pageSize', size)
  }

  @Watch('currentPage')
  currentPageChange() {
    this.$emit('change', { page: this.currentPage, size: this.pageSize })
  }

  @Watch('pageSize')
  pageSizeChange() {
    const totalPage = Math.ceil(this.total / this.pageSize)
    if (this.currentPage <= totalPage) {
      this.$emit('change', { page: this.currentPage, size: this.pageSize })
    }
  }

  @Emit()
  currentChange(page: number) {
    return page
  }

  @Emit()
  sizeChange(size: number) {
    return size
  }
}
</script>
<style scoped>
.el-pagination-container {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
</style>
