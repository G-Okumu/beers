// RESTFUL - RESTFul API


// GET ALL BEARS AND SHOW THEM


fetch("http://localhost:3000/beers")
    .then((res) => res.json())
    .then((data) => {
        let cardContainer = document.getElementById("card-container");

        data.forEach((item) => {
            cardContainer.innerHTML += `
        <div class="card">
        <img src=${item.image_url} alt=${item.name} height="300px"/>
        <div class="container">
          <h4><b>${item.name}</b></h4>
          <p>${item.description}</p>
        </div>
      </div>
        `
        })

    })

let form = document.getElementById("form");

form.addEventListener(("submit"), function (e) {
    e.preventDefault();

    let image_url = document.querySelector('input[name="image_url"]').value;
    let name = document.querySelector('input[name="name"]').value;
    let description = document.querySelector('input[name="description"]').value;

    let dataToPost = {
        image_url: image_url,
        name: name,
        description: description
    }

    let name2 = document.getElementById("name2");

    name2.innerHTML = name;


    fetch("http://localhost:3000/beers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToPost)
    }).then((res) => console.log(res));

})