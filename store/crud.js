export const actions = {
  async get({ _ }, form) {
    const res = await this.$axios.$get(form.url, form.config)
    return res
  },

  async post({ _ }, form) {
    const res = await this.$axios.$post(form.url, form.content, form.config)
    return res
  },

  async put({ _ }, form) {
    const res = await this.$axios.$put(form.url, form.content, form.config)
    return res
  },

  async delete({ _ }, form) {
    const res = await this.$axios.$delete(form.url, form.config)
    return res
  },
}
