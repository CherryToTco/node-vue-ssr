<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<router-link to="/user">to user</router-link>
		<router-view/>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        msg :'today is sunday'
      }
    },
    preFetch () {
      return this.methods.meta()
    },

    methods: {
      meta () {
        return {
          title: 'home view',
          description: 'this is home description',
          keywords: 'home, view'
        }
      }
    }
  }
</script>

<style>
</style>