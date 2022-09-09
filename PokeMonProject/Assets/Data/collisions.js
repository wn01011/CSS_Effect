const collisions = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158,
  158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158,
  158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 158, 158,
  158, 158, 158, 158, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  158, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 0, 158, 158, 158,
  158, 158, 158, 158, 158, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0,
  158, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 158, 0, 0, 158, 0,
  0, 158, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 0, 0, 158, 0, 0,
  0, 0, 158, 0, 0, 158, 0, 0, 158, 158, 158, 158, 158, 158, 158, 0, 0, 0, 0, 0,
  158, 0, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 158, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 158, 0, 0, 158,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 158, 158, 0, 0, 158, 158, 158,
  0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158,
  0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 158, 158, 158, 158, 158,
  158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158,
  158, 158, 158, 158, 158, 158, 158, 158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];