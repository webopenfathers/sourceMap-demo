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
    addEvent(event: any) {
      this.events.push(event)
    },

    getEvent() {
      return this.events
    }
  }
}) as any
