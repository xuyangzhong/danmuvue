<template>
  <div id="app" class="app">
    <Layout>
      <Header class="header">
        <page-head></page-head>
      </Header>
      <Content class="content" :style="conheight">
        <!--        <button v-on:click="showData">nihao</button>-->
        <router-view></router-view>
      </Content>
      <Footer class="footer">
        <page-foot></page-foot>
      </Footer>
    </Layout>
  </div>
</template>

<script>

    import PageHead from "./components/PageHead";
    import PageFoot from "./components/PageFoot";

    export default {
        name: 'App',
        components: {
            PageHead,
            PageFoot
        },
        data: function () {
            return {
                conheight:{
                    height:''
                }
            }
        },
        methods: {
            showData() {
                let data = {
                    username: 'ssssss',
                    password: 'asdasd',
                }
                this.$http.post("/user/checklogin", data).then((res) => {
                    console.log(JSON.stringify(res))
                    console.log(res.data.user)
                })
                    .catch((err) => {
                        console.log(111)
                        console.log("调用失败", err)
                    })
            },
            getHeight(){
                this.conheight.height=window.innerHeight-125+'px';
            }
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        }
    }
</script>

<style>
  .header {
    background: white !important;
    height: 60px;
  }

  .footer {
    position: absolute;
    bottom: 0; /* 关键 */
    left: 0; /* IE下一定要记得 */
    height: 60px; /* footer的高度一定要是固定值*/
    text-align: center !important;
    width: 100%;
  }

  .split-line {
    width: 100%;
    height: 5px;
    /*background: silver;*/
  }

  .content {
    background: url("./imgs/login.jpg");
    /*min-height: cacl(100% - 170px);*/
  }

  .app {
    /*background: gray;*/
  }
</style>
