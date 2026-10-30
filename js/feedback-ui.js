const detailsField = document.querySelector('#details');

if (detailsField) {
  const tooltip = document.createElement('span');
  let isHovered = false;
  let isFocused = false;

  tooltip.id = 'details-tooltip';
  tooltip.className = 'tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.textContent = 'Дякуючи Вам, ми стаємо кращі! Конкретизуйте мету звернення, будь ласка';
  document.body.appendChild(tooltip);
  detailsField.setAttribute('aria-describedby', tooltip.id);

  function positionTooltip() {
    if (!tooltip.classList.contains('show')) return;

    const field = detailsField.getBoundingClientRect();
    const gap = 12;
    const roomOnRight = window.innerWidth - field.right - gap;
    const roomOnLeft = field.left - gap;
    const minSideWidth = 180;
    const roomBesideField = roomOnRight >= minSideWidth
      ? roomOnRight
      : roomOnLeft >= minSideWidth ? roomOnLeft : 0;
    tooltip.style.width = roomBesideField
      ? `${Math.min(288, roomBesideField)}px`
      : `${Math.min(288, window.innerWidth - gap * 2)}px`;

    const tip = tooltip.getBoundingClientRect();
    let left;
    let top;

    if (roomOnRight >= minSideWidth || roomOnLeft >= minSideWidth) {
      left = roomOnRight >= minSideWidth
        ? field.right + gap
        : field.left - tip.width - gap;
      top = field.top + (field.height - tip.height) / 2;
    } else {
      left = Math.max(gap, Math.min(field.left, window.innerWidth - tip.width - gap));
      const belowField = field.bottom + gap;
      const aboveField = field.top - tip.height - gap;
      top = belowField + tip.height <= window.innerHeight - gap
        ? belowField
        : aboveField >= gap ? aboveField : window.innerHeight - tip.height - gap;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${Math.max(gap, Math.min(top, window.innerHeight - tip.height - gap))}px`;
  }

  function updateTooltip() {
    const isActive = isHovered || isFocused;
    tooltip.classList.toggle('show', isActive);
    detailsField.classList.toggle('details-active', isActive);
    if (isActive) positionTooltip();
  }

  detailsField.addEventListener('pointerenter', () => {
    isHovered = true;
    updateTooltip();
  });

  detailsField.addEventListener('pointerleave', () => {
    isHovered = false;
    updateTooltip();
  });

  detailsField.addEventListener('focus', () => {
    isFocused = true;
    updateTooltip();
  });

  detailsField.addEventListener('blur', () => {
    isFocused = false;
    updateTooltip();
  });

  window.addEventListener('resize', positionTooltip);
  window.addEventListener('scroll', positionTooltip, true);
}
