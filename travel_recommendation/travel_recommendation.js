window.onload = (event) => {

    function isTempleRelated(word) {
        if (word.toLowerCase().includes("temple") || word.toLowerCase().includes("temples")) {
            return true;
        } else {
            return false;
        }
    }
    
    function isBeachRelated(word1) {
        if (word1.toLowerCase().includes("beach") || word1.toLowerCase().includes("beaches")) {
            return true;
        } else {
            return false;
        }
    }
    
    function isCountryRelated(word2) {
        if (word2.toLowerCase().includes("country") || word2.toLowerCase().includes("countries")) {
            return true;
        } else {
            return false;
        }
    }

    //constants
    const search = document.getElementById("search_inp");
    const search_btn = document.getElementById("search_btn");
    const clear_btn = document.getElementById("reset_btn");
    var rec_div_parent = document.querySelector("#recommendations");

    clear_btn.addEventListener("click", () => {
        document.getElementById("recommendations").innerHTML = "";
        document.getElementById("recommendations").style.display = "none";
        search.value = "";
    })
    //event listeners

    search_btn.addEventListener("click", input_and_keywords);

    function input_and_keywords() {
        if (search.value != "" && search.value != " " && search.value != null) {

            // console.log(search.value + " : " + search.value.toString());
            if (isBeachRelated(search.value.toString())) {
                // console.log("beach");
                Fetch_result("beaches");

            }
            else if (isCountryRelated(search.value.toString())) {
                // console.log("country");
                Fetch_result("countries");

            }
            else if (isTempleRelated(search.value.toString())) {
                // console.log("temple");
                Fetch_result("temples");

            }
            else {
                alert(`Entered Keyword or destination ${search.value} is not supported yet.`);
            }
        } else {
            alert("Please input a valid keyword or destination.")
        }
    }
    function Fetch_result(keyword_provided) {
        fetch(`./travel_recommendation_api.json`) // api for the get request
            .then(response => response.json())
            .then((data) => {
                // console.log(data)

                console.log(`data.${keyword_provided} : ${data[keyword_provided]}`);
                if (keyword_provided === "countries") {
                    displayCountries(data[keyword_provided]);
                } else {
                    displayresult(data[keyword_provided]);
                }


            }
            ).catch(err => console.error(err));
    }
    function displayCountries(countries) {
        rec_div_parent.innerHTML = "";
        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];

        // }
        countries.forEach(country => {

            console.log(`country : ${country}`)

            country.cities.forEach(city => {
                console.log(`city : ${city}`)

                var rec_div = document.createElement('div');
                var text_div = document.createElement('div');
                var namee = document.createElement("h4");
                var image = document.createElement("img");
                var description = document.createElement("p");
                var anchor_tag = document.createElement("a");

                namee.textContent = city.name;
                image.src = city.imageUrl;
                description.textContent = city.description;
                rec_div.id = "recommendation";
                anchor_tag.href = "#";
                anchor_tag.textContent = "Visit";

                rec_div.appendChild(image);
                text_div.appendChild(namee);
                text_div.appendChild(description);
                text_div.appendChild(anchor_tag);
                rec_div.appendChild(text_div);
                rec_div_parent.appendChild(rec_div);
            })
            rec_div_parent.style.cssText = 'z-index: 999; position: absolute;top: 75px;display: flex;flex-direction: column;right: 80px; width: 40vw ; overflow-y: scroll;';
        })
    }
    function displayresult(data_passed) {

        rec_div_parent.innerHTML = "";

        for (const key in data_passed) {
            if (Object.hasOwnProperty.call(data_passed, key)) {

                const element = data_passed[key];

                var rec_div = document.createElement('div');
                var text_div = document.createElement('div');
                var namee = document.createElement("h4");
                var image = document.createElement("img");
                var description = document.createElement("p");
                var anchor_tag = document.createElement("a");

                namee.textContent = element.name;
                image.src = element.imageUrl;
                description.textContent = element.description;
                rec_div.id = "recommendation";

                anchor_tag.href = "#";
                anchor_tag.textContent = "Visit";

                rec_div.appendChild(image);
                text_div.appendChild(namee);
                text_div.appendChild(description);
                text_div.appendChild(anchor_tag);
                rec_div.appendChild(text_div);
                rec_div_parent.appendChild(rec_div);

                


            }
        }
        rec_div_parent.style.cssText = 'z-index: 999; position: absolute;top: 75px;display: flex;flex-direction: column;right: 80px; width: 40vw; overflow-Y: scroll';
    }




    //logic for handling form submission
    if (window.location.href.endsWith('contact_us.html')) {
        var form = document.getElementById("form");
        form.onsubmit = (e) => {
            e.preventDefault();
            //Add other logic for handling contact us form submission 
        };
    }
}
