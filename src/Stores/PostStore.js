import {observable, action} from 'mobx/lib/mobx'
import TimeStore from './TimeStore'
import axios from 'axios'

class PostStore{
    static __instance = null;
    static getInstance(){
        if (PostStore.__instance === null){
            PostStore.__instance = new PostStore();
        }
        return PostStore.__instance;
    }

    constructor() {
       PostStore.__instance = this;

    }

    @observable post_time = null;
    @action getTime = async () => this.post_time = await new Date().getTime();
    getTimemill = () => TimeStore.getTime();

    @observable items = null;
    @action fetchItems = async () => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/post/list',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 3000
            });
            // console.log(response);
            if (response.status === 200){
                this.items = response.data
            }
        }catch (e) {
            alert(e.toString())
        }
    };

    @observable viewitem = null;
    @action fetchItem = async (postid) => {
        try{
            this.viewitem = null;
            let response = await axios({
                url: `http://localhost:8080/post/view/${postid}`,
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

    @action addNewPost = async (newPost) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/post/add',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'post',
                timeout: 3000,
                data:newPost
            });
            return (response.status === 200);
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action removePost = async (postid) => {
        try{
            let response = await axios({
                url: `http://localhost:8080/post/delete/${postid}`,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'delete',
                timeout: 3000
            });
            return (response.status === 200);
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action updatePost = async (updatePost) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/post/update',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'put',
                timeout: 3000,
                data:updatePost
            });
            return (response.status === 200);
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    }
}

export default PostStore.getInstance();