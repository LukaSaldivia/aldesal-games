const percentage = document.querySelector('.percentage')
const loader = document.querySelector('#loader')
let total = 0;

let interval = setInterval(() => {
  total++
  percentage.textContent = total
}, 50);

setTimeout(() => {
  clearInterval(interval)
  percentage.textContent = 100
  loader.classList.add('vanish')
}, 5000);

