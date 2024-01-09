document.addEventListener("DOMContentLoaded", function () {
    // RESTFUL - RESTFul API


    // GET ALL BEERS AND SHOW THEM
    let cardContainer = this.getElementById("card-container");

    
    fetch("http://localhost:3000/beers")
        .then((res) => res.json())
        .then((data) => {
            displayAllDetails(data);
        })

    const displayAllDetails = (beer) => {
        beer.forEach((item) => {
            cardContainer.innerHTML += `
    
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div></div>
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg mt-4" src="${item.image_url}" alt="${item.name}"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${item.name}</h5>
                <div class="mt-4 md:mt-6">
                    <button item-id="${item.id}" class="view-more inline-flex items-center px-4 py-2 text-sm font-medium text-center view text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View More</button>
                </div>
            </div>
            </div>
    `
            this.querySelectorAll(".view-more").forEach((btn) => {
                btn.addEventListener("click", function () {
                    let item_id = this.getAttribute("item-id");
                    fetchSingleBeer(item_id);
                })
            })
        })


    };


    function fetchSingleBeer(beer_id) {
        fetch(`http://localhost:3000/beers/${beer_id}`)
            .then((res) => res.json())
            .then((singleBeer) => displaySingleBeer(singleBeer))
    }

    const displaySingleBeer = (item) => {
        // console.log(item)
        this.getElementById("singleBeer").innerHTML += `
    
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div></div>
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg mt-4" src="${item.image_url}" alt="${item.name}"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${item.name}</h5>
                <p class="text-[#fff] dark:text-white">${item.description}</p>
            </div>
            </div>

    `
    };


    // Passing data dynamically
    //delete
    // updating


    let form = this.getElementById("form");

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


        fetch("http://localhost:3000/beers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToPost)
        }).then((res) => console.log(res));

        window.location.reload();

    })
})
