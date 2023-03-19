  // Select the div with - the profile info section
const overview = document.querySelector(".overview"); 
const username = "rob17204";

const gitHubProfile = async function (){
  const profileRequest = await fetch (`https://api.github.com/users/${username}`);
  
    // collect the profile api results
  const data = await profileRequest.json(); 
  console.log(data);

  displayUser(data);
};

gitHubProfile();

  // Display user info
const displayUser = function (data) {
  overview.innerHTML = ""; // empty the data field

    const div = document.createElement("div");
    div.classList.add("user-info");

      // Display in DOM
    div.innerHTML = `
    <figure>
      <img src=${data.avatar_url} alt="user avatar" />
    </figure>
    <div>
      <p><strong>Name: ${data.name}</strong></p>
      <p><strong>Bio: ${data.bio}</strong></p>
      <p><strong>Location: ${data.location}</strong></p>
      <p><strong>Number of public repos: ${data.public_repos}</strong></p>
    </div>
    `;
  overview.append(div);
  };