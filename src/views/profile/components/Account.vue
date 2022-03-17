<template>
  <el-form>
    <!-- <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item> -->
    <el-form-item label="密码">
      <el-input type="password" v-model.trim="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">
        更新
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProfile } from '../index.vue'
import { UserModule } from '@/store/modules/user'
import md5 from 'md5'
@Component({
  name: 'Account'
})
export default class extends Vue {
  @Prop({ required: true }) private user!: IProfile
  private password = ''
  private async submit() {
    if (!this.password.trim()) {
      this.$message({
        message: '请输入要修改的密码',
        type: 'success',
        duration: 5 * 1000
      })
      return false
    }

    try {
      const res = (await UserModule.updateUserInfo({
        password: md5(this.password.trim())
      })) as any
      this.$message({
        message: res.msg,
        type: 'success',
        duration: 5 * 1000
      })
    } catch (error) {}
  }
}
</script>
