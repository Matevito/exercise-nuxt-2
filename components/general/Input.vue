<template>
  <div
    class="general-input-text form-group"
    :class="{
      'form-group--error':
        Object.keys(validation).length > 0 && $v.value.$error,
      [colorText]: colorText !== '',
      [inputStyle]: inputStyle !== 'normal',
    }"
  >
    <span
      :class="{
        'default-input': inputStyle.includes('normal'),
        'p-float-label': inputStyle.includes('float'),
        'p-input-icon-right': inputStyle.includes('rigth-icon'),
        'p-input-icon-left': inputStyle.includes('left-icon'),
      }"
    >
      <i
        v-if="inputStyle.includes('rigth-icon')"
        class="ic-right"
        @click="clickIcon"
        ><img :src="`/img/icons/${icon}`"
      /></i>

      <i
        v-if="inputStyle.includes('left-icon')"
        class="ic-left"
        @click="clickIcon"
        ><img :src="`/img/icons/${icon}`"
      /></i>

      <label
        v-if="label !== '' && inputStyle.includes('normal')"
        :class="{ form__label: true }"
        :for="name"
      >
        <img v-if="iconLabel !== ''" :src="`/img/icons/${iconLabel}`" />
        <p>{{ label }}</p></label
      >
      <label
        v-if="information !== ''"
        :class="{ form__information: true }"
        :for="name"
        >{{ information }}</label
      >

      <div v-if="complement.validate" class="input-section">
        <div v-if="complement.prefix !== ''" class="prefix">
          {{ complement.prefix }}
        </div>
        <InputText
          :id="name"
          v-tooltip.bottom="tooltip"
          :value="value"
          :name="name"
          :type="type"
          :class="{ form__input: true }"
          :placeholder="placeholder"
          :min="size.validate && size.min !== -1 ? size.min : 0"
          :max="size.validate && size.max !== -1 ? size.max : 1000"
          :disabled="disabled"
          @input="sendInfo($event)"
          @keyup.enter.prevent="sendForm"
          @change="$emit('change', value)"
        />
        <div v-if="complement.suffix !== ''" class="suffix">
          {{ complement.suffix }}
        </div>
      </div>
      <InputText
        v-else
        :id="name"
        v-tooltip.bottom="tooltip"
        :value="value"
        :name="name"
        :type="type"
        :class="{ form__input: true }"
        :placeholder="placeholder"
        :min="size.validate && size.min !== -1 ? size.min : 0"
        :max="size.validate && size.max !== -1 ? size.max : 1000"
        :disabled="disabled"
        @input="sendInfo($event)"
        @keyup.enter.prevent="sendForm"
        @change="$emit('change', value)"
      />

      <label
        v-if="label !== '' && inputStyle.includes('float')"
        :class="{ form__label: true }"
        :for="name"
        >{{ label }}</label
      >
      <label
        v-if="counter.show"
        id="counter-text"
        :class="{ error: value.length > counter.max }"
        :for="name"
      >
        {{ value.length }} / {{ counter.max }}
      </label>
    </span>

    <div v-if="Object.keys(validation).length > 0 && $v.value.$error">
      <div
        v-for="(item, index) in Object.keys(validation.message)"
        :key="index"
      >
        <small
          v-show="!$v.value[item]"
          :class="{ error: true, 'p-error': $v.value.$error }"
          >{{
            $t(
              validation.message[item].key,
              validation.message[item].additional
            )
          }}</small
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    validate: {
      type: Boolean,
      required: true,
    },
    validation: {
      type: Object,
      required: true,
    },
    tooltip: {
      type: String,
      required: false,
      default: '',
    },
    inputStyle: {
      type: String,
      required: false,
      default: 'normal',
    },
    colorText: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    iconLabel: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: Object,
      required: false,
      default: () => ({
        validate: false,
        min: -1,
        max: 0,
      }),
    },
    complement: {
      type: Object,
      required: false,
      default: () => ({
        validate: false,
        suffix: '',
        prefix: '',
      }),
    },
    information: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      detault: false,
    },
    counter: {
      type: Object,
      required: false,
      default: () => ({
        show: false,
        max: 0,
      }),
    },
  },
  validations() {
    if (Object.keys(this.validation).length > 0) {
      const validation = { value: this.validation.validations }
      return validation
    }
  },
  watch: {
    validate(_new, _old) {
      if (_new) this.submit()
    },
  },
  mounted() {
    if (Object.keys(this.validation).length > 0) {
      this.$v.value.$reset()
    }
  },
  methods: {
    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$emit('setStatus', this.name)
      }
    },
    sendInfo(_value) {
      this.$emit('input', _value)
    },
    sendForm() {
      this.submit()

      this.$emit('submit')
    },
    clickIcon() {
      if (this.type === 'password' && this.icon === 'ic_show_password.svg') {
        this.$emit('showPassword', {
          show: true,
          name: this.name,
        })
      } else if (this.type === 'text' && this.icon === 'ic_hide_password.svg') {
        this.$emit('showPassword', {
          show: false,
          name: this.name,
        })
      }
    },
  },
}
</script>

<style lang="scss">
.general-input-text {
  p {
    margin: 0;
  }
  .default-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    label {
      margin-bottom: 7px;
    }
    .form__information {
      color: #6a6a6a;
      font-size: 0.8em;
    }
  }
  span,
  input {
    width: 100% !important;
  }
  #counter-text {
    text-align: right;
    font-size: 0.8em;
    color: #6a6a6a;
    &.error {
      color: #f44336;
    }
  }

  .input-section {
    display: flex;
    align-items: center;
    input {
      flex-grow: 1;
      display: inline-block;
    }
    div {
      flex-shrink: 1;
    }
    .suffix {
      padding-left: 10px;
    }
    .prefix {
      padding-right: 10px;
    }
  }
}
.general-input-text.solo-login {
  padding-bottom: 0 !important;
  label {
    color: #ffffff;
    font-size: 0.9em;
    font-weight: normal !important;
  }
  input {
    background: transparent;
    border: none;
    border: 1px solid #cacccf;
    color: #ffffff;
    font-size: 1em;
    border-radius: 6px;
    font-weight: normal !important;
    padding: 12px 15px;
    &:enabled:focus {
      box-shadow: none;
      border-color: #cacccf;
    }
    &::placeholder {
      color: #717171;
    }
  }
  .p-inputtext:enabled:hover {
    border-color: #ffffff !important;
  }
}

.general-input-text.input-icon {
  label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      max-width: 18px;
      max-height: 16px;
      margin: 0 10px;
      flex-shrink: 1;
    }
    p {
      flex-grow: 1;
      margin: 0;
    }
  }
}

.general-input-text.rigth-icon {
  .p-input-icon-right {
    .ic-right img {
      width: 20px;
      height: 20px;
      margin: 12px 5px;
    }
  }
  input {
    padding: 12px 45px 12px 15px;
  }
}

.general-input-text.solo-form {
  .form__label {
    color: #161420;
    font-weight: 600;
    font-size: 1em;
  }

  input {
    background: #f9faff;
    border: none;
    border: 1px solid #e3e3e3;
    color: #212121;
    font-size: 1em;
    border-radius: 5px;
    font-weight: normal !important;
    padding: 12px 15px;
    &:enabled:focus {
      box-shadow: none;
      border-color: #cacccf;
    }
    &::placeholder {
      color: #acadb0;
    }
  }
  .p-inputtext:enabled:hover {
    border-color: #e3e3e3 !important;
  }
}

.general-input-text.left-icon {
  .p-input-icon-left > i:first-of-type {
    left: 10px !important;
  }
  .p-input-icon-left {
    .ic-left img {
      height: 21px;
      margin-top: 11px;
    }
  }
  input {
    padding: 12px 15px 12px 40px;
  }
}
</style>
