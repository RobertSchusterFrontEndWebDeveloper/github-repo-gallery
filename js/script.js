  // Select the div with - the profile info section
const overview = document.querySelector(".overview"); 
const username = "rob17204";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector("input.filter-repos");

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
    // empty the data field
  overview.innerHTML = ""; 

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

    // Display all of my public repos on github
  const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
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
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    //console.log(languages);

      // loop through the object languageData
    const languages = [];
    for (const language in languageData) {
      languages.push(language);
    }
      displayRepoInfo(repoInfo, languages);
  };  
   
    // Display individual repo info
  const displayRepoInfo = function (repoInfo, languages) {
    repoData.HTML = "";
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    backToRepo.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = ` 
      <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
      `;
      repoData.append(div);
    };
   
    backToRepo.addEventListener("click", function(e) {
      reposSection.classList.remove("hide");
      repoData.classList.add("hide");
      backToRepo.classList.add("hide");
      repoList.classList.remove("hide");
      repoData.innerHTML="";
      displayRepos();
    });

      // Input repo data name or other 
    filterInput.addEventListener("input", function(e) {
      const searchText = e.target.value;
      const pageRepos = document.querySelectorAll(".repo");
      const searchTextLower = searchText.toLowerCase();
      
      for (const repo of pageRepos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchTextLower)) {
          repo.classList.remove("hide");
        } else {
          repo.classList.add("hide");
        };
      }
    });
    
