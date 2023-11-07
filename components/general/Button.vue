<template>
  <Button
    :class="classButton"
    :type="type === 'submit' ? type : 'button'"
    :style="`backgroundColor: var(--${color}); border: 1px solid var(--${border}); color: var(--${textColor}); width: ${width}; border-radius: ${radius}; font-size: ${fontSize}; font-weight: ${weight}`"
    :label="label"
    @click="buttonClick"
  />
</template>

<script>
export default {
  props: {
    classButton: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
      default: 'primary-color',
    },
    border: {
      type: String,
      required: false,
      default: 'primary-color',
    },
    textColor: {
      type: String,
      required: false,
      default: 'text-color',
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    width: {
      type: String,
      required: false,
      default: '100%',
    },
    radius: {
      type: String,
      required: false,
      default: '9px',
    },
    fontSize: {
      type: String,
      required: false,
      default: '1.4em',
    },
    weight: {
      type: String,
      required: false,
      default: 'normal',
    },
    url: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    buttonClick() {
      if (this.type === 'redirect') {
        this.$router.push(this.localePath({ path: this.url }))
      }
      if (this.type === 'delete') {
        this.$emit('click-delete')
      }
    },
  },
}
</script>
