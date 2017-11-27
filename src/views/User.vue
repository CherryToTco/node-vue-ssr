<template>
  <div class="user">
    <h1>{{ Msg }}</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        Msg:'Japanese'
      }
    },
    preFetch () {
      return this.methods.meta()
    },

    methods: {
      meta () {
        return {
          title: '用户视图',
          description: '这是一个用户视图',
          keywords: '用户'
        }
      }
    }
  }
</script>

<style>

</style>