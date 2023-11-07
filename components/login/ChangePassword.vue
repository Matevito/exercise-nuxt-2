<template>
  <div id="forgot-content">
    <img
      id="logo-login"
      src="/img/ic_logo.svg"
      alt="Logo Backoffice"
      class="scale-in-bottom mb-6"
    />

    <GeneralForm
      v-show="form.length > 0"
      type="login"
      :title="$t('title.changePassword')"
      @accept="acceptForm"
    >
      <p id="text-form">{{ $t('text.changePassword') }}</p>
      <GeneralInput
        v-for="(input, index) in form"
        :key="index"
        v-model="input.value"
        :class="input.class"
        color-text="white-float"
        :label="input.label"
        :placeholder="input.placeholder"
        :tooltip="input.tooltip"
        :name="input.name"
        :type="input.type"
        :validate="validateInput"
        :validation="input.validations"
        input-style="normal solo-login input-icon rigth-icon"
        :icon="input.icon"
        :icon-label="input.iconLabel"
        @setStatus="changeSubmit"
        @showPassword="showPassword"
      />

      <GeneralButton
        class-button="py-3 block mx-auto mb-3 mt-6"
        type="submit"
        color="secondary-color"
        border="secondary-color"
        weight="bold"
        width="200px"
        font-size="1em"
        :label="$t('button.reset')"
      />
    </GeneralForm>
  </div>
</template>

<script>
import { generateValidation } from '~/utils/validation'

export default {
  data: () => ({
    form: [],
    error: [],
    validateInput: false,
    actionsForm: [],
  }),
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    async init() {
      this.form = [
        {
          label: this.$t('form.password.label'),
          placeholder: this.$t('form.password.placeholder'),
          tooltip: this.$t('form.password.tooltip'),
          name: 'password',
          value: '',
          type: 'password',
          iconLabel: 'ic_password.svg',
          icon: 'ic_show_password.svg',
          class: 'mb-3',
          validations: await generateValidation([{ name: 'password' }]),
        },
        {
          label: this.$t('form.confirmPassword.label'),
          placeholder: this.$t('form.confirmPassword.placeholder'),
          name: 'confirmPassword',
          value: '',
          type: 'password',
          iconLabel: 'ic_password.svg',
          icon: 'ic_show_password.svg',
          class: 'mb-3',
          validations: await generateValidation([{ name: 'require' }]),
        },
      ]
    },
    showPassword(_data) {
      if (_data.show) {
        this.form
          .filter((p) => p.name === _data.name)
          .map((m) => {
            m.type = 'text'
            m.icon = 'ic_hide_password.svg'
            return m
          })
      } else {
        this.form
          .filter((p) => p.name === _data.name)
          .map((m) => {
            m.type = 'password'
            m.icon = 'ic_show_password.svg'
            return m
          })
      }
    },
    acceptForm() {
      this.error = []
      this.validateInput = true
      const self = this
      setTimeout(() => {
        self.validateInput = false

        self.validateForm()
      }, 500)
    },
    validateForm() {
      if (this.error.length > 0) {
        this.showAlert({
          type: 'error',
          message: this.$t('rule.form'),
        })
      } else {
        const form = {}

        this.form.forEach((r) => {
          form[r.name] = r.value
        })

        if (form.password !== form.confirmPassword) {
          this.showAlert({
            type: 'error',
            message: this.$t('rule.validation.password.confirm'),
          })
        } else {
          this.$nuxt.$loading.start()

          this.$store.dispatch('passwordRecovery', form).then((result) => {
            if (result.status === true) {
              if (result.code === 100) {
                this.showAlert({
                  type: 'success',
                  message: result.message,
                })

                this.$router.push(this.localePath({ path: '/login' }))
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
          })
        }
      }
    },
    changeSubmit(_data) {
      this.error.push(_data)
    },
    submitForm() {
      this.acceptForm()
    },
  },
}
</script>
