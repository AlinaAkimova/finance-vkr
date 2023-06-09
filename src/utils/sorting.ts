const isArrayOrNull = (value: unknown | null | undefined): boolean =>
  Array.isArray(value) || value === null || value === undefined;

export const sortingByField = <T>(
  initialArray: Array<T>,
  field: keyof T,
  direction: 1 | -1
): Array<T> => {
  if (!initialArray.length) {
    return initialArray;
  }

  const array = initialArray.slice();

  if (isArrayOrNull(array[0][field])) {
    return array.sort(
      (c, d) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (Number(c[field]?.length ?? 0) - Number(d[field]?.length ?? 0)) *
        direction
    );
  }

  const fieldType = typeof array[0][field];

  switch (fieldType) {
    case 'string':
      return array.sort((a, b) => {
        if (
          typeof (a[field] || '') === 'string' &&
          typeof (b[field] || '') === 'string'
        ) {
          const left = String(a[field] || '').toLowerCase();
          const right = String(b[field] || '').toLowerCase();

          if (left < right) {
            return -direction;
          }

          if (left > right) {
            return direction;
          }
        }

        return 0;
      });
    case 'number':
    case 'boolean':
      return array.sort(
        (c, d) => (Number(c[field]) - Number(d[field])) * direction
      );
    default:
      return array;
  }
};
