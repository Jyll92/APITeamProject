// temp working with cors-anywhere proxy
axios.get(` https://cors-anywhere.herokuapp.com/https://www.fruityvice.com/api/fruit/all`,  {
	crossdomain: true,
})
  .then(res => {
    console.log(`Fruit Grab was Successful`);
   
    console.log(res.data);
  })
  .catch(err => {
    console.log(`Fruit Grab was NOT Successful`);
    console.log(err);
  });