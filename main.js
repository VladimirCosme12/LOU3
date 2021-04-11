const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};
//Sign Up Event 
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            signupForm.reset();
            $('#msignupModal').modal('hide')
            console.log('sign up')
        })

});

//Login Event
const singinForm = document.querySelector('#login-form');
singinForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            signupForm.reset();
            $('#signupModal').modal('hide')
            console.log('sign in')
        })
});

//Log Out
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('sign out')

    })
})

const postList = document.querySelector(".posts");
const setupPosts = (data) => {
    if (data.length) {
        let html = "";
        data.forEach((doc) => {
            const post = doc.data();
            const li = `
            <li class="list-group-item list-group-item-action">
            <h5>${post.post}</h5>
            <p>${post.descripcion}</p>
          </li>
      
    `;
            html += li;
        });
        postList.innerHTML = html;
    } else {
        postList.innerHTML = '<h4 class="text-white">Login to See Posts</h4>';
    }
    
};

// events
// list for auth state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("signin");
        fs.collection("post")
            .get()
            .then((snapshot) => {
                setupPosts(snapshot.docs);
                loginCheck(user);
            });
    } else {
        console.log("signout");
        setupPosts([]);
        loginCheck(user);
    }
});

