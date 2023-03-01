<template>
  <div>
    <form @submit.prevent>
      <h4>Создание поста</h4>
      <my-input v-model="post.title" type="text" placeholder="Название" />
      <my-input v-model="post.body" type="text" placeholder="Описание" />
      <my-button @click="createPost">Создать</my-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    }
  },

  methods: {
    createPost() {
      this.post.id = Date.now()
      /* с помощью этого синтаксиса мы генерируем событие на который подпишется род компонент. ($emit - это специальная функция) Первый параметр - событие, которы мы генерируем, второй и последующие параметры - это аргументы, которые будут попадать в соотв. функцию после того, как на нее подпишется род. коммонент */
      this.$emit('create', this.post)
      /* отчищаем поля ввода */
      this.post = {
        title: '',
        body: '',
      }
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
