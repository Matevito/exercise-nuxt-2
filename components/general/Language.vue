<template>
  <div id="languageSelector">
    <Dropdown
      v-show="availableLocales.length > 1"
      v-model="lang"
      :options="availableLocales"
      option-label="name"
      option-value="code"
      :filter="true"
      @change="changeLang(lang)"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="language-item">
          <img :src="selectedLang.image" />
          <div>{{ selectedLang.name }}</div>
        </div>
      </template>
      <template #option="slotProps">
        <div class="language-item">
          <img :src="slotProps.option.image" />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script>
export default {
  data: () => ({
    lang: null,
  }),
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    allLocales() {
      return this.$i18n.locales
    },
    selectedLang() {
      const lang = this.allLocales.filter((r) => r.code === this.lang)
      return lang[0]
    },
  },
  mounted() {
    if (this.$i18n.locale) this.lang = this.$i18n.locale
    else this.lang = 'es'
  },
  methods: {
    changeLang(_code) {
      this.$i18n.setLocale(_code)
    },
  },
}
</script>

<style lang="scss">
#languageSelector {
  position: absolute;
  top: 10px;
  right: 15px;
  width: 200px;
  display: flex;
  justify-content: flex-end;
  .language-item {
    display: flex;
    align-items: center;
    img {
      max-width: 20px;
      max-height: 20px;
      margin-right: 10px;
    }
  }
}
</style>
