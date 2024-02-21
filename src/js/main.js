import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const input = document.getElementById('input-name')
const btnSetName = document.getElementById('setname')
const myModalforBT = new bootstrap.Modal(document.getElementById('exampleModal'));
const modal = document.querySelector('.modal-content')
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