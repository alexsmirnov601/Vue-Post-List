<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  /* для глобального комопнента */
  name: 'my-button',
}
</script>
<style scoped>
.btn {
  align-self: flex-end;
  /* margin-top: 15px; */
  padding: 10px 15px;
  color: teal;
  background: none;
  border: 1px solid teal;
}
</style>

<!-- style="margin-top: 15px" -->
