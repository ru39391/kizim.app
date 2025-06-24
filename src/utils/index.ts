const setBaseUrl = (): string => {
  const baseItem = document.querySelector('base');

  if(!baseItem) {
    return '';
  }

  const { href } = baseItem;

  return href.slice(0, -1);
}

export {
  setBaseUrl
}
