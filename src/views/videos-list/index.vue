<template>
  <div class="videos-list app-container">
    <el-form :inline="true" :model="tableFormData" class="demo-form-inline" size="mini">
      <el-form-item label="视频标题">
        <el-input placeholder="请输入视频标题" @change="titleChange" v-model="tableFormData.title"></el-input>
      </el-form-item>
      <el-form-item label="视频类别">
        <el-select v-model="tableFormData.category_id" placeholder="请选择视频类别" @change="categoryChange">
          <el-option v-for="item in categoryData" :key="item.category_id" :label="item.name" :value="item.category_id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="success" @click="handleAdd">视频新增</el-button>
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
      <el-table-column prop="title" label="视频标题" align="center" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="cover_path" label="视频封面" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <img class="poster" :src="scope.row.cover_path" alt="" srcset="" />
        </template>
      </el-table-column>
      <el-table-column prop="category_name" label="视频类别" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <el-tag type="success">{{ categoryName(scope.row.category_id) }}</el-tag> -->
          <el-tag type="success">{{ scope.row.category_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="video_path" label="视频地址" align="center" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="details" label="视频简介" align="center" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="password" label="视频密码" align="center" show-overflow-tooltip> </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleLook(scope)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" @click="handleDele(scope)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Table from '@/components/Table/index.vue'
import { getCategoryList, ICategoryData } from '@/api/category'
import { getVideoList, delVideo, IVideoData } from '@/api/videos'
import { ITableFormData, IExecuteApi, IApi } from '@/mixins'
@Component({
  name: 'videos-list',
  components: {
    Table
  }
})
export default class extends Vue {
  private tableLoading!: boolean
  private executeApi!: IExecuteApi
  private getTableData!: (api: IApi) => undefined
  private tableRenderData!: IVideoData[]
  private tableTotal!: number
  private categoryData: ICategoryData[] = []
  private tableFormData: ITableFormData = {
    title: '',
    category_id: ''
  }

  created() {
    this.paginationChange()
    this.getCategoryList()
  }

  paginationChange() {
    this.getTableData(getVideoList)
  }

  titleChange() {
    this.tableFormData.page = 1
    this.paginationChange()
  }

  categoryChange() {
    this.tableFormData.page = 1
    this.paginationChange()
  }

  async delVideo(id: number) {
    const res = await this.executeApi(delVideo, {
      video_id: id
    })
    if (res.code === 20000) {
      this.paginationChange()
    }
  }

  async getCategoryList() {
    const res = await this.executeApi(getCategoryList)
    if (res.data && res.data.length) {
      this.categoryData = [{ category_id: 0, name: '全部' }, ...res.data]
    } else {
      this.categoryData = []
    }
  }

  categoryName(id: number) {
    let result = ''
    if (this.categoryData && this.categoryData.length) {
      const item = this.categoryData.find((item) => item.category_id === id)
      if (item && item.name) {
        result = item.name
      }
    }
    return result
  }

  handleAdd() {
    this.$router.push('/videos-list/add')
  }

  handleLook(scope: any) {
    this.$router.push(`/videos-list/detail/${scope.row.video_id}`)
  }

  handleEdit(scope: any) {
    this.$router.push(`/videos-list/edit/${scope.row.video_id}`)
  }

  handleDele(scope: any) {
    this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.delVideo(scope.row.video_id)
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
