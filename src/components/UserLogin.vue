<template>
  <div
    :style="{'margin-top':loginStyle.marginTop,'margin-left':loginStyle.marginLeft,'margin-right':loginStyle.marginRight}">
    <Card style="width:400px">
      <Row :gutter="32">
        <Col span="24" class="demo-tabs-style1">
          <Tabs>
            <TabPane label="登录">
              <Form ref="login" :model="login" :rules="loginRules" class="signin" style="margin-top:30px">
                <FormItem label="账号" prop="mobile" :label-width="60">
                  <Input type="text" v-model="login.mobile" placeholder="输入手机号">
                    <!--                    <Icon type="ios-person-outline" slot="prepend"></Icon>-->
                    <Icon custom="iconfont people_fill" size="small" slot="prepend"/>
                  </Input>
                </FormItem>
                <FormItem label="密码" prop="password" :label-width="60">
                  <Input type="password" v-model="login.password" placeholder="输入密码">
                    <Icon custom="iconfont message_fill" size="small" slot="prepend"/>
                  </Input>
                </FormItem>
                <CheckboxGroup v-model="remember">
                  <Checkbox label="记住密码(7天有效)" style="margin-left: 80px"></Checkbox>
                </CheckboxGroup>
                <FormItem style="text-align:center">
                  <!--                  <p class="error-text" v-show="login.error.all">{{Login.error.all}}</p>-->
                  <Button type="primary" @click="loginSubmit('login')"
                          style="width:80px;font-size:16px;margin-top: 20px">登录
                  </Button>
                </FormItem>
                <FormItem>

                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="注册">
              <Form ref="register" :model="register" :rules="registerRules" class="signup" style="margin-top:30px">
                <FormItem prop="mobile" label="手机号" :label-width="80">
                  <Input type="text" v-model="register.mobile" placeholder="输入手机号" style="text-align:center">
                    <Icon custom="iconfont phone_fill" size="small" slot="prepend"/>
                  </Input>
                </FormItem>
                <FormItem prop="code" label="验证码" :label-width="80">
                  <div class="flex">
                    <Input type="text" v-model="register.code" placeholder="输入获取的验证码" style="text-align:center">
                      <Icon custom="iconfont copyto" size="small" slot="prepend"/>
                    </Input>
                    <Button type="primary" @click="sendCode" class="code-button" :loading="sendCodeLoading"
                            :disabled="sendCodeDisabled">
                      {{codeButtonMsg}}
                    </Button>
                  </div>
                </FormItem>
                <FormItem prop="password" label="密码" :label-width="80">
                  <Input type="password" v-model="register.password" placeholder="输入密码">
                    <Icon custom="iconfont message_fill" size="small" slot="prepend"/>
                  </Input>
                </FormItem>
                <FormItem style="text-align:center">
                  <!--                              <p class="error-text marb8" v-show="Register.error.error">{{Register.error.error}}</p>-->
                  <Button type="primary" @click="registerSubmit('register')" style="width:80px;font-size:16px">注册
                  </Button>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
    import {Cookie} from "../axios";

    export default {
        name: "UserLogin",
        data() {
            return {
                switch1: false,
                loginRules: {
                    mobile: [
                        {
                            required: true, message: "用户名不能为空", trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true, message: "密码不能为空", trigger: 'blur'
                        },
                        {
                            type: 'string', min: 3, message: "密码不能少于3位", trigger: 'blur'
                        }
                    ]
                },
                registerRules: {
                    mobile: [
                        {
                            required: true, message: "用户名不能为空", trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true, message: "密码不能为空", trigger: 'blur'
                        },
                        {
                            type: 'string', min: 3, message: "密码不能少于3位", trigger: 'blur'
                        }
                    ],
                    code: [
                        {
                            required: true, message: "验证码不能为空", trigger: 'blur'
                        }
                    ],
                },
                remember: [],
                codeButtonMsg: '发送验证码',
                loginStyle: {
                    height: '300px',
                    widht: '420px',
                    marginLeft: '',
                    marginRight: '',
                    marginTop: '',
                },
                login: {
                    mobile: '',
                    password: ''
                },
                register: {
                    mobile: '',
                    password: '',
                    code: ''
                },
                sendCodeLoading: false,
                sendCodeDisabled: false,
                count: 5
            }

        },
        created() {
            debugger
            window.addEventListener('resize', this.getDivStyle());
            this.getDivStyle();
        },
        methods: {
            sendCode() {
                this.sendCodeLoading = true;
                this.$http.get('/user/sendCode').then((res) => {
                    console.log(res.data.code);
                    this.register.code = res.data.code;
                }).catch((err) => {
                    console.log("调用失败", err)
                }).finally((res) => {
                    this.sendCodeLoading = false;
                })
                this.sendCodeDisabled = true;
                setTimeout(this.countDown, 1000)
            },
            countDown() {
                this.count--;
                this.codeButtonMsg = this.count + "秒后重试"
                if (this.count == 0) {
                    this.count = 5;
                    this.sendCodeDisabled = false;
                    this.codeButtonMsg = "重新发送"
                    return;
                }
                setTimeout(this.countDown, 1000)
                // setTimeout('countDown()', 1000)
            },

            getDivStyle() {
                this.loginStyle.marginLeft = (window.innerWidth - 420) / 2 + 'px'
                this.loginStyle.marginRight = (window.innerWidth - 420) / 2 + 'px'
                this.loginStyle.marginTop = (window.innerHeight * 0.2) + 'px'
            },
            loginSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('登录成功!');
                    } else {
                        // this.$Message.error('注册失败!');
                        return
                    }
                })
                this.$http.post("/user/checklogin", this.login).then((res) => {
                    console.log("登录成功");
                    console.log(res.data.user.username)
                    this.$Message.success('登录成功!')
                    this.$store.commit("setUser",res.data.user)
                    debugger
                    console.log(this.$store.getters.getUser)
                    window.location.reload()
                    this.$router.push("/")
                    // window.location.reload()
                }).catch((err)=>{
                    console.log('登录失败',err);
                    this.$Message.error('登录失败!')
                })
            },
            registerSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('注册成功!');
                    } else {
                        // this.$Message.error('注册失败!');
                        return
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .flex {
    display: flex;
  }

  .code-button {
    margin-left: 10px;
  }
</style>
