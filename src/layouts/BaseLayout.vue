<template>
  <div class="container">
    <div class="content">
      <div class="wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 1;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  background: var(--content-app);
  border-radius: 2.5rem;
  padding: 1rem;
}

.wrapper {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 2rem;
  padding: 1rem;
}

@media (max-width: 1290px) {
  .container {
    background: var(--content-app);
  }
  
  .content {
    width: 100%;
  }
}
</style>
