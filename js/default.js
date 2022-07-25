//to let everypage access and display
if (localStorage.getItem('itemCount') === "0") {
    $('#courseCount').html(localStorage.itemCount).hide()
} else
    $('#courseCount').html(localStorage.itemCount)


//add course to localStorage
function addCourse() {
    //tocheck if storage is created
    if (localStorage.checkStorage == null)
        localStorage.checkStorage = 0;

    if (parseInt(localStorage.checkStorage) === 0) {
        localStorage.course = [];
        localStorage.itemCount = 0;
    }

    const courseList = [

        {id: "C01", course: "Web Programming"},
        {id: "C02", course: "Javascript Fundamentals"},
        {id: "C03", course: "Basic of Photo Editing"},
        {id: "C04", course: "Discrete Mathematics"},
        {id: "C05", course: "Python Programming"}

    ]

    $("button").click(function () {

        const courseID = $(this).data("id");
        let courseID_num = parseInt(courseID.substring(1));
        let Course = new Object(courseList[courseID_num - 1]);

        var course = localStorage.course;

        if (course == null || course.length === 0) {
            course = [];
        } else {
            course = JSON.parse(course);
        }

        //check if course is added
        var checkExist = false;
        for (let i = 0; i < course.length; i++) {
            if (course[i].id === courseID) {
                checkExist = true;
                break;
            }
        }

        if (checkExist) {

            Swal.fire({
                title: 'Course already added',
                text: "Do you want to remove from register ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    //remove localstorage item 
                    for (let i = 0; i < course.length; i++) {
                        if (course[i].id === courseID) {
                            course.splice(i, 1)
                            localStorage.course = JSON.stringify(course);
                            localStorage.itemCount = course.length;
                            if (localStorage.getItem('itemCount') === "0") {
                                $('#courseCount').html(localStorage.itemCount).hide()
                            } else
                                $('#courseCount').html(localStorage.itemCount)
                        }
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Course removed from register ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        } else {
            course.push(Course);
            localStorage.itemCount = course.length;

            $('#courseCount').html(localStorage.itemCount).show()

            localStorage.course = JSON.stringify(course);
            Swal.fire({
                icon: 'success',
                title: 'Course added successfully',
                showConfirmButton: false,
                timer: 1500
            });
            //counter
            localStorage.checkStorage = 1;


        }
    });

}

//display course
function displayCourse() {
    if (localStorage.getItem('course')) {

        var display = document.querySelector("tbody");
        display.innerHTML = "";
        JSON.parse(localStorage.getItem('course')).forEach(data => {
            display.innerHTML += '<tr><td>' + data.id + '</td><td>' + data.course + '</td></tr>'
        })
    }
}

//add data enrollment form to localStorage
function enrollmentForm() {

    let enrollmentData = JSON.parse(localStorage.getItem('enrollmentData')) || [];

    const name = document.getElementById('mf-fullName').value;
    const contactNumber = document.getElementById('mf-phoneNumber').value;
    const email = document.getElementById('mf-email').value;

    const subSelection = document.getElementById('mf-subjects');
    let subject = subSelection.options[subSelection.selectedIndex].value;

    if (name === "") {
        Swal.fire({
            icon: 'error',
            title: 'Please fill in the name',
            showConfirmButton: true
        });
        return false;
    } else if (contactNumber === "") {
        Swal.fire({
            icon: 'error',
            title: 'Please fill in the contact number',
            showConfirmButton: true
        });
        return false;
    } else if (email === "") {
        Swal.fire({
            icon: 'error',
            title: 'Please select your email',
            showConfirmButton: true
        });
        return false;
    } else {

        //not empty
        enrollmentData.push({
            FullName: name,
            ContactNumber: contactNumber,
            Email: email,
            Subject: subject
        });

        localStorage.setItem('enrollmentData', JSON.stringify(enrollmentData));

        Swal.fire({
            icon: 'success',
            title: 'Enrollment form submitted successfully',
            showConfirmButton: false,
            timer: 1500
        });

    }


}

//save register form data to local storage
function registerData(source) {

    const name = document.getElementById('fullName').value;
    const contactNumber = document.getElementById('contactNum').value;
    const email = document.getElementById('email').value;
    const bDay = document.getElementById('bDay').value;

    //radio
    const form = document.forms.registerForm;
    const gender = form.querySelector('input[name="gender"]:checked').value;
    const classSelection = form.querySelector('input[name="classSelection"]:checked').value;


    if (source === "fromForm") {

        const subSelection = document.getElementById('subjects');
        let subject = subSelection.options[subSelection.selectedIndex].value;

        //creating array to store
        let saveFromForm = JSON.parse(localStorage.getItem('saveFromForm')) || [];

        //validation
        if (name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please fill in the name',
                showConfirmButton: true
            });
            return false;
        } else if (contactNumber === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please fill in the contact number',
                showConfirmButton: true
            });
            return false;
        } else if (email === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please select your email',
                showConfirmButton: true
            });
            return false;
        } else if (bDay === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please select your birthdate',
                showConfirmButton: true
            });
        } else {

            //not empty
            saveFromForm.push({
                FullName: name,
                ContactNumber: contactNumber,
                Email: email,
                Birthday: bDay,
                Gender: gender,
                ClassType: classSelection,
                Subject: subject
            });

            localStorage.setItem('saveFromForm', JSON.stringify(saveFromForm));

            Swal.fire({
                icon: 'success',
                title: 'Register form submitted successfully',
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                //to refresh the page back to the top.
                location.replace("registerForm.html");
            });
        }//end else

    } else if (source === "fromCourse") {

        let subjectChoosen = ""

        if (localStorage.getItem('course') === null) {
            Swal.fire({
                icon: 'error',
                title: 'No course is added',
                showConfirmButton: true
            });
            return false;
        } else {
            JSON.parse(localStorage.getItem('course')).forEach(data => {
                subjectChoosen += data.course;
            })
        }


        console.log(subjectChoosen)

        //creating array to store
        let saveFromCourse = JSON.parse(localStorage.getItem('saveFromCourse')) || [];

        //validation
        if (name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please fill in the name',
                showConfirmButton: true
            });
            return false;
        } else if (contactNumber === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please fill in the contact number',
                showConfirmButton: true
            });
            return false;
        } else if (email === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please select your email',
                showConfirmButton: true
            });
            return false;
        } else if (bDay === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please select your birthdate',
                showConfirmButton: true
            });
        } else {

            //not empty
            saveFromCourse.push({
                FullName: name,
                ContactNumber: contactNumber,
                Email: email,
                Birthday: bDay,
                Gender: gender,
                ClassType: classSelection,
                Subject: JSON.stringify(subjectChoosen)
            });

            localStorage.setItem('saveFromCourse', JSON.stringify(saveFromCourse));

            Swal.fire({
                icon: 'success',
                title: 'Register form submitted successfully',
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                //to refresh the page back to the top.
                location.replace("registerForm.html");
            });
        }//end else


    } else
        console.log("Source Error");

}

