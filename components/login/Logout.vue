<template>
  <Dialog
    id="logout-modal"
    :visible.sync="dialog"
    :style="{ width: '500px' }"
    :modal="true"
    :closable="false"
  >
    <div class="confirmation-content">
      <h2>{{ $t('title.logout') }}</h2>
      <img src="/img/icons/ic_logout.svg" />
      <p>{{ $t('text.logout') }}</p>
    </div>
    <template #footer>
      <Button
        class="button-modal modal__no p-mr-3"
        :label="$t('button.no')"
        @click="closeModal"
      />
      <Button
        class="button-modal modal__yes"
        :label="$t('button.logout')"
        autofocus
        @click="logout"
      />
    </template>
  </Dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    logout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>

<style lang="scss">
#logout-modal {
  border-radius: 13px !important;
  .confirmation-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h2 {
    color: #000000;
    font-size: 1.6em !important;
    text-align: center;
    font-weight: bold;
    margin: 0;
  }
  img {
    margin: 20px auto;
  }
  p {
    margin: 0;
    color: #767676;
    text-align: center;
    font-size: 1.25em;
    width: 70%;
  }

  .p-dialog-header {
    border-top-right-radius: 13px !important;
    border-top-left-radius: 13px !important;
  }
  .p-dialog-footer {
    border-bottom-right-radius: 13px !important;
    border-bottom-left-radius: 13px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 40px;
  }

  .button-modal {
    color: white;
    padding: 12px 43px;
    border-radius: 5px;
    &.modal__no {
      background: #fa8787 !important;
      border: none;
    }
    &.modal__yes {
      background: #75a255 !important;
      border: none;
    }
  }
}
.p-dialog-mask.p-component-overlay {
  background-color: rgba($color: #121212, $alpha: 0.78);
}
</style>
