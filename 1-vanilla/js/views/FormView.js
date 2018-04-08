import View from './View.js'

const tag = '[FormView]'

//Object 함수로 view객체를 복사한다 .
const FormView = Object.create(View)

//FomrView에 setup 메소드를 만든다.
//엘레멘트를 주입 받는다. init함수에 el이 있다.
FormView.setup = function (el) {
  console.log("el::" + el)
  this.init(el)
  this.inputEl = el.querySelector('[type=text]')
  this.resetEl = el.querySelector('[type=reset')
  this.showResetBtn(false)
  this.bindEvents()
  return this
}

// x 버튼을 처리
FormView.showResetBtn = function (show = true) {
  this.resetEl.style.display = show ? 'block' : 'none'
}

FormView.bindEvents = function() {
  this.on('submit', e => e.preventDefault())
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
  this.resetEl.addEventListener('click', e => this.onClickReset())
}

//key가 입력될떄마다 실행
FormView.onKeyup = function (e) {
  const enter = 13
  this.showResetBtn(this.inputEl.value.length)
  if (!this.inputEl.value.length) this.emit('@reset') //MainController 함수에 위임
  if (e.keyCode !== enter) return //MainController 함수에 위임
  this.emit('@submit', {input: this.inputEl.value})
}

FormView.onClickReset = function() {
  this.emit('@reset')
  this.showResetBtn(false)
}

FormView.setValue = function (value = '') {
  this.inputEl.value = value
  this.showResetBtn(this.inputEl.value.length)
}

export default FormView
