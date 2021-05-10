interface Item {
  id: string;
}

export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  return items.findIndex((items: T) => items.id === id);
};

export function overrideItemAtIndex<T>(array: T[], newItem: T, targetIndex: number) {
  return array.map((item, index) => {
    if (index !== targetIndex) {
      return item;
    }
    return newItem;
  });
}

export const moveItem = <T>(array: T[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;
  const copyArray = [...array];
  const item = copyArray.splice(from, 1)[0];
  copyArray.splice(startIndex, 0, item);
  return copyArray;
};

export const removeItemAtIndex = <T>(array: T[], itemIndex: number) => {
  return array.filter((value, index) => index !== itemIndex);
};

export const insertItemAtIndex = <T>(array: T[], item: T, itemIndex: number) => {
  return [...array.slice(0, itemIndex), item, ...array.slice(itemIndex)];
};
