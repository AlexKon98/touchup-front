<template>
  <header class="header">
    <div class="container">
      <span>Some header</span>

      <NuxtLink to="/">To main</NuxtLink>
    </div>
  </header>
</template>


<style lang="scss" scoped>
.header {
  .container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>