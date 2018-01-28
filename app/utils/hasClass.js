function hasClass(node, className) {
  const classArray = Array.from(node.classList);

  return classArray.indexOf(className) !== -1;
}

export default hasClass;
