import { v4 as uuidv4 } from 'uuid'
import { enc } from '../utils/crypto'

export const state = () => ({
  accessToken: '',
  authToken: '',
  contentType: '',
  user: {},
})

export const mutations = {
  setAuthToken(state, data) {
    localStorage.setItem('auth', data)
    state.authToken = data
  },
  setAccessToken(state, data) {
    localStorage.setItem('access', data)
    state.accessToken = data
  },
  setUserData(state, data) {
    this.$cookies.set('userdata', data)
    state.user = data
  },
  setContentType(state, position) {
    switch (position) {
      case 0:
        state.contentType = 'multipart/form-data'
        break
      default:
        state.contentType = 'application/json'
        break
    }
  },
}

export const actions = {
  nuxtClientInit({ dispatch }, context) {
    dispatch('generateIdentification')
    dispatch('generateAccessToken')
  },
  generateIdentification({ commit }) {
    let uid = this.$cookies.get('uuid')
    if (!uid) {
      uid = uuidv4()

      this.$cookies.set('uuid', uid)
    }
  },
  async generateAccessToken({ commit }) {
    try {
      const access = localStorage.getItem('access')

      if (!access) {
        const shortName = process.env.SHORT_NAME

        const result = await this.$axios.$get(
          `/${shortName}/generate-access-token`
        )

        if (result.code === 100) {
          commit('setAccessToken', result.data.accessToken)
        }
      } else {
        commit('setAccessToken', access)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('No se consiguió el access: ', e)
    }
  },
  async apiServices({ dispatch }, settings) {
    try {
      settings.shortName = process.env.SHORT_NAME.toUpperCase()

      settings.lang = this.$cookies.get('i18n_redirected')

      if (!settings.typeHeader) settings.typeHeader = 'auth'

      if (settings.typeHeader === 'access')
        settings = await dispatch('configAccess', settings)
      else settings = await dispatch('configAuth', settings)

      if (settings.contentType === 0) {
        const formData = new FormData()

        Object.entries(settings.form.content).forEach((key) => {
          formData.append(key[0], key[1])
        })

        settings.form.content = formData
      }

      const result = await dispatch(`crud/${settings.type}`, settings.form)

      return result
    } catch (e) {
      const error = JSON.parse(JSON.stringify(e))

      // eslint-disable-next-line no-console
      console.error('Error en el Store: ', e, error)

      if (error.code === 'ECONNABORTED')
        // ? Error por timeout
        return {
          success: false,
          status: false,
          code: 101,
          message: this.$i18n.t('store.apiServices.timeOut'),
          error,
        }

      if (e.response) {
        if (e.response.status === 404) {
          if (e.response.data.message) {
            return {
              success: false,
              status: false,
              code: 102,
              message: e.response.data.message,
              error: e,
            }
          } else {
            // ? No encontró el servicio
            return {
              success: false,
              status: false,
              code: 101,
              message: this.$i18n.t('store.apiServices.notFound'),
              error,
            }
          }
        } else if (e.response.data.code === 120) {
          const user = this.$cookies.get('userdata')
          if (user) alert(this.$i18n.t('store.apiServices.sessionExpired'))
          else alert(this.$i18n.t('store.apiServices.loginRequired'))

          await dispatch(`logout`)

          return {
            success: false,
            status: false,
            code: 120,
            message: e.response.data.message,
            error: e,
          }
        } else if (e.response.data.message) {
          return {
            success: false,
            status: false,
            code: 102,
            message: e.response.data.message,
            error: e,
          }
        } else {
          return {
            success: false,
            status: false,
            code: 101,
            message: this.$i18n.t('store.apiServices.generalError'),
            error: e,
          }
        }
      } else {
        return {
          success: false,
          status: false,
          code: 101,
          message: this.$i18n.t('store.apiServices.generalError'),
          error: e,
        }
      }
    }
  },
  async login({ commit, dispatch }, form) {
    const password = form.password
    delete form.password
    const passwordEnc = enc(password)
    const dataSend = {
      ...form,
      iv: passwordEnc.iv,
      password: passwordEnc.password,
      platform: 'backoffice',
      type: 'lc',
      pushToken: this.$cookies.get('uuid'),
      version: '1.0.0',
    }

    const result = await dispatch(`apiServices`, {
      type: 'post',
      typeHeader: 'access',
      form: {
        url: `/onboarding/login`,
        content: dataSend,
      },
    })

    if (result.code === 100) {
      const body = result.data
      const authToken = result.data.authToken

      delete body.authToken

      commit('setUserData', body.user)
      commit('setAuthToken', authToken, { root: true })
    }

    return result
  },
  async verifyCode({ commit, dispatch }, form) {
    const result = await dispatch(`apiServices`, {
      type: 'post',
      typeHeader: 'access',
      form: {
        url: `/onboarding/verify-code`,
        content: form,
      },
    })

    if (result.code === 100) {
      const authToken = result.data.authToken
      commit('setAuthToken', authToken, { root: true })
    }

    return result
  },
  async passwordRecovery({ commit, dispatch }, form) {
    const password = form.password
    const passwordEnc = enc(password)
    const dataSend = {
      iv: passwordEnc.iv,
      password: passwordEnc.password,
    }

    const result = await dispatch(`apiServices`, {
      type: 'put',
      form: {
        url: `/onboarding/update-password`,
        content: dataSend,
      },
    })

    return result
  },
  async updateProfile({ commit, dispatch }, form) {
    const result = await dispatch(`apiServices`, {
      type: 'put',
      typeHeader: 'access',
      form: {
        url: `/onboarding/editProfile`,
        content: form,
      },
    })

    if (result.code === 100) {
      const body = result.body
      const authToken = result.body.authToken

      delete body.authToken

      commit('setUserData', body)
      commit('setAuthToken', authToken, { root: true })
    }

    return result
  },
  async logout({ commit, dispatch }) {
    let settings = {}

    settings.form = {
      url: '/onboarding/logout',
    }

    settings.shortName = process.env.SHORT_NAME.toUpperCase()

    settings.lang = this.$cookies.get('i18n_redirected')

    settings.typeHeader = 'auth'

    settings = await dispatch('configAuth', settings)

    try {
      await dispatch(`crud/get`, settings.form)
    } catch (e) {
      console.log('Falló al desvincular la cuenta', e)
    }

    this.$cookies.remove('userdata')
    commit('setAuthToken', '', { root: true })
    this.$router.push(this.localePath({ path: '/login' }))
  },
  configAuth({ _ }, settings) {
    const authToken = this.getters.getAuthToken

    settings.form.config = {
      headers: {
        [`X-${settings.shortName}-Auth-Token`]: authToken,
        lang: settings.lang,
      },
      timeout: 90000,
    }

    return settings
  },
  configAccess({ _ }, settings) {
    const accessToken = this.getters.getAccessToken

    settings.form.config = {
      headers: {
        [`X-${settings.shortName}-Access-Token`]: accessToken,
        lang: settings.lang,
      },
      timeout: 90000,
    }

    return settings
  },
}

export const getters = {
  getAccessToken: (state) => {
    return state.accessToken || localStorage.getItem('access')
  },
  getAuthToken: (state) => {
    return state.authToken || localStorage.getItem('auth')
  },
}
