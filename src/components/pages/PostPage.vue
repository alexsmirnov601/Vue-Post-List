<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="showDialog">Cоздать пост</my-button>

      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else class="loader">Загрузка...</div>
    <div ref="observer" class="observer"></div>
    <!-- Здесь была пагинация по страницам -->
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNum in totalPages"
        :key="pageNum"
        class="page"
        :class="{
          'current-page': page === pageNum,
        }"
        @click="changePage(pageNum)"
      >
        {{ pageNum }}
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
export default {
  /*  поле components - для регистации комопнентов */
  components: { PostList, PostForm },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
    // Функция для пагинации по страницам
    // changePage(pageNum) {
    //   this.page = pageNum
    //   // this.fetchPosts()
    // },

    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        )
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = res.data
      } catch (error) {
        alert('ошибка')
      } finally {
        this.isPostsLoading = false
      }
    },
    /* эта функция вызывается, когда пользователь доскроллил до конца страницы */
    async loadMorePosts() {
      try {
        this.page += 1

        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        )
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit)
        /* В этом случае мы посты не перезаписываем, а добавляем в конец массива */
        this.posts = [...this.posts, ...res.data]
      } catch (error) {
        alert('ошибка')
      }
    },
  },
  /* хук для того, чтобы сделать запрос на сервер после маунта  */
  mounted() {
    this.fetchPosts()
    // console.log(this.$refs.observer)

    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
        // console.log('crossed')
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },

  /* здесь не будет мутации исходного массива т.к. мы развернули текущий массив posts */
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    /* в новом computed свойстве мы используем старое */
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    // console.log(post.title)
  },

  watch: {
    /* функция наблюдатель должна иметь такое же название как и модель объявленная в компоненте (и когда наша модель selectedSort изменится, то это функция будет вызвана) (аналог useEffect в React). Параметром наша функция принимает новое значение, т.е. то на что была изменена модель. В нашем примере функция sort мутирует исходный массив  */
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // },
    //  Функция для пагинации по страницам
    // page() {
    //   this.fetchPosts()
    // },
  },
}
</script>

<!-- флаг scoped - значит, что стили будут применяться только к этому комопненту -->
<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 3px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
