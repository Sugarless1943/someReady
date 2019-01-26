<template>
    <div :class="['alerts',{'header_show': show}]" :style="{'z-index': data.index}">{{data.content}}<button @click="click(data.id)">click</button></div>
</template>

<script>
    export default {
      name: "alerts",
      props: ['data'],

      data() {
        return {
          show: false
        }
      },

      methods: {
        click(id) {
          this.show = false

          setTimeout(() => {
            this.$emit('close')
          },1000)
        }
      },

      created() {
        setTimeout(() => {
          this.show = true
        }, 1000)
      }
    }
</script>

<style scoped>
  .alerts {
    position: fixed;
    font-size: 14px;
    color: #000;
    width: inherit;
    margin: 0 auto;
    transition: transform .3s, opacity .3s;
    opacity: 1;
    top: -38px;
    background: red;
  }

  .header_show {
    transform: translateY(100px);
    /*top: 60px !important;*/
    opacity: 1 !important;
  }
</style>
