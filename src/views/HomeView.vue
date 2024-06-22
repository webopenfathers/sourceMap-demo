<template>
  <div v-if="isError">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item, index) in js_error.stack_frames"
        :key="index"
        :title="item.source"
        :name="index"
      >
        <el-row>
          <el-col :span="20">
            <div>{{ item.fileName }}</div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" @click="openDialog(item, index)">
              映射源码
            </el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

let js_error = ref<any>([])
let isError = ref(false)
let activeName = ref(0)

onMounted(() => {
  try {
    let jsErrorList = localStorage.getItem('jsErrorList')
    if (jsErrorList) {
      isError.value = true
      js_error.value = JSON.parse(jsErrorList)
    }
  } catch (error) {
    console.log(error)
  }
})

const openDialog = () => {}
</script>
