<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <!-- <div v-if class="loader"></div> -->
    <div class="app__btns">
      <my-button @click="showDialog">Cоздать пост</my-button>

      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else class="loader">Загрузка...</div>
  </div>
</template>

<script>
import axios from 'axios'

import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
export default {
  /*  поле components - для регистации комопнентов */
  components: { PostList, PostForm },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' },
      ],
    }
  },
  methods: {
    /* мы подписались на это событие и принимаем post из компонента PostForm */
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        )
        this.posts = res.data
      } catch (error) {
        alert('ошибка')
      } finally {
        this.isPostsLoading = false
      }
    },
  },
  /* хук для того, чтобы сделать запрос на сервер после маунта  */
  mounted() {
    this.fetchPosts()
  },

  /* здесь не будет мутации исходного массива т.к. мы развернули текущий массив posts */
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
  },

  watch: {
    /* функция наблюдатель должна иметь такое же название как и модель объявленная в компоненте (и когда наша модель selectedSort изменится, то это функция будет вызвана) (аналог useEffect в React). Параметром наша функция принимает новое значение, т.е. то на что была изменена модель. В нашем примере функция sort мутирует исходный массив  */
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // },
  },
}
</script>

<!-- флаг scoped - значит, что стили будут применяться только к этому комопненту -->
<style>
.app {
  padding: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
