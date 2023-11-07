import Vue from 'vue'

import format from 'date-fns/format'
import { es } from 'date-fns/locale'

Vue.mixin({
  methods: {
    showAlert({
      title = '',
      message = '',
      type = 'error', // success, info, warn, error
      duration = 3500, // Delay in milliseconds to close the message automatically
    }) {
      this.$toast.add({
        severity: type,
        summary: title,
        detail: message,
        life: duration,
      })
    },
    formatTime(_text, _type) {
      let newText = _text

      if (_type === 'date') {
        const jsDate = new Date(_text)
        newText = format(jsDate, 'dd/MM/yyyy', { locale: es })
      }

      if (_type === 'date-time') {
        const jsDate = new Date(_text)
        newText = format(jsDate, 'dd/MM/yyyy HH:mm', { locale: es })
      }

      if (_type === 'time') {
        const jsDate = new Date(_text)
        newText = format(jsDate, 'hh:mm aaa', { locale: es })
      }

      return newText
    },
  },
})
