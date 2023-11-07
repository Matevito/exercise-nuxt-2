<template>
  <div id="filter-input" class="mb-4 flex p-flex-wrap">
    <div
      v-for="(item, index) in filters"
      :key="index"
      class="p-mr-4"
      :style="`width:${item.width}`"
    >
      <span
        v-if="item.type === 'search'"
        class="input-search p-input-icon-right"
      >
        <i class="pi pi-search" @click="changeFilter(item)" />
        <InputText
          :id="item.name"
          v-model="item.value"
          :name="item.name"
          type="text"
          :placeholder="item.placeholder"
          style="width: 100%"
          @keyup.enter.prevent="changeFilter(item)"
        />
      </span>

      <Calendar
        v-if="item.type === 'date'"
        v-model="item.value"
        class="input-calendar"
        :name="item.name"
        :placeholder="item.placeholder"
        :show-button-bar="true"
        @date-select="changeFilterDate(item)"
        @clear-click="changeFilterDate(item)"
      />

      <Dropdown
        v-if="item.type === 'select'"
        v-model="item.value"
        class="input-select"
        :name="item.name"
        :options="item.options"
        option-label="text"
        :placeholder="item.placeholder"
        :show-clear="true"
        @change="changeFilterSelect(item)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    form: {},
  }),
  watch: {
    form: {
      handler(_new, _old) {
        this.$emit('filter', _new)
      },
      deep: true,
    },
  },
  methods: {
    changeFilter(_item) {
      this.form = {
        ...this.form,
        [_item.name]: _item.value,
      }
    },
    changeFilterDate(_item) {
      this.form = {
        ...this.form,
        [_item.name]: _item.value
          ? this.formatText(_item.value, 'date-send')
          : '',
      }
    },
    changeFilterSelect(_item) {
      this.form = {
        ...this.form,
        [_item.name]: _item.value ? _item.value.value : '',
      }
    },
  },
}
</script>

<style lang="scss">
#filter-input {
  .input-search {
    width: 100%;
    position: relative;
    i {
      color: white;
      background: #0f1b3c;
      border-radius: 5px;
      cursor: pointer;
      padding: 7px;
      top: 50%;
      right: 3px;
      transform: translateY(-50%);
      margin-top: 0;
    }
    input {
      border-color: #bbd2eb;
      border-radius: 5px;
      &:enabled:focus {
        box-shadow: none;
        border-color: var(--secondary-color);
      }
      &::placeholder {
        color: #bababa;
      }
    }
  }

  .input-calendar input {
    width: 100% !important;
    border-color: #bbd2eb !important;
    border-radius: 5px !important;
    &:enabled:focus {
      box-shadow: none !important;
      border-color: var(--secondary-color) !important;
    }
    &::placeholder {
      color: #bababa !important;
    }
  }

  .input-select {
    width: 100%;
    border-color: #bbd2eb;
    border-radius: 5px;
    .p-dropdown-trigger-icon {
      color: var(--secondary-color);
    }
    .p-placeholder {
      color: #bababa;
    }
    &:not(.p-disabled).p-focus {
      box-shadow: none;
      border-color: var(--secondary-color);
    }
  }
}
</style>
