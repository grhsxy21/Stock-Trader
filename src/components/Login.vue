<template>
    <div>
        <div class="login-wrap" v-show="showLogin">
            <h3>登录</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password">
            <button v-on:click="login">登录</button>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
        </div>

        <div class="login-wrap" v-show="showRegister">
            <h3>注册</h3>
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <button v-on:click="register">注册</button>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
        </div>
    </div>
</template>


<script>
import store from '../store/store.js'
export default{
    data(){
        return{
            showLogin: true,
            showRegister: false,
            showTishi: false,
            tishi: '',
            id: '',
            username: '',
            password: '',
            newUsername: '',
            newPassword: ''
        }
    },
    methods: {
        login(){
        if(this.username == "" || this.password == ""){
            //this.$store.commit('refresh',{ id: this.username })
            alert("请输入用户名或密码")
        }else{
            let data = {'id':this.username,'password':this.password}
            /*接口请求*/
            this.axios.post('/api/post/login',data).then((res)=>{
                console.log(res)
             /*接口的传值是(-1,该用户不存在),(0,密码错误)*/
              if(res.data == -1){
                  this.tishi = "该用户不存在"
                  this.showTishi = true
              }else if(res.data == 0){
                  this.tishi = "密码输入错误"
                  this.showTishi = true
              }else{
                  this.tishi = "登录成功"
                  this.showTishi = true
                  setTimeout(function(){
                      //!读取剩余资产和持有股票
                      this.$store.commit('refresh_asset',{ funds: res.funds, asset: res.asset})
                      this.$store.commit('refresh',{ id: this.username })   //*存储id到vuex
                      this.$router.push('/home')
                  }.bind(this),1000)
              }
          })
      }
    },
    register(){
    if(this.newUsername == "" || this.newPassword == ""){
        alert("请输入用户名或密码")
    }else{
        let data = {'username':this.newUsername,'password':this.newPassword,'id':this.newUsername}
        this.axios.post('http://127.0.0.1:8000/post/register',data).then((res)=>{
            console.log(res)
            if(res.data == "ok"){
                this.tishi = "注册成功"
                this.showTishi = true
                this.username = ''
                this.password = ''
                /*注册成功之后再跳回登录页*/
                setTimeout(function(){
                    this.showRegister = false
                    this.showLogin = true
                    this.showTishi = false
                }.bind(this),1000)
            }
        })
    }
},
    ToRegister(){
        this.showRegister = true
        this.showLogin = false
    },
    ToLogin(){
        this.showRegister = false
        this.showLogin = true
    }
    }
}



</script>

<style scoped>
    .login-wrap{text-align:center;}
    input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
    p{color:red;}
    button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
    span{cursor:pointer;}
    span:hover{color:#41b883;}
</style>