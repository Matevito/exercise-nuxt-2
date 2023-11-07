<template>
  <div
    class="add-language"
    :style="{
      margin,
    }"
  >
    <p v-if="label !== ''" class="label-language">{{ label }}</p>
    <button
      v-if="defaultLanguages.length <= 0 || !showCounter"
      type="button"
      class="button-language-add"
      @click="createLanguage"
    >
      <i>
        <img src="/img/icons/ic_add_translation.svg" :alt="$t('button.add')" />
      </i>
      {{ $t('button.add') }}
    </button>
    <button
      v-else
      type="button"
      class="button-language-add"
      @click="addLanguage"
    >
      {{ defaultLanguages.length }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    margin: {
      type: String,
      required: false,
      default: '0',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    defaultLanguages: {
      type: Array,
      required: true,
    },
    showCounter: {
      type: Boolean,
      required: false,
      default: true,
    },
    page: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    defaultPage: '/create-language',
  }),
  methods: {
    createLanguage() {
      const dataSend = {
        show: true,
        languages: this.defaultLanguages,
        page: this.page + this.defaultPage,
      }

      if (!this.showCounter) {
        dataSend.page = ''
      }

      this.$store.commit('languageModal/setData', dataSend)
    },
    addLanguage() {
      this.$router.push(this.localePath({ path: this.page + this.defaultPage }))
    },
  },
}
</script>

<style lang="scss">
.add-language {
  .label-language {
    font-size: 1em;
    color: #090c13;
    margin: 0 0 5px 0;
    font-weight: bold;
  }
  .button-language-add {
    border-width: 0;
    padding: 13px 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: #eef4ff;
    font-size: 1.04em;
    color: #184da2;
    border-radius: 5px;
    font-weight: 600;
    i {
      margin: -13px 25px -13px -25px;
      background: #e4ecfc;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      padding: 11px 0;
      img {
        height: 25px;
      }
    }
  }
}
</style>
