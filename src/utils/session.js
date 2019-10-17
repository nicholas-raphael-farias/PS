const checkSession = () => {
   return localStorage.getItem('PointOfSaleToken') !== null;
}

export { checkSession };