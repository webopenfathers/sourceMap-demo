<template>
  <div class="play">
    <el-row justify="center">
      <el-button @click="onPlay" type="primary">回放</el-button>
    </el-row>
    <hr />
    <div id="doPlay"></div>
  </div>
</template>
<script setup lang="ts">
import rrwebPlay from 'rrweb-player'
import 'rrweb-player/dist/style.css'
import { useEventStore } from '@/stores/eventStore'

const eventStore = useEventStore()
let events = eventStore.getEvent()
const onPlay = () => {
  if (events.length === 0) return
  new rrwebPlay({
    target: document.getElementById('doPlay'),
    props: {
      events
    }
  })
}
</script>
<style>
#doPlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
