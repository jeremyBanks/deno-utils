// TypeScript will infer a string union type U from the literal values passed
// to this function. Without `extends string`, it would instead generalize
// them to the common string type. 
export const stringUnion = <U extends string>(...values: U[]) => {
  Object.freeze(values);

  const valueSet: Set<string> = new Set(values);
  const guard = (value: string): value is U => {
    return valueSet.has(value);
  };
  const check = (value: string): U => {
    if (!guard(value)) {
      const actual = JSON.stringify(value);
      const expected = values.map(s => JSON.stringify(s)).join(' | ');
      throw new TypeError(`Value '${actual}' is not assignable to type '${expected}'.`);
    }
    return value;
  };

  const U = {guard, check, values};
  return Object.freeze(U as typeof U & {type: U});
};
