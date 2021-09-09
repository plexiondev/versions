// Create new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// GitHub endpoint, dynamically passing in specified username
const url = `https://api.github.com/orgs/plex1on/repos`;

// Open a new connection, using a GET request via URL endpoint
// Providing 3 arguments (GET/POST, The URL, Async True/False)
xhr.open('GET', url, true);

// When request is received
// Process it here
xhr.onload = function() {

    // Parse API data into JSON
    const data = JSON.parse(this.response);
    let root = document.getElementById('userRepos');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    if (data.message === "Not Found") {
        let ul = document.getElementById('userRepos');

        // Create variable that will create li's to be added to ul
        let li = document.createElement('a');
        li.classList.add('card');
        li.classList.add('hover');
        li.href = `/404`

            // Create the html markup for each li
        li.innerHTML = (`
        <div class="cover"><img src="https://www.tasteandtellblog.com/wp-content/uploads/2020/01/Best-Waffle-Recipe-tasteandtellblog.com-1.jpg"></div>
        <div class="info">
        <h3 class="text-32">404</h3>
        <p>The information requested could not be found, please try again.</p>
        <p class="text-12"><code>${url}</code></p>
        </div>
        <div class="options">
        <a class="button focus" href="https://www.githubstatus.com/">Github Status</a>
        <a class="button" href="https://github.com/plexiondev/plexiondev.github.io/issues">Report as Issue</a>
        </div>
        `);
        // Append each li to the ul
        ul.appendChild(li);
    } else {

        // Get the ul with id of of userRepos
        let header = document.getElementById('reposHeader');
        let ul = document.getElementById('userRepos');
        // Loop over each object in data array
        for (let i in data) {
            // Create variable that will create li's to be added to ul
            let li = document.createElement('a');
            //li.href = `${data[i].html_url}`
            let link = `${data[i].name}`.replace(/\-/g,'').toLowerCase();
            li.href = `${link}/`

            // Add Bootstrap list item class to each li
            li.classList.add('card')
            li.classList.add('hover')

            // Date formatting
            var d = new Date(`${data[i].pushed_at}`);
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var date = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

            let updated = (date);
            // Create the html markup for each li
            let name = `${data[i].name}`.replace(/\-/g,' ');
            li.innerHTML = (`
            <div class="cover"><img src="${link}/cover.png"></div>
            <div class="info">
            <h3 class="text-28">${name}</h3>
            <p>${data[i].description}</p>
            <p class="col-alt ${data[i].name}">${updated}</p>
            </div>
            `);

            // Append each li to the ul
            ul.appendChild(li);

        }

    }
}

// Send the request to the server
xhr.send();