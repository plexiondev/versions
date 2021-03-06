// Create new XMLHttpRequest object
const xhr2 = new XMLHttpRequest();

// GitHub endpoint, dynamically passing in specified username
const url2 = `https://thingproxy.freeboard.io/fetch/https://api.scratch.mit.edu/users/pushtothelimit/projects`;

// Open a new connection, using a GET request via URL endpoint
// Providing 3 arguments (GET/POST, The URL, Async True/False)
xhr2.open('GET', url2, true);

// When request is received
// Process it here
xhr2.onload = function() {

    // Parse API data into JSON
    const data = JSON.parse(this.response);

    // Get the ul with id of of userRepos
    let ul = document.getElementById('scratchProjects');
    // Loop over each object in data array
    for (let i in data) {
        if ((data[i].name !== "datapack-panticheat") && (data[i].name !== "plexiondev") && (data[i].name !== "plexiondev.github.io") && (data[i].name !== "canary") && (data[i].name !== "versions")) {
            // Create variable that will create li's to be added to ul
            let li = document.createElement('a');
            //li.href = `${data[i].html_url}`
            let link = `view?a=${data[i].id}`
            li.href = `${link}/`

            // Add Bootstrap list item class to each li
            li.classList.add('card')
            li.classList.add('hover')

            // Date formatting
            var formattedDate = new Date(`${data[i].modified}`);
            var d = formattedDate.getDate();
            var m =  formattedDate.getMonth();
            m += 1;  // JavaScript months are 0-11
            var y = formattedDate.getFullYear();

            if (d < 10) {
                d = "0" + d;
            }
            if (m < 10) {
                m = "0" + m;
            }
            let updated = (d + "/" + m + "/" + y);
            // Create the html markup for each li
            data2 = data[i].stats
            li.innerHTML = (`
            <div class="cover"><img src="${data[i].image}"></div>
            <div class="info small">
            <h3 class="text-28">${data[i].title}</h3>
            <p>${data[i].instructions}</p>
            </div>
            <div class="buttons">
            <label class="tag faicon views left" id="project-views" title="Views">${data2.views}</label>
            <label class="tag faicon heart left" id="project-loves" title="Loves">${data2.loves}</label>
            <label class="tag faicon remix left" id="project-remixes" title="Remixes">${data2.remixes}</label>
            <label class="tag faicon saved left" id="project-favourites" title="Favourites">${data2.favorites}</label>
            </div>
        `);

            // Append each li to the ul
            ul.appendChild(li);
        }

    }

}

// Send the request to the server
xhr2.send();