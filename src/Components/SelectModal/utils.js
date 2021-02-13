function getFilterOptions() {
  const options = [
    { text: 'No filter', value: -1 },
    { text: '>10', value: 9 },
  ];

  for (let i = 100; i <= 900; i += 100) {
    options.push({ text: `> ${i}`, value: i - 1 });
  }

  return options;
}

// eslint-disable-next-line import/prefer-default-export
export const filterOptions = getFilterOptions();
