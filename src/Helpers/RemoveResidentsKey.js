function RemoveResidentsKey(returnedPlanetsFromAPI) {
  return returnedPlanetsFromAPI.map((planet) => {
    delete planet.residents;
    return planet;
  });
}

export default RemoveResidentsKey;
