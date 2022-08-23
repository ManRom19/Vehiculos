export default () =>

  new Promise((resolve, reject) => {
    fetch('http://localhost:52871/api/values')
      .then(response => {
        if (response.ok) {
          response.json().then(resolve).catch(reject)
        } else {
          response.json().then(errJson => {
            console.log(errJson)
          }).catch(reject)
        }
      }).catch( response => {
        alert('Error')
      })
})