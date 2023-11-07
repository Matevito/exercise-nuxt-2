<template>
  <form
    ref="form"
    method="post"
    :class="{ [classForm]: true }"
    @submit.prevent="$emit('accept')"
  >
    <h2 v-if="title !== ''" :class="{ [type]: type !== 'default' }">
      {{ title }}
    </h2>
    <h3 v-if="subtitle !== ''" :class="{ [type]: type !== 'default' }">
      {{ subtitle }}
    </h3>
    <div :class="{ [classContent]: classContent !== 'default' }">
      <div
        v-if="information && information.length > 0"
        class="information-form"
      >
        <p
          v-for="(item, index) in information"
          :key="index"
          :class="{ [`information-form${item.class}`]: true }"
        >
          {{ item.text }}
        </p>
      </div>
      <slot />
      <div
        v-if="additionalError && additionalError.length > 0"
        class="error-form"
      >
        <small v-for="(item, index) in additionalError" :key="index">
          * {{ item.message }}
        </small>
      </div>
    </div>
    <div
      v-if="actions && actions.length > 0"
      :class="{ [classAction]: classAction !== 'default' }"
    >
      <GeneralButton
        v-for="(item, index) in actions"
        :key="index"
        :class-button="item.classButton"
        :type="item.type"
        :color="item.color"
        :border="item.border"
        :width="item.width"
        :font-size="item.fontSize"
        :label="item.label"
        :text-color="item.textColor"
        :weight="item.weight"
        :url="item.url"
        :radius="item.radius"
        @click-delete="$emit('click-delete')"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    subtitle: {
      type: String,
      required: false,
      default: '',
    },
    information: {
      type: Array,
      required: false,
      default: null,
    },
    actions: {
      type: Array,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: 'default',
    },
    classForm: {
      type: String,
      required: false,
      default: '',
    },
    classContent: {
      type: String,
      required: false,
      default: 'default',
    },
    classAction: {
      type: String,
      required: false,
      default: 'default',
    },
    additionalError: {
      type: Array,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss">
form {
  width: 100%;
  h2 {
    color: #003366;
    font-size: 2em;
  }
  h2.login {
    color: #ffffff;
    font-size: 1.2em;
    position: relative;
    font-weight: bold;
    margin-bottom: 0 !important;
    padding-bottom: 0;
  }
  h2.form {
    background-color: #07468c;
    color: white;
    margin: 0;
    padding: 15px 100px;
    border-radius: 5px 5px 0 0;
    font-weight: bold;
    font-size: 1.6em;
  }
  .form-create-update {
    background-color: #ffffff;
    padding: 20px 100px;
    &__button {
      background-color: #f9f9ff;
      border-top: 1px solid #ddddff;
      padding: 20px 100px;
      display: flex;
      border-radius: 0 0 5px 5px;
      justify-content: center;
      align-items: center;
    }
  }
  .error-form {
    display: flex;
    flex-direction: column;
    small {
      color: #f44336;
    }
  }
}
.general-form {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 40px;
  .information-form {
    p {
      margin-top: 0;
      margin-bottom: 20px;
    }
    &__principal {
      color: #3e3e3e;
      font-weight: 600;
      font-size: 1.1em;
    }
    &__information {
      color: #3e3e3e;
      font-size: 1.1em;
    }
  }
  &--button {
    display: flex;
  }
}
.multiple-form {
  padding: 0;
  background-color: transparent;
}
</style>
