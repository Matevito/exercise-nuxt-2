<template>
  <div id="content-empty">
    <img src="/img/ic_empty_table.svg" />
    <h2>Esta pagina se encuentra en proceso</h2>
    <p>{{ message }}</p>
    <NuxtLink id="button-back" to="/">Inicio</NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
#content-empty {
  padding: 60px 10px;
  width: 90%;
  max-width: 900px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100%;
    max-width: 500px;
    max-height: 300px;
  }
  h2 {
    margin-top: 40px;
    color: #3c3c3c;
    font-size: 1.6em;
  }
  p {
    color: #212121;
    font-size: 1em;
    width: 100%;
    max-width: 600px;
    text-align: center;
  }
  #button-back {
    background-color: #fff761;
    border-radius: 5px;
    height: 46px;
    width: 195px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #3c3c3c;
    font-size: 0.85em;
    font-weight: bold;
    margin-top: 33px;
  }
}
</style>
