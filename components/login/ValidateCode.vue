<template>
  <div id="forgot-content">
    <img
      id="logo-login"
      src="/img/ic_logo.svg"
      alt="Logo Backoffice"
      class="scale-in-bottom mb-6"
    />

    <GeneralForm
      type="login"
      :title="$t('title.validateCode')"
      @accept="acceptForm"
    >
      <p id="text-form">{{ $t('text.validateCode') }}</p>

      <div class="flex justify-content-center">
        <v-otp-input
          :input-classes="inputClass"
          :num-inputs="4"
          separator=" "
          :should-auto-focus="true"
          @on-complete="handleOnComplete"
          @on-change="handleOnChange"
        />
      </div>

      <div class="flex justify-content-center py-4">
        <span class="link-style" @click="sendCode">{{
          $t('button.resendCode')
        }}</span>
      </div>

      <GeneralButton
        class-button="py-3 block mx-auto mb-3"
        type="submit"
        color="secondary-color"
        border="secondary-color"
        weight="bold"
        width="200px"
        font-size="1em"
        :label="$t('button.validate')"
      />
    </GeneralForm>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    form: { code: '' },
    error: [],
    validateInput: false,
    actionsForm: [],
    hasError: false,
  }),
  computed: {
    inputClass() {
      let classes = 'otp-input'
      if (this.hasError) {
        classes += ' error'
      }

      return classes
    },
  },
  methods: {
    sendCode() {
      this.$nuxt.$loading.start()

      this.$store
        .dispatch('apiServices', {
          type: 'post',
          typeHeader: 'access',
          form: {
            url: `/onboarding/password-recovery`,
            content: { user: this.data },
          },
        })
        .then((result) => {
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
        })
    },
    handleOnComplete(value) {
      this.hasError = false
      this.form.code = value
    },
    handleOnChange(value) {
      this.hasError = false
      this.form.code = value
    },
    acceptForm() {
      if (this.form.code.length >= 4) {
        this.form.user = this.data

        this.$store.dispatch('verifyCode', this.form).then((result) => {
          if (result.code === 100) {
            this.$emit('changeView', {
              view: 'changePassword',
              additional: '',
            })
          } else {
            this.showAlert({
              type: 'error',
              message: result.message,
            })
          }
        })
      } else {
        this.hasError = true
        this.showAlert({
          type: 'error',
          message: this.$t('rule.form'),
        })
      }
    },
  },
}
</script>
