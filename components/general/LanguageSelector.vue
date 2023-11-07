<template>
  <Dialog
    id="language-modal"
    :visible.sync="dialog"
    :style="{ width: '596px' }"
    :modal="true"
    :closable="false"
    :header="$t('title.translation')"
  >
    <div id="language-form">
      <label id="language-form--label" for="language">{{
        $t('form.language.label')
      }}</label>
      <MultiSelect
        id="language-form--multiselect"
        v-model="selectedLanguages"
        :options="allLanguages"
        option-label="language"
        :placeholder="$t('form.language.placeholder')"
        display="chip"
        :filter="true"
      />
    </div>
    <template #footer>
      <Button
        class="button-modal modal__cancel p-mr-3"
        :label="$t('button.cancel')"
        @click="closeModal"
      />
      <Button
        class="button-modal modal__create"
        :label="$t('button.create.create')"
        autofocus
        @click="createLanguage"
      />
    </template>
  </Dialog>
</template>

<script>
export default {
  data: () => ({
    lang: 'es',
    selectedLanguages: null,
    allLanguages: [],
  }),
  computed: {
    dialog() {
      return this.$store.state.languageModal.show
    },
    languages() {
      return this.$store.state.languageModal.languages
    },
    page() {
      return this.$store.state.languageModal.page
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$i18n.locale) this.lang = this.$i18n.locale

      this.getLanguages()
    })
  },
  methods: {
    closeModal() {
      this.$store.commit('languageModal/setData', {
        show: false,
        languages: [],
        page: '',
      })
    },
    createLanguage() {
      if (!this.selectedLanguages || this.selectedLanguages.length <= 0) {
        this.showAlert({
          type: 'error',
          message: this.$t('rule.language'),
        })
      } else {
        this.$store.commit('languageModal/setTabs', this.selectedLanguages)

        if (this.page !== '') {
          this.$router.push(this.localePath({ path: this.page }))
        }

        this.$store.commit('languageModal/setData', {
          show: false,
          languages: [],
          page: '',
        })
      }
    },
    async getLanguages() {
      this.$nuxt.$loading.start()
      const arrayLanguages = this.languages.map((item) => item.id)

      const result = await this.$store.dispatch('apiServices', {
        type: 'post',
        form: {
          url: 'system/language/active',
          content: {
            id: [...arrayLanguages, this.$i18n.locale],
          },
        },
      })

      if (result.status === true) {
        if (result.code === 100) {
          this.allLanguages = result.data.filter(
            (item) => item.id !== this.lang
          )

          // this.selectedLanguages = this.languages
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
    },
  },
}
</script>

<style lang="scss">
#language-modal {
  border-radius: 13px !important;
  .p-dialog-header {
    .p-dialog-title {
      color: #000000;
      font-size: 1.6em !important;
      text-align: center;
      font-weight: bold;
      margin: auto;
    }
  }
  .p-dialog-content {
    padding: 0 40px 40px;
    overflow-y: unset;
  }
  #language-form {
    display: flex;
    flex-direction: column;
    &--label {
      color: #161420;
      font-weight: 600;
      font-size: 1em;
      margin-bottom: 14px;
    }
    &--multiselect {
      border: 1px solid #e3e3e3;
      background: #f9faff;
      box-shadow: none !important;
      .p-placeholder {
        padding: 10px 16px;
        color: #acadb0;
      }
      .p-checkbox .p-checkbox-box.p-highlight {
        border-color: #6bcefd;
        background: #6bcefd;
        span {
          color: white;
        }
      }
      .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
        border-color: #6bcefd;
      }
      .p-multiselect-panel .p-multiselect-items .p-multiselect-item:focus {
        box-shadow: none;
      }
      .p-multiselect-panel
        .p-multiselect-items
        .p-multiselect-item.p-highlight {
        background: transparent;
      }
      .p-multiselect-token {
        background: rgba($color: #e0e0e0, $alpha: 0.45);
        padding: 7px 10px 7px 20px;
        color: #3c3c3c;
      }
      .p-multiselect-token-icon {
        font-size: 1.2em;
        margin-left: 20px;
      }
      .p-inputtext:enabled:hover {
        border-color: #6bcefd;
      }
      .p-inputtext:enabled:focus {
        box-shadow: 0 0 0 0.2rem rgba($color: #6bcefd, $alpha: 0.2);
        border-color: #6bcefd;
      }
    }
  }

  .p-dialog-header {
    border-top-right-radius: 13px !important;
    border-top-left-radius: 13px !important;
  }
  .p-dialog-footer {
    border-bottom-right-radius: 13px !important;
    border-bottom-left-radius: 13px !important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 40px 40px;
  }

  .button-modal {
    color: white;
    padding: 12px 43px;
    width: 180px;
    border-radius: 5px;
    &.modal__cancel {
      background: #fa8787 !important;
      border: none;
    }
    &.modal__create {
      background: #75a255 !important;
      border: none;
    }
  }
}
.p-dialog-mask.p-component-overlay {
  background-color: rgba($color: #121212, $alpha: 0.78);
}
</style>
