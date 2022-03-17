<template>
  <div class="app-container" v-loading="tableLoading">
    <el-descriptions title="视频信息">
      <el-descriptions-item label="视频标题">{{ videosData.title }}</el-descriptions-item>
      <el-descriptions-item label="视频地址">
        <video :src="videosData.video_path" controls></video>
      </el-descriptions-item>
      <el-descriptions-item label="视频封面">
        <img class="poster" :src="videosData.cover_path" alt="" srcset="" />
      </el-descriptions-item>
      <el-descriptions-item label="视频类别">
        <el-tag size="small">{{ videosData.category_name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="视频简介">{{ videosData.details }}</el-descriptions-item>
      <el-descriptions-item label="视频密码">{{ videosData.password }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getVideo, IVideoData } from '@/api/videos'
import { IExecuteApi } from '@/mixins'
@Component({
  name: 'videos-detail'
})
export default class extends Vue {
  private tableLoading!: boolean
  private executeApi!: IExecuteApi
  private videosData: IVideoData = {}

  async getVideo() {
    const res = await this.executeApi(getVideo, {
      video_id: this.$route.params.id
    })
    if (res.data) {
      this.videosData = res.data
    }
  }

  created() {
    this.getVideo()
  }
}
</script>

<style lang="scss" scoped>
.poster {
  width: 100px;
  height: 100px;
  // border-radius: 50%;
}
video {
  // width: 200px;
  height: 100px;
}
</style>
