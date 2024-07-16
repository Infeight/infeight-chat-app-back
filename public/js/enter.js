let a=1;

setInterval(function(){
  document.getElementById("eyes").style.transform=`rotateX(0deg)`
  },4050)
setInterval(function(){
document.getElementById("eyes").style.transform=`rotateX(100deg)`
setInterval(function(){
  document.getElementById("eyes").style.transform=`rotateX(0deg)`
  },4050)
},4000)

document.getElementById("addr-cont").addEventListener('mouseenter',eyes)

document.getElementById("addr-cont").addEventListener('mousemove',eyes)
function eyes(){
  document.getElementById("eyes").style.transform=`translateX(-10px)`
  // document.getElementById("eyes").style.transitionDuration = '0.5s'
  document.getElementById("mouth").style.height='1.5vh'

}
document.getElementById("addr-cont").addEventListener('mouseleave',eyes0)
function eyes0(){
  document.getElementById("mouth").style.height='4.5vh'
  document.getElementById("eyes").style.transform=`translateX(0px)`

}


document.getElementById("addr-cont2").addEventListener('mouseenter',eyes)

document.getElementById("addr-cont2").addEventListener('mousemove',eyes)
function eyes(){
  document.getElementById("eyes").style.transform=`translateX(-10px)`
  // document.getElementById("eyes").style.transitionDuration = '0.5s'
  document.getElementById("mouth").style.height='1.5vh'

}
document.getElementById("addr-cont2").addEventListener('mouseleave',eyes0)
function eyes0(){
  document.getElementById("mouth").style.height='4.5vh'
  document.getElementById("eyes").style.transform=`translateX(0px)`

}


document.getElementById("loginbtn").addEventListener("click",submit)
function submit(){
  document.getElementById("login-box").submit()
}