import {observable, action} from 'mobx/lib/mobx'
import axios from 'axios'

class ProfileStore{
    static __instance = null;
    static getInstance(){
        if (ProfileStore.__instance === null){
            ProfileStore.__instance = new ProfileStore();
        }
        return ProfileStore.__instance;
    }

    constructor() {
        ProfileStore.__instance = this;

    }

    @observable viewitem = null;
    @action userView = async (id) => {
        try{
            this.viewitem = null;
            let response = await axios({
                url: `http://localhost:8080/user/view/${id}`,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 3000
            });
            console.log(response);
            if (response.status === 200){
                setTimeout(()=>this.viewitem = response.data,100);
                // this.item = response.data
            }
        }catch (e) {
            alert(e.toString())
        }
    };


    @observable item = null;
    @observable islogin = false;
    @action onLogin = async (user) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/user/login',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'post',
                timeout: 100,
                data:user
            });
            if (response.status === 200){
                this.item = response.data;
                if (this.item != ""){
                    this.islogin = true;
                    return true;
                }
                alert('아이디와 비밀번호가 맞지 않습니다.');
                return false;
            }
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action onRegister = async (newUser) => {
        try{
            let response = await axios({
                url: `http://localhost:8080/user/add`,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'post',
                timeout: 1000,
                data: newUser
            });
            console.log(response);
            if(response.status === 200){
                return true;
            }
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action removeUser = async (id) => {
        try{
            let response = await axios({
                url: `http://localhost:8080/user/delete/${id}`,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'delete',
                timeout: 3000
            });
            if(response.status === 200){
                return true;
            }
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action updateUser = async (updateUser) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/user/update',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'put',
                timeout: 3000,
                data:updateUser
            });
            if(response.status === 200){
                this.islogin = false;
                return true;
            }
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    }
}

export default ProfileStore.getInstance();