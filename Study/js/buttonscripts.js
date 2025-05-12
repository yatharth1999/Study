var color = "none";
var currentSectionIndex = 1;

// Store navigation links in an array
var navLinks = Array.from(document.querySelectorAll('.custom-nav a'));
// Preselect the first navigation link
if (navLinks.length > 0) {
    navLinks[0].classList.add('current-section');
}

function nextSection(hide, show, isBack=false) {
    window.scrollTo(0, 0); // Scroll to the top of the page
    document.getElementById(hide).style.display = "none";
    document.getElementById(show).style.display = "inline";

    if(!isBack){
        if (currentSectionIndex < navLinks.length - 1) {
            currentSectionIndex++;
            highlightNav();
        }
    }else{
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            highlightNav();
        }
    }
    // Move to the next section index and highlight it

}

function previousSection(hide, show) {
    document.getElementById(hide).style.display = "none";
    document.getElementById(show).style.display = "inline";

    // Move to the previous section index and highlight it
    if (currentSectionIndex > 0) {
        currentSectionIndex--;
        highlightNav();
    }
}

function nextRandomSection(hide, show1, show2, isBack=false) {
    document.getElementById(hide).style.display = "none";

    // pull the saved student number
    const studentNumber = getUserNumber();
    const isOdd = (studentNumber % 2) === 1;

    // decide which section to show
    const nextId = isOdd ? show1 : show2;
    document.getElementById(nextId).style.display = "inline";

    // optional: show the color‐coded box
    if (isOdd) {
        document.getElementById("redbox").style.display = "block";
        document.getElementById("bluebox").style.display = "none";
        color = "red";
    } else {
        document.getElementById("bluebox").style.display = "block";
        document.getElementById("redbox").style.display = "none";
        color = "blue";
    }

    // update section index
    currentSectionIndex += isBack ? -1 : 1;
    highlightNav();
}

// Function to highlight the current section in the navigation bar
function highlightNav() {
    // Remove the current-section class from all nav links
    navLinks.forEach(link => link.classList.remove('current-section'));

    // Add the current-section class to the current nav link
    if (navLinks[currentSectionIndex]) {
        navLinks[currentSectionIndex].classList.add('current-section');
    }
}

function checkUser(inputId, invalidId, oldPageId, nextPageId) {
    user = document.getElementById(inputId).value;
    student_letter = user.substring(0, 7);
    student_number = Number(user.substring(7));
    saveUserName(user);

    if (student_letter == "Student" && Number.isInteger(student_number) && student_number > 0) {
        document.getElementById(oldPageId).style.display = "none";
        document.getElementById(nextPageId).style.display = "inline";

        // Determine the color and set the navigation for Training 1 and Training 2
        var navTraining1 = document.getElementById('nav-training1');
        var navTraining2 = document.getElementById('nav-training2');

        // if (student_number % 2 == 0) {
        //     // Training 1 (NAT) and Training 2 (RAFT)
        //     color = "red"; // For NAT
        //     navTraining1.textContent = '6/10 Training 1 (RAFT)';
        //     navTraining1.href = '#Training1';
        //
        //     navTraining2.textContent = '9/10 Training 2 (NAT)';
        //     navTraining2.href = '#Training2';
        // } else {
        //     // Training 1 (RAFT) and Training 2 (NAT)
        //     color = "blue"; // For RAFT
        //     navTraining1.textContent = '6/10 Training 1 (NAT)';
        //     navTraining1.href = '#Training1';
        //
        //     navTraining2.textContent = '9/10 Training 2 (RAFT)';
        //     navTraining2.href = '#Training2';
        // }

        highlightNav(nextPageId); // Highlight next section
    } else {
        showMessage("Invalid username/alias.")
        // document.getElementById(invalidId).style.display = "inline";
    }
}



function saveUserName(username) {
    localStorage.setItem("username", username);
    setAllLinks();
}

function getUserName() {
    return localStorage.getItem("username");
}
function getUserNumber(){
    user = getUserName()
    student_number = Number(user.substring(7));
    return Number(student_number)

}


function showMessage(message) {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #ff4b5c, #d90000)", // Red gradient for error
            color: "#ffffff" // White text for better contrast
        },
        onClick: function(){} // Callback after click
    }).showToast();
}