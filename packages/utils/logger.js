import chalk from 'chalk';

export default (config, ...text) => {
  if (process.env.NODE_ENV === 'production') return;
  const { color, bgColor, mod } = config;
  let chalkFunction = text;
  if (mod)
    mod.forEach((m) => {
      chalkFunction = chalk[m](chalkFunction);
    });
  if (color) chalkFunction = chalk[color](chalkFunction);
  if (bgColor) chalkFunction = chalk[bgColor](chalkFunction);
  // eslint-disable-next-line no-console
  console.log(chalkFunction);
};
