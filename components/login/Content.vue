<template>
  <div id="login-content">
    <img
      id="logo-login"
      src="/img/ic_logo.svg"
      alt="Logo Backoffice"
      class="scale-in-bottom mb-5"
    />

    <GeneralForm
      v-show="form.length > 0"
      type="login"
      class-content="mt-5"
      :title="$t('title.login')"
      @accept="acceptForm"
    >
      <GeneralInput
        v-for="(input, index) in form"
        :key="index"
        v-model="input.value"
        :class="input.class"
        color-text="white-float"
        :label="input.label"
        :placeholder="input.placeholder"
        :name="input.name"
        :type="input.type"
        :validate="validateInput"
        :validation="input.validations"
        :input-style="input.inputStyle"
        :icon="input.icon"
        :icon-label="input.iconLabel"
        @setStatus="changeSubmit"
        @showPassword="showPassword"
      />

      <div id="forgot-password-button">
        <nuxt-link class="link-style" :to="localePath('/forgot-password')">{{
          $t('button.forgotPassword')
        }}</nuxt-link>
      </div>

      <div class="flex justify-content-center mb-3">
        <GeneralButton
          class-button="mt-5 py-3"
          type="submit"
          color="secondary-color"
          border="secondary-color"
          weight="bold"
          width="200px"
          font-size="1em"
          :label="$t('button.login')"
        />
      </div>
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
          label: this.$t('form.email.label'),
          placeholder: this.$t('form.email.placeholder'),
          name: 'email',
          value: '',
          type: 'email',
          iconLabel: 'ic_email.svg',
          class: 'mb-4',
          inputStyle: 'normal solo-login input-icon',
          validations: await generateValidation([
            { name: 'require' },
            { name: 'email' },
          ]),
        },
        {
          label: this.$t('form.password.label'),
          placeholder: this.$t('form.password.placeholder'),
          tooltip: this.$t('form.password.tooltip'),
          name: 'password',
          value: '',
          type: 'password',
          iconLabel: 'ic_password.svg',
          icon: 'ic_show_password.svg',
          class: 'mb-6',
          inputStyle: 'normal solo-login input-icon rigth-icon',
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

        this.$nuxt.$loading.start()

        this.$store.dispatch('login', form).then((result) => {
          if (result.status === true) {
            if (result.code === 100) {
              this.$router.push(this.localePath({ path: '/reports' }))
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
