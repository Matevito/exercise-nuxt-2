<template>
  <div class="app-container-table">
    <div class="table-project">
      <DataTable :value="fields" responsive-layout="scroll" :loading="loading">
        <Column
          v-for="(item, index) of headers"
          :key="index"
          :header="item.header"
          :header-style="item.headerStyle"
        >
          <template #body="slotProps">
            <img
              v-if="item.type === 'img'"
              :src="slotProps.data[item.field]"
              :class="item.fieldClass"
            />
            <nuxt-link
              v-else-if="item.type === 'principal'"
              v-tooltip.bottom="item.tooltip ? slotProps.data[item.field] : ''"
              :class="'principal-title ' + item.fieldClass"
              :to="getGoTo(slotProps, item)"
              >{{ slotProps.data[item.field] }}</nuxt-link
            >
            <div v-else-if="item.type === 'space'" class="space-column"></div>
            <p v-else-if="item.type === 'date'" :class="item.fieldClass">
              {{ formatText(slotProps.data[item.field], 'date') }}
            </p>
            <p v-else-if="item.type === 'time'" :class="item.fieldClass">
              {{ formatText(slotProps.data[item.field], 'time') }}
            </p>
            <p v-else-if="item.type === 'radio-type'" :class="item.fieldClass">
              {{
                slotProps.data[item.field] === 'podcast'
                  ? $t('radio.radioType.podcast')
                  : $t('radio.radioType.program')
              }}
            </p>
            <p v-else-if="item.type === 'duration'" :class="item.fieldClass">
              {{ slotProps.data[item.field] }} {{ $t('radio.duration') }}
            </p>
            <p
              v-else-if="item.type === 'statement-to'"
              :class="item.fieldClass"
            >
              {{ getStatementTo(slotProps.data[item.field]) }}
            </p>
            <p
              v-else-if="item.type === 'list-courses'"
              :class="item.fieldClass"
              v-html="generateListCourses(slotProps.data[item.field])"
            ></p>
            <GeneralStateSelector
              v-else-if="item.type === 'state'"
              :id="slotProps.data.id"
              :status="slotProps.data.options.status"
              :service="item.service"
              @reload="$emit('reload')"
            />
            <p
              v-else
              v-tooltip.bottom="item.tooltip ? slotProps.data[item.field] : ''"
              :class="item.fieldClass"
            >
              {{ slotProps.data[item.field] }}
            </p>
          </template>
        </Column>

        <template #loading>
          <p id="loading-text">{{ $t('table.loading') }}</p>
        </template>

        <template #empty>
          <GeneralEmptyTable :message="empty" />
        </template>
      </DataTable>
    </div>

    <Paginator :rows="limit" :total-records="pages" @page="onPage($event)" />
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      require: true,
      default: null,
    },
    fields: {
      type: Array,
      require: true,
      default: null,
    },
    empty: {
      type: String,
      require: true,
      default: '',
    },
    loading: {
      type: Boolean,
      require: true,
      default: true,
    },
    limit: {
      type: Number,
      required: true,
      default: 0,
    },
    pages: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  methods: {
    getGoTo(_prop, _item) {
      let url = ''

      switch (_item.action) {
        case 'update-radio':
          url = '/radio/update/' + _prop.data.id
          break
        case 'update-event':
          url = '/events/update/' + _prop.data.id
          break
        case 'update-statement':
          url = '/statement/update/' + _prop.data.id
          break

        default:
          break
      }

      return url
    },
    onPage(event) {
      this.$emit('change-page', event.page)
    },
    getStatementTo(_statement) {
      let item = ''

      switch (_statement) {
        case 'student':
          item = this.$t('statement.to.student')
          break
        case 'manager':
          item = this.$t('statement.to.manager')
          break
        default:
          item = this.$t('statement.to.all')
          break
      }

      return item
    },
    generateListCourses(_array) {
      const maxDigit = 3
      let result = ''

      if (_array.length === 0) {
        result = 'Sin programa'
      } else if (_array.length <= maxDigit) {
        _array.forEach((item) => {
          result += item.course.name
          result += '<br>'
        })
      } else {
        for (let index = 0; index < maxDigit - 1; index++) {
          const item = _array[index]

          result += item.course.name
          result += '<br>'
        }

        result += '+' + (_array.length - (maxDigit - 1)).toString() + ' más'
      }

      return result
    },
  },
}
</script>

<style lang="scss">
.app-container-table {
  .table-project {
    border-radius: 5px;
    background-color: white;
    cursor: default;
    padding-bottom: 5px;
    margin-bottom: 15px;
    thead {
      font-size: 1em;
      font-weight: 600;
      color: #fafafa;
      border: 1px solid #d6dde6;
      tr th span {
        color: #05206d;
      }
      tr {
        th:first-child {
          padding-left: 40px;
        }
        th:last-child {
          padding-right: 40px;
        }
      }
    }
    tbody {
      padding: 10px !important;
      a,
      p,
      span {
        font-size: 0.9em;
        color: #000000;
      }
      tr td {
        border-bottom: 1px solid #70707029 !important;
      }
      tr:last-child td {
        border-bottom: none !important;
      }
      tr:hover {
        background-color: #f7f7f7 !important;
      }
      tr {
        td:first-child {
          padding-left: 40px;
        }
        td:last-child {
          padding-right: 40px;
        }
      }
    }
    .rectangular-img {
      max-width: 140px;
      max-height: 68px;
      border-radius: 5px;
    }
    .principal-title {
      font-weight: 600;
      color: #05206d;
    }
    .text-truncated {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    #loading-text {
      text-align: center;
    }
    .p-component-overlay {
      background-color: rgba(162, 162, 162, 0.5);
      i {
        color: var(--primary-color);
      }
    }
  }

  .p-paginator {
    background-color: transparent;
    justify-content: flex-end;
    .p-paginator-element {
      background-color: white;
      color: #000000;
      font-weight: 500;
    }
    .p-highlight {
      background: var(--primary-color) !important;
      background-color: var(--primary-color) !important;
      color: #000000 !important;
    }
  }
}
</style>
