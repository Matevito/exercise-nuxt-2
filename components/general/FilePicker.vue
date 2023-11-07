<template>
  <div class="container-file-picker">
    <div class="mx-auto imageDiv">
      <div id="img" :style="'background-image: url(' + image + ');'" />
      <input
        id="inputForUploadImage"
        :ref="refs"
        type="file"
        style="display: none"
        accept="image/jpg"
        size="1"
        @change="onFilePicked"
      />
    </div>
    <div class="container-file-picker__text">
      <p class="textImage">
        Sube una imagen en <span>{{ extension.imageName }}</span
        >, máximo <span>{{ measures.width }} x {{ measures.height }} px</span>,
        evita superar el peso de <span>{{ size.message }}</span>
      </p>
      <div class="uploadPhotoButton" @click="openImage">Subir</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultImage: {
      type: String,
      required: false,
      default: '',
    },
    refs: {
      type: String,
      required: false,
      default: 'image',
    },
    measures: {
      type: Object,
      required: false,
      default: () => ({
        validate: false,
        width: 0,
        height: 0,
      }),
    },
    size: {
      type: Object,
      required: false,
      default: () => ({
        validate: true,
        size: 1000000,
        message: '1 MB',
      }),
    },
    extension: {
      type: Object,
      required: false,
      default: () => ({
        validate: true,
        regex: /(.jpg)$/i,
        imageName: '.JPG',
        message: 'La única extensión permitida para subir la imagen es .jpg',
      }),
    },
  },
  data: () => ({
    image: '',
  }),
  mounted() {
    this.image = this.defaultImage
  },
  methods: {
    openImage() {
      this.$refs[this.refs].click()
    },
    fileOnload(e) {
      const result = e.target.result
      const element = document.getElementById('img')
      element.setAttribute('style', 'background-image: url("' + result + '");')
    },
    onFilePicked(e) {
      // ? Define input
      const fileInput = document.getElementById('inputForUploadImage')
      // ? Define path file
      const filePath = fileInput.value
      // ? Define extensions
      const allowedExtensions = this.extension.regex

      const file = fileInput.files[0]

      // ? Identify the extension from the file selected
      if (this.extension.validate && !allowedExtensions.exec(filePath)) {
        const element = document.getElementById('img')
        element.setAttribute(
          'style',
          'background-image: url("' + this.image + '");'
        )

        this.showAlert({
          message: this.$t(this.extension.message),
        })
        fileInput.value = ''

        this.$emit('save-image', '')
        return false
      }

      if (this.size.validate && file.size > this.size.size) {
        const element = document.getElementById('img')
        element.setAttribute(
          'style',
          'background-image: url("' + this.image + '");'
        )
        this.showAlert({
          message:
            'El tamaño de la imagen es mayor al permitido (' +
            this.size.message +
            '). Tamaño actual = ' +
            file.size / this.size.size +
            'MB',
        })
        fileInput.value = ''
        this.$emit('save-image', '')
        return false
      } else {
        const self = this

        const img = new Image()
        img.onload = function () {
          if (
            self.measures.validate &&
            (this.width.toFixed(0) > self.measures.width ||
              this.height.toFixed(0) > self.measures.height)
          ) {
            const element = document.getElementById('img')
            element.setAttribute(
              'style',
              'background-image: url("' + self.image + '");'
            )
            self.showAlert({
              message:
                'Las medidas deben ser menores a: ' +
                this.measures.width +
                ' * ' +
                this.measures.height +
                '. Medidas de tu imagen: ' +
                this.width.toFixed(0) +
                ' * ' +
                this.height.toFixed(0),
            })
            fileInput.value = ''
            self.$emit('save-image', '')
          } else {
            const file = e.target.files[0]
            const imageType = /image.*/

            if (!file.type.match(imageType)) {
              return
            }

            const reader = new FileReader()
            reader.onload = self.fileOnload
            reader.readAsDataURL(file)

            self.image = self.$refs[self.refs].files[0]
            self.$emit('save-image', self.image)
          }
        }
        img.src = URL.createObjectURL(file)
      }
    },
  },
}
</script>

<style lang="scss">
.container-file-picker {
  display: flex;
  .imageDiv {
    width: 230px;
    height: 140px;
    max-width: 230px;
    max-height: 140px;
    position: relative;
    margin-bottom: 20px;
    background-color: #ffffff;
    border: 1px solid #cacccf;
    background-image: url('/img/ic_image.svg');
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: center;
    position: relative;
    border-radius: 5px;
    #img {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  &__text {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .textImage {
    max-width: 200px;
    margin-bottom: 20px;
    font-size: 0.8em;
    color: #a0a4a8;
    span {
      color: #100e0c;
    }
  }
  .uploadPhotoButton {
    font-size: 0.9em;
    color: #000000;
    font-weight: 500;
    background-color: #ffdf32;
    cursor: pointer;
    border-radius: 5px;
    padding: 6px;
    text-align: center;
    width: 126px;
  }
}
</style>
