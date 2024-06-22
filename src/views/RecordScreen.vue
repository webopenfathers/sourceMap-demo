<template>
  <div id="record">
    <div class="button-wrap">
      <el-button type="primary" @click="onStart">开始录制</el-button>
      <el-button type="primary" @click="onStop">结束录制</el-button>
    </div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox value="Online activities" name="type"> Online activities </el-checkbox>
          <el-checkbox value="Promotion activities" name="type"> Promotion activities </el-checkbox>
          <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
          <el-checkbox value="Simple brand exposure" name="type">
            Simple brand exposure
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio value="Sponsor">Sponsor</el-radio>
          <el-radio value="Venue">Venue</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-row justify="center">
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import * as rrweb from 'rrweb'
import { reactive } from 'vue'
import { useEventStore } from '@/stores/eventStore'

const eventStore = useEventStore()
let events = []
let stopFn = null
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onStart = () => {
  stopFn = rrweb.record({
    emit: (event) => {
      console.log(event, JSON.stringify(event))
      events.push(event)
    },
    recordCanvas: true
  })
}

const onStop = () => {
  if (!stopFn) return
  stopFn()
  eventStore.addEvent(events)
}

const onSubmit = () => {
  console.log('submit!')
}
</script>
<style>
#record {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-wrap {
  margin-bottom: 20px;
}
</style>
