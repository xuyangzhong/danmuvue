<template>
  <div class="hello">
    dididia
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    methods:{
      showData(){
        this.$http.get("/news/index").then((res)=>{
            console.log(res.data.articles)
        })
            .catch((err)=>{
                console.log("调用失败",err)
            })
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {*/
/*  font-weight: normal;*/
/*}*/
/*ul {*/
/*  list-style-type: none;*/
/*  padding: 0;*/
/*}*/
/*li {*/
/*  display: inline-block;*/
/*  margin: 0 10px;*/
/*}*/
/*a {*/
/*  color: #42b983;*/
/*}*/
</style>
