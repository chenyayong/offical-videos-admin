<template>
  <div class="videos-add app-container" v-loading="tableLoading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="视频标题" prop="title">
        <el-input placeholder="请输入视频标题" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="视频类别" prop="category_id">
        <el-tag v-if="ruleForm.category_id" type="success" style="margin-right: 10px;">{{ categoryName }}</el-tag>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="openCategory"></el-button>
      </el-form-item>
      <el-form-item label="视频地址" prop="video_path" ref="video-form-item">
        <el-upload
          :file-list="videoPath"
          :limit="1"
          accept="video/*"
          :on-exceed="onSrcExceed"
          :on-success="onSrcSuccess"
          action="/dev-api/admin/video/uploadFile"
          name="files"
          list-type="text"
        >
          <el-button size="mini" type="primary" icon="el-icon-plus"></el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频封面" prop="cover_path" ref="poster-form-item">
        <el-upload
          :file-list="coverPath"
          :on-exceed="onPosterExceed"
          :limit="1"
          accept="image/*"
          :on-success="onPosterSuccess"
          :on-remove="onPosterRemove"
          name="files"
          action="/admin/video/uploadFile"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否需要密码" prop="type">
        <el-switch @change="typeChange" v-model="ruleForm.type" :active-value="2" :inactive-value="1"></el-switch>
      </el-form-item>
      <el-form-item v-if="ruleForm.type === 2" label="视频密码" prop="password">
        <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item label="视频简介" prop="details">
        <el-input type="textarea" v-model="ruleForm.details"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 150px" @click="submitForm"> 编辑 </el-button>
      </el-form-item>
    </el-form>

    <DialogCategory :category-name.sync="categoryName" :category.sync="ruleForm.category_id" :visible.sync="dialogTableVisible" />
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component } from 'vue-property-decorator'
import Table from '@/components/Table/index.vue'
import DialogCategory from './components/DialogCategory/index.vue'
import { TagsViewModule } from '@/store/modules/tags-view'
import { editVideo, getVideo, IVideoData } from '@/api/videos'
import { IResponse } from '@/api/types'
import { IExecuteApi } from '@/mixins'
@Component({
  name: 'videos-add',
  components: {
    Table,
    DialogCategory
  }
})
export default class extends Vue {
  private executeApi!: IExecuteApi
  private tableLoading!: boolean
  private dialogTableVisible = false
  private categoryName = ''
  private ruleForm: IVideoData = {
    title: '',
    video_id: '',
    category_id: '',
    category_name: '',
    cover_path: '',
    video_path: '',
    details: '',
    type: 1,
    password: ''
  }

  private rules = {
    title: [{ required: true, message: '请输入视频标题', trigger: 'blur' }],
    category_id: [{ required: true, message: '请输入视频类别', trigger: 'change' }],
    cover_path: [{ required: true, message: '请输入视频封面', trigger: 'change' }],
    video_path: [{ required: true, message: '请输入视频地址', trigger: 'change' }],
    password: [{ required: true, message: '请输入视频密码', trigger: 'change' }]
  }

  get coverPath() {
    return this.ruleForm.cover_path ? [{ url: this.ruleForm.cover_path }] : []
  }

  get videoPath() {
    return this.ruleForm.video_path ? [{ name: this.ruleForm.video_path }] : []
  }

  created() {
    this.getVideo()
  }

  async getVideo() {
    const res = await getVideo({
      video_id: this.$route.params.id
    })
    if (res.data) {
      this.ruleForm = res.data
      this.categoryName = res.data.category_name
    }
  }

  async editVideo() {
    const res = await this.executeApi(editVideo, this.ruleForm)
    if (res.code === 20000) {
      this.$message({
        type: 'success',
        message: '编辑成功'
      })
      TagsViewModule.delView(this.$route)
      this.$router.push('/videos-list/index')
    }
  }

  openCategory() {
    this.dialogTableVisible = true
  }

  onPosterRemove() {
    this.ruleForm.cover_path = ''
  }

  typeChange(value: number) {
    if (value === 1) {
      this.ruleForm.password = ''
    }
  }

  onSrcSuccess(response: IResponse) {
    if (response.code && response.data) {
      const video = this.$refs['video-form-item'] as any
      video.clearValidate()
      this.ruleForm.video_path = response.data
    }
  }

  onPosterSuccess(response: IResponse) {
    if (response.code && response.data) {
      const poster = this.$refs['poster-form-item'] as any
      poster.clearValidate()
      this.ruleForm.cover_path = response.data
    }
  }

  onSrcExceed() {
    this.$message({
      type: 'error',
      message: '只允许上传一个视频'
    })
  }

  onPosterExceed() {
    this.$message({
      type: 'error',
      message: '只允许上传一张图片'
    })
  }

  submitForm() {
    const ruleForm = this.$refs.ruleForm as any
    ruleForm.validate((valid: boolean) => {
      if (valid) {
        if (this.ruleForm.category_name) {
          delete this.ruleForm.category_name
        }
        this.editVideo()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.videos-add {
  width: 600px;
  margin: 20px auto;
  display: block;
  position: relative;
}
</style>
