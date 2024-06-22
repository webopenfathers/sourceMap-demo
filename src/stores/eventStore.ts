import { defineStore } from 'pinia'
import type { eventWithTime } from '@rrweb/types'

interface EventState {
  events: eventWithTime[]
}

export const useEventStore = defineStore('event', {
  state: (): EventState => {
    return {
      events: []
    }
  },
  actions: {
    addEvent(events: eventWithTime[]) {
      this.events = events
    },

    getEvent() {
      return this.events
    }
  }
}) as any
