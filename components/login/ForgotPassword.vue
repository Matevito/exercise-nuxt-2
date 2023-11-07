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
      :title="$t('title.forgotPassword')"
      @accept="acceptForm"
    >
      <p id="text-form">{{ $t('text.forgotPassword') }}</p>
      <GeneralInput
        v-for="(input, index) in form"
        :key="index"
        v-model="input.value"
        color-text="white-float"
        :label="input.label"
        :placeholder="input.placeholder"
        :tooltip="input.tooltip"
        :name="input.name"
        :type="input.type"
        :validate="validateInput"
        :validation="input.validations"
        input-style="normal solo-login input-icon"
        :icon-label="input.iconLabel"
        @setStatus="changeSubmit"
      />

      <GeneralButton
        class-button="py-3 block mx-auto mb-3 mt-6"
        type="submit"
        color="secondary-color"
        border="secondary-color"
        weight="bold"
        width="200px"
        font-size="1em"
        :label="$t('button.sendCode')"
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
          label: this.$t('form.email.label'),
          placeholder: this.$t('form.email.placeholder'),
          name: 'user',
          value: '',
          type: 'email',
          iconLabel: 'ic_email.svg',
          validations: await generateValidation([
            { name: 'require' },
            { name: 'email' },
          ]),
        },
      ]
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

        this.$store
          .dispatch('apiServices', {
            type: 'post',
            typeHeader: 'access',
            form: {
              url: `/onboarding/password-recovery`,
              content: form,
            },
          })
          .then((result) => {
            if (result.status === true) {
              if (result.code === 100) {
                this.$emit('changeView', {
                  view: 'validateCode',
                  additional: form.user,
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
