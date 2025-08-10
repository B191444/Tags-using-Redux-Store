import {createStore} from './redux.js';

const input = document.querySelector('.inputvalue');
const cont = document.querySelector('.container');
const tagCont = document.querySelector('.tags');
const closebtn = document.querySelector('.close-btn');
const pkBuilder=()=>{
  var key=0;
  return ()=> key++;
  
}
const pkInstance=pkBuilder();

const reducer=(state={tags:[]},action)=>{
  if(action.type=="add"){
    return {tags:[...state.tags,action.payload]};
  }
  if(action.type=="remove"){
    return {
      tags: state.tags.filter(tag => tag.tagId !== action.payload)
    };
  }
  
  return state;
}
const getTag=(tag)=>{
  const tagcont=document.createElement("div");
  tagcont.classList.add("tag");
  const text=document.createElement("span");
  text.innerText=tag.text;
  const icon=document.createElement("span");
  icon.innerText="close";
  icon.classList.add("material-symbols-outlined","close-btn")
  tagcont.append(text,icon);
  icon.addEventListener("click",()=>{
  store.dispatch({
    type:"remove",
    payload:tag.tagId
  })
})
  return tagcont;
}

const render=()=>{
  tagCont.innerHTML="";
 
  const {tags}=store.getState();
  tags.forEach((tag)=>{
    const tagElement=getTag(tag);
    tagCont.appendChild(tagElement);
  })
}

const store=createStore(reducer);
store.subscribe(render);
input.addEventListener("keyup",(e)=>{
  const value=input.value.trim()
  if((e.key=="," || e.key=="Enter") && input.value.trim())
  {
    store.dispatch({
      type:"add",
      payload:{
        tagId:pkInstance(),
        text:value
      }
    })
     input.value="";
  }
})


