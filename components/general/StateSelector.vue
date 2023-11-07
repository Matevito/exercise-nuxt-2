<template>
  <div class="content-state-selector">
    <div
      :class="{ 'state-selector': true, [status]: true }"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="toggle"
    >
      <span>{{
        status === 'active'
          ? $t('table.state.active')
          : $t('table.state.inactive')
      }}</span>
      <img
        :src="
          status === 'active'
            ? '/img/icons/ic_arrow_gray.svg'
            : '/img/icons/ic_arrow_red.svg'
        "
      />
    </div>
    <Menu :id="id" :ref="id" :model="items" :popup="true" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    items: [],
  }),
  mounted() {
    this.items = [
      {
        label: this.$t('table.state.active'),
        command: () => {
          this.save('active')
        },
      },
      {
        label: this.$t('table.state.inactive'),
        command: () => {
          this.save('inactive')
        },
      },
    ]
  },
  methods: {
    toggle(event) {
      this.$refs[this.id].toggle(event)
    },
    async save(_status) {
      this.$nuxt.$loading.start()

      const result = await this.$store.dispatch('apiServices', {
        type: 'put',
        form: {
          url: this.service,
          content: {
            id: this.id,
            status: _status,
          },
        },
      })

      if (result.status === true) {
        if (result.code === 100) {
          this.showAlert({
            type: 'success',
            message: result.message,
          })
        } else {
          this.showAlert({
            type: 'error',
            message: result.message,
          })
        }
      } else {
        this.showAlert({
          type: 'error',
          message: result.message,
        })
      }

      this.$nuxt.$loading.finish()
      this.$emit('reload')
    },
  },
}
</script>

<style lang="scss">
.content-state-selector {
  position: relative;
  .state-selector {
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    span {
      padding-left: 10px;
    }
    &.active {
      background-color: #dffce4;
      color: #02b723;
      span {
        color: #02b723;
      }
    }
    &.inactive {
      background-color: #fcdfe1;
      color: #e30000;
      span {
        color: #e30000;
      }
    }
  }
  .p-menu {
    top: 42px !important;
    left: 0 !important;
    width: 120px;
  }
}
</style>