//save contactForm data to local storage
function submitContactForm() {
    //creating array to store
    let contactFormData = JSON.parse(localStorage.getItem('contactFormData')) || [];

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    //if statement to validate
    if (name === "") {
        Swal.fire({
            icon: 'error',
            title: 'Please fill in the name',
            showConfirmButton: true

        });
        return false;
    } else if (email === "") {
        Swal.fire({
            icon: 'error',
            title: 'Please fill in the email',
            showConfirmButton: true

        });
    } else if (message === "") {
        Swal.fire({
            icon: 'error',
            title: 'Please fill in the message',
            showConfirmButton: true

        });
    } else {
        //if not empty then push to local storage.
        contactFormData.push({
            Name: name,
            Email: email,
            Message: message
        });

        localStorage.setItem('contactFormData', JSON.stringify(contactFormData));

        //display message
        Swal.fire({
            icon: 'success',
            title: 'Message Send !!',
            showConfirmButton: false,
            timer: 1500
        }).then(function () {
            //to refresh the page back to the top
            location.replace("contact.html");
        });

    }
}

//webNotif
function webNotification() {
    if (Notification.permission !== 'denied' || Notification.permission === "default") {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                console.log("Web Notification Allowed");
                Swal.fire({
                    icon: 'success',
                    title: 'Web Notification is Allowed',
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {
                console.log("Web Notification Denied");
            }

        });
    }
}

//cache for offline
async function registerSW() {
    if ('serviceWorker' in navigator) {

        try {
            await navigator.serviceWorker.register('./serviceWorker.js');
        } catch (e) {
            console.log('Service Worker Fail to Load');
        }
    }
}


