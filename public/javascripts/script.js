const profileEl = document.querySelector('.profile')
const boxEl = document.querySelector('.box')

profileEl.addEventListener('mouseover', ()=>{
    boxEl.classList.add('visible')
})

profileEl.addEventListener('mouseleave', ()=>{
    boxEl.classList.remove('visible')
})

boxEl.addEventListener('mouseover', ()=>{
    boxEl.classList.add('visible')
})

boxEl.addEventListener('mouseleave', ()=>{
    boxEl.classList.remove('visible')
})
