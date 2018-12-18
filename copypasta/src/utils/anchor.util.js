export const findX = anchor => {
  switch (anchor.position) {
    case 'topCenter':
      return anchor.parentX + (anchor.parentWidth / 2) - (anchor.width / 2);
    case 'right':
      return anchor.parentX + anchor.parentWidth;
    case 'bottomCenter':
      return anchor.parentX + (anchor.parentWidth / 2) - (anchor.width / 2);
    case 'left':
      return anchor.parentX - anchor.width;
    default:
      return 0;
  }
};

export const findY = anchor => {
  switch (anchor.position) {
    case 'topCenter':
      return anchor.parentY - anchor.height;
    case 'right':
      return anchor.parentY + (anchor.parentHeight / 2) - (anchor.height / 2);
    case 'bottomCenter':
      return anchor.parentY + anchor.parentHeight;
    case 'left':
      return anchor.parentY + (anchor.parentHeight / 2) - (anchor.height / 2);
    default:
      return 0;
  }
};

export const findCenterX = anchor => {
  const x = findX(anchor);
  return x + anchor.width / 2;
};

export const findCenterY = anchor => {
  const y = findY(anchor);
  return y + anchor.height / 2;
};

export const includePosition = anchor => {
  return {
    ...anchor,
    x: findX(anchor),
    y: findY(anchor),
  };
};
