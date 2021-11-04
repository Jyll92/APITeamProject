// Not Working Yet...
axios.get(`https://www.fruityvice.com/api/fruit/all`)
  .then(res => {
    console.log(`Fruit Grab was Successful`);
    console.log(res.data);
  })
  .catch(err => {
    console.log(`Fruit Grab was NOT Successful`);
    console.log(err);
  });