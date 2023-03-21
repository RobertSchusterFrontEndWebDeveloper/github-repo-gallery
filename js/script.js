  // Select the div with - the profile info section
const overview = document.querySelector(".overview"); 
const username = "rob17204";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const gitHubProfile = async function (){
  const profileRequest = await fetch (`https://api.github.com/users/${username}`);
  
    // collect the profile api results
  const data = await profileRequest.json(); 
    //console.log(data);

  displayUser(data);
};

gitHubProfile();

  // Display user info
const displayUser = function (data) {
  overview.innerHTML = ""; // empty the data field

  const div = document.createElement("div");
  div.classList.add("user-info");

    // Display user info on page
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
  fetchRepos();
  };

    // Fetch repos
  const fetchRepos = async function () {
    const repoRequest = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();
    //console.log(repoData);
    displayRepos(repoData);
  };

    // Display repos of github
  const displayRepos = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  };

    // User select repo
  repoList.addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.matches("h3")) {
      let repoName = e.target.innerText;
      getInfo(repoName);
    }
  });

    // Get specific repo info
  const getInfo = async function(repoName) {
    const grabRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await grabRepo.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    //console.log(languages);

      // loop through the object languageData
    const languages = [languageData];
    for (let code of languages) {
      for (let key in languageData) {
        console.log(key, languageData[key]);
      };
    }
   
      // Display repo info
    const displayRepoInfo = function (repoInfo, languages) {
      repoData = "";
      const div = document.createElement("div");
      div.innerHTML = `
      <h3>Name: ${repoName}</h3>
        <p>Description: ${}</p>
        <p>Default Branch: ${}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" herf="${} target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    }

    
    return(repoList);
  }