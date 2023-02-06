<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button @click="showDialog" style="margin: 15px 0"
      >Cоздать пост</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
export default {
  components: { PostList, PostForm },
  data() {
    return {
      posts: [
        { id: 1, title: 'JS 1', body: 'Описание 1' },
        { id: 2, title: 'JS 2', body: 'Описание 2' },
        { id: 3, title: 'JS 3', body: 'Описание 3' },
      ],
      dialogVisible: false,
    }
  },
  methods: {
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
</style>
