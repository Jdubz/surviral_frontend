import hasClass from './hasClass';

function findParentWithClass(childNode, parentClass) {
  if (childNode === null) {
    return null;
  } else if (hasClass(childNode, parentClass)) {
    return childNode;
  }

  return findParentWithClass(childNode.parentElement, parentClass);
}

export default findParentWithClass;
