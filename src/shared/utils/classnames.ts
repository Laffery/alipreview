type ClassNameArg = string | number | Record<string | number, boolean>;

/** get classnames
 * @example
 * classNames('a', 'b', {c: true, d: false}) // => 'a b c'
 */
function classNames(...args: (ClassNameArg | ClassNameArg[])[]): string {
  const classes: Set<string> = new Set();

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string" || typeof arg === "number")
      return classes.add(String(arg));

    if (Array.isArray(arg)) {
      if (!arg.length) return;
      const inner = classNames(...arg);
      if (inner) classes.add(inner);
    } else if (typeof arg === "object") {
      Object.keys(arg)
        .filter((key) => arg[key])
        .forEach((key) => classes.add(key));
    }
  });

  return Array.from(classes).join(" ");
}

export default classNames;
