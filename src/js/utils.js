export function calcTileType(index, boardSize) {
  // TODO: write logic here
  if (index === 0) return 'top-left';
  if (index === boardSize - 1) return 'top-right';
  if (index === (boardSize ** 2) - 1) return 'bottom-right';
  if (index === (boardSize ** 2) - boardSize) return 'bottom-left';
  if (index < boardSize) return 'top';
  if (index > (boardSize ** 2) - boardSize) return 'bottom';
  if (index % boardSize === 0) return 'left';
  if ((index + 9) % boardSize === 0) return 'right';
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
