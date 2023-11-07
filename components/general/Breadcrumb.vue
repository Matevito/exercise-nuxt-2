<template>
  <h2 v-show="route.length > 0" id="breadcrumb-page">
    <nuxt-link
      v-for="(item, index) in route"
      :key="index"
      :class="{ title: true, [item.class]: true }"
      :to="item.goTo"
    >
      <span class="p-mr-2">{{ item.text }}</span>
      <span v-if="index + 1 < route.length" class="p-mr-3 div-icon"></span>
    </nuxt-link>
  </h2>
</template>

<script>
export default {
  data: () => ({
    title: '',
    actualPage: '',
  }),
  head() {
    return {
      title: this.title,
      meta: [{ charset: 'utf-8' }],
    }
  },
  computed: {
    route() {
      return this.validatePage(this.actualPage)
    },
  },
  watch: {
    '$route.path'(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.actualPage = newVal
      }
    },
  },
  mounted() {
    this.actualPage = this.$route.path
  },
  methods: {
    validatePage(_page) {
      let route = []

      // ? Sección para Reportes
      if (_page.includes('reports')) {
        route = [
          { text: 'Reportes', class: 'principal-title', goTo: '/reports' },
        ]
        this.title = 'Reportes'
      }

      // ? Sección para Pagos
      else if (_page.includes('payment')) {
        route = [
          {
            text: 'Pagos a clientes',
            class: 'principal-title',
            goTo: '/payment',
          },
        ]
        this.title = 'Pagos a clientes'
      }

      // ? Sección para Parametrización
      else if (_page.includes('setting')) {
        route = [
          {
            text: 'Parametrización',
            class: 'principal-title',
            goTo: '/setting',
          },
        ]
        this.title = 'Parametrización'
      }

      // ? Sección para Categorías
      else if (_page.includes('category')) {
        route = [
          {
            text: 'Categorías',
            class: 'principal-title',
            goTo: '/category',
          },
        ]
        this.title = 'Categorías'
      }

      // ? Sección para Planes
      else if (_page.includes('plan')) {
        route = [
          {
            text: 'Planes',
            class: 'principal-title',
            goTo: '/plan',
          },
        ]
        this.title = 'Planes'
      }

      // ? Sección para Banco
      else if (_page.includes('exercise-catalog')) {
        route = [
          {
            text: 'Banco',
            class: 'principal-title',
            goTo: '/exercise-catalog',
          },
        ]
        this.title = 'Banco'
      }

      // ? Sección para Clientes
      else if (_page.includes('client')) {
        route = [
          {
            text: 'Clientes',
            class: 'principal-title',
            goTo: '/client',
          },
        ]
        this.title = 'Clientes'
      }

      // ? Sección para Administradores
      else if (_page.includes('admin')) {
        route = [
          {
            text: 'Administradores',
            class: 'principal-title',
            goTo: '/admin',
          },
        ]
        this.title = 'Administradores'
      }

      // ? Sección para Notificaciones
      else if (_page.includes('notification')) {
        route = [
          {
            text: 'Notificaciones',
            class: 'principal-title',
            goTo: '/notification',
          },
        ]
        this.title = 'Notificaciones'
      }

      // ? Sección para Países
      else if (_page.includes('country')) {
        route = [
          {
            text: 'Países',
            class: 'principal-title',
            goTo: '/country',
          },
        ]
        this.title = 'Países'
      }

      // ? Sección para Idiomas
      else if (_page.includes('language')) {
        route = [
          {
            text: 'Idiomas',
            class: 'principal-title',
            goTo: '/language',
          },
        ]
        this.title = 'Idiomas'
      }

      // ? Sección para Ayuda
      else if (_page.includes('help')) {
        route = [
          {
            text: 'Ayuda',
            class: 'principal-title',
            goTo: '/help',
          },
        ]
        this.title = 'Ayuda'
      }

      // ? Sección por defecto
      else {
        route = [
          {
            text: '404 - Página no encontrada',
            class: 'principal-title',
            goTo: '',
          },
        ]
        this.title = 'Página no encontrada'
      }

      return route
    },
  },
}
</script>

<style lang="scss">
#breadcrumb-page {
  padding-left: 15px;
  .title {
    font-size: 1.1em;
    font-weight: bold;
    text-decoration: none;
  }
  .div-icon {
    border-left: 1px solid;
  }
  .principal-title {
    color: #000000 !important;
  }
  .secondary-title {
    color: #c9ad17 !important;
  }
}
</style>
