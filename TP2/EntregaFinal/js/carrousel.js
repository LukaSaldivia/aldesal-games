document.querySelectorAll('.carousel').forEach(carousel => {
  const leftArrow = carousel.querySelector('.arrow.left');
  const rightArrow = carousel.querySelector('.arrow.right');
  const container = carousel.querySelector('.carousel-items');
  let lastScrollLeft = 0; // Guardar el último valor de scrollLeft


  checkArrowsVisibility(container, leftArrow, rightArrow);

  rightArrow.addEventListener('click', () => {
      // Scroll hacia la derecha
      container.scrollBy({ left: container.scrollWidth / 4, behavior: 'smooth' });
      container.classList.add('skew-right');
      setTimeout(() => container.classList.remove('skew-right'), 300);
      checkArrowsVisibility(container, leftArrow, rightArrow);
  });

  leftArrow.addEventListener('click', () => {
      // Scroll hacia la izquierda
      container.scrollBy({ left: -container.scrollWidth / 4, behavior: 'smooth' });
      container.classList.add('skew-left');
      setTimeout(() => container.classList.remove('skew-left'), 300);
      checkArrowsVisibility(container, leftArrow, rightArrow);
  });

  container.addEventListener('scroll', () => {
    
    applyScaleEffect(container);

    lastScrollLeft = container.scrollLeft; // Actualizar el último scrollLeft

    checkArrowsVisibility(container, leftArrow, rightArrow)}
  


  );
});

function checkArrowsVisibility(container, leftArrow, rightArrow) {
  leftArrow.classList.toggle('none', container.scrollLeft < 100 )
  rightArrow.classList.toggle('none', container.scrollWidth - container.scrollLeft < container.clientWidth + 100)
}

function applySkewEffect(container, direction) {
  console.log(direction)
  if (direction === 'right') {
      container.classList.add('skew-right');
      setTimeout(() => container.classList.remove('skew-right'), 300);
  } else if (direction === 'left') {
      container.classList.add('skew-left');
      setTimeout(() => container.classList.remove('skew-left'), 300);
  }
}

function applyScaleEffect(container) {
  container.classList.add('scale-effect');
  setTimeout(() => container.classList.remove('scale-effect'), 300);
}