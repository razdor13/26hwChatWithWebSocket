import { data } from 'autoprefixer';
import '../scss/styles.scss'
import {Modal} from 'bootstrap'

const input = document.getElementById('input-name')
const btnSetName = document.getElementById('setname')
const myModalforBT = new Modal(document.getElementById('staticBackdrop'));
const modal = document.querySelector('.modal-content')
const anon = document.getElementById('anon')
const btnForSend = document.getElementById('btnSend')
const inputMsg = document.getElementById('inputMsg')
const containerMsg = document.getElementById('containerForMsg')
let user 
openModal();

function openModal() {
    myModalforBT.show();
}

function closeModal() {
    myModalforBT.hide()
}

function doShake () {
  modal.classList.add('horizontal-shake')
  input.style.border = '1px solid red';
  setTimeout(()=>{
    modal.classList.remove('horizontal-shake')
    input.style.border = '';
  },500)
}



btnSetName.addEventListener('click', () => {
  user = input.value.trim()
  user? closeModal() : doShake()
})

anon.addEventListener('click', () => {
  user = 'anonimus'
  closeModal()
  console.log(user)
})


//webSocket 
const vmist = `<div class="card card-body">
<div class="info-msg">
    <div class="time">X</div>
    <div class="name">System</div>
</div>
<div class="msg">
    greetings!
</div>
</div>`

console.log(containerMsg)
containerMsg.insertAdjacentHTML('beforeend', vmist);






const ws = new WebSocket('ws://localhost:5555')

ws.onmessage = (event) => {
  const { data } = JSON.parse(event.data);
  console.log(data[0])
  const vmist = `<div class="card card-body">
  <div class="info-msg">
      <div class="time">${data[0]}</div>
      <div class="name">${data[1]}</div>
  </div>
  <div class="msg">
    ${data[2]}
  </div>
  </div>`
  containerMsg.insertAdjacentHTML('beforeend', vmist);
  containerMsg.scrollTop = containerMsg.scrollHeight;
}

ws.onopen = () => {
  btnForSend.addEventListener('click', () => {
    
    const msg = inputMsg.value.trim()
    if (msg) {
      const dataToSend = JSON.stringify([new Date().toLocaleTimeString('uk-UA'), user, msg])  
    ws.send(dataToSend)
  }
  })
  console.log('coonect - client')
  
}

ws.onclose = () => {
  console.log('disconnected')
}