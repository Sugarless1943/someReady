<template>
  <div class="alarmBar"></div>
</template>

<script>
    export default {
        name: "test02"
    }
</script>

<style scoped>
  .alarmBar {
    height: 8px;
    background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
    background-size: 8px 8px;
    background-repeat: repeat-x;
  }
</style>
