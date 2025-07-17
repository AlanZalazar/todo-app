export const getCitiesFromStays = (stays) => {
  const citiesSet = new Set();

  stays.forEach((stay) => {
    const cityString = `${stay.city}, ${stay.country}`;
    citiesSet.add(cityString);
  });

  const baseCities = [
    "Helsinki, Finland",
    "Turku, Finland",
    "Oulu, Finland",
    "Vaasa, Finland",
  ];

  baseCities.forEach((city) => citiesSet.add(city));

  return Array.from(citiesSet);
};
