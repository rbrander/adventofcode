const getManhattenDistance = (coord1, coord2) =>
  Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y);

module.exports = {
  getManhattenDistance
};
