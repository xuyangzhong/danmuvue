<template>
  <Menu mode="horizontal" theme="light" active-name="1">
    <img id="logo" src="../imgs/logo.png" v-on:click="goIndex()">
    <span class="float-right margin-right-100">
      <MenuItem name="1">
        <Icon type="ios-paper"/>
        全部弹幕
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"/>
        弹幕查找
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats"/>
          统计分析
        </template>
        <MenuGroup title="观众分析">
          <MenuItem name="3-1">观众等级</MenuItem>
          <MenuItem name="3-2">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="主播分析">
          <MenuItem name="3-3">主播肖像</MenuItem>
          <MenuItem name="3-4">待续</MenuItem>
        </MenuGroup>
      </Submenu>

      <MenuItem name="4" v-if="isLogin == null || isLogin == false" v-on:click.native="userLogin()">
        <Icon custom="iconfont people_fill" size="small"/>
        登录
      </MenuItem>
      <Submenu name="5" v-else>
        <template slot="title">
           <Icon custom="iconfont people_fill" size="small"/>
          {{user.username}}
        </template>
        <MenuGroup>
          <MenuItem name="5-1">个人中心</MenuItem>
          <MenuItem name="3-2" v-on:click.native="userLogout()">退出</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
      </Submenu>
    </span>
  </Menu>
</template>

<script>

    export default {
        name: "PageHead",
        data() {
            return {
                user: {
                    username:'',
                    mobile:''
                },
                isLogin : false
            }
        },
        computed: {
        },
        methods: {
            userLogin() {
                this.$router.push("/login")
            },
            goIndex(){
                this.$router.push("/")
            },
            userLogout(){
                this.$store.commit("removeUser");
                debugger
                window.location.reload()
            }
        },
        created() {
            debugger
            console.log(222)
            this.isLogin = this.$store.getters.getLoginState;
            this.user = this.$store.getters.getUser;
            console.log(333)
            console.log(JSON.stringify(this.user))
            console.log(this.isLogin)
        }

    }
</script>

<style scoped>
  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  #logo {
    margin-left: 100px;
    height: 60px;
    width: 120px;
  }

  .margin-right-100 {
    margin-right: 100px;
  }
</style>
