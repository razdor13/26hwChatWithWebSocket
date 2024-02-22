import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const input = document.getElementById('input-name')
const btnSetName = document.getElementById('setname')
const myModalforBT = new bootstrap.Modal(document.getElementById('staticBackdrop'));
const modal = document.querySelector('.modal-content')
const anon = document.getElementById('anon')
const btnForSend = document.getElementById('btnSend')
const inputMsg = document.getElementById('inputMsg')
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
const ws = new WebSocket('ws://localhost:5555')

ws.onmessage = (event) => {
  console.log(event.data , 'got msg')
}

ws.onopen = () => {
  btnForSend.addEventListener('click', () => {
    const msg = inputMsg.value.trim()
  if (msg) {
    ws.send(msg)
  }
  })
  console.log('coonect - client')
  
}
ws.onclose = () => {
  console.log('disconnected')
}