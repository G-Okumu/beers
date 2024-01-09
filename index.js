// This makes sure the document is first loaded before everything in it is called.
document.addEventListener("DOMContentLoaded", function () {

    // Getting  the element with id "card-container"
    // this keyword is used to refere to current context/state
    let cardContainer = this.getElementById("card-container");

    // Fetching data from http://localhost:3000/beers endpoint
    fetch("http://localhost:3000/beers")
        .then((res) => res.json())
        .then((data) => {
            // passing data to displayAllDetails function.
            displayAllDetails(data);
        })

    // Function to display all beers
    const displayAllDetails = (beer) => {
        beer.forEach((item) => {
            // Appending HTML content to cardContainer 
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

            // Getting all elements with class attribute view-more
            this.querySelectorAll(".view-more").forEach((btn) => {
                // Add click event listener to each btns gotten above
                btn.addEventListener("click", function () {
                    // Getting the id for each item
                    let item_id = this.getAttribute("item-id");

                    // passing the id to fetchSingleBeer fn, for fetching single beer.
                    fetchSingleBeer(item_id);
                })
            })
        })


    };


    // Function to fetch details for a single beer
    function fetchSingleBeer(beer_id) {
        fetch(`http://localhost:3000/beers/${beer_id}`)
            .then((res) => res.json())
            .then((singleBeer) => displaySingleBeer(singleBeer))
    }

    // function to display items of a single beer.
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

    // Getting form element
    let form = this.getElementById("form");

    // Adding submit event to the form 
    form.addEventListener(("submit"), function (e) {
        e.preventDefault();

        // Getting values from the elements
        let image_url = document.querySelector('input[name="image_url"]').value;
        let name = document.querySelector('input[name="name"]').value;
        let description = document.querySelector('input[name="description"]').value;

        // Creating an object to be posted.
        let dataToPost = {
            image_url: image_url,
            name: name,
            description: description
        }


        // Posting data to beers endpoint/ to server
        fetch("http://localhost:3000/beers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToPost)
        }).then((res) => console.log(res));

        // Reloading the window immediatly everything is done
        window.location.reload();

    })
})
