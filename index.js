const birthForm = document.querySelector("#form")
const currentAgeContainer = document.querySelector(".age-container")
const dayInput = document.querySelector("#birthDay")
const monthInput = document.querySelector("#birthMonth")
const yearInput = document.querySelector("#birthYear")
const errorLogs = document.querySelectorAll(".input span")


birthForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const date = new Date(yearInput.value, monthInput.value - 1, dayInput.value)
    const birth = dayjs(date)

    if (validateInputs(birth)) {
        renderUserAge(calculateAge(birth))
        errorLogs.forEach(error => error.classList.add("hidden"))
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Check your inputs and follow the error log'
        })
    }


})

function calculateAge(dateOfBirth) {
    const now = dayjs()

    const years = now.diff(dateOfBirth, "year")
    const months = now.subtract(years, "year").diff(dateOfBirth, "month")
    const days = now.subtract(years, "year").subtract(months, "month").diff(dateOfBirth, "day")

    return {
        years,
        months,
        days
    }

}
function renderUserAge(dateOfBirth) {
    const years = document.querySelector("#currentYears")
    const months = document.querySelector("#currentMonths")
    const days = document.querySelector("#currentDays")

    years.innerHTML = `<span class="ageNumber">${animateYears(dateOfBirth.years)}</span> ${dateOfBirth.years > 1 ? "years" : "year"}`
    months.innerHTML = `<span class="ageNumber">${animateMonths(dateOfBirth.months)}</span> ${dateOfBirth.months > 1 ? "months" : "month"}`
    days.innerHTML = `<span class="ageNumber">${animateDays(dateOfBirth.days)}</span> ${dateOfBirth.days > 1 ? "days" : "day"}`

    animateYears(dateOfBirth)
    animateMonths(dateOfBirth)
    animateDays(dateOfBirth)




}
function validateInputs(dateOfBirth) {
    const errorLogs = ["Must be a valid day", "Must be a valid Month", "Must be in the past"]
    const now = dayjs()

    const inputStatus = {
        years: true,
        months: true,
        days: true
    }

    if (now.diff(dateOfBirth) < 1) {
        document.querySelector(".yearError").innerText = errorLogs[2]
        document.querySelector(".yearError").classList.remove("hidden")

    }


    if (dayInput.value === null || dayInput.value === "" || isNaN(dayInput.value) || dayInput.value < 1 || dayInput.value > 31) {
        inputStatus.days = false;
    }
    if (dayInput.value > 30 && monthInput.value == 6 || dayInput.value > 30 && monthInput.value == 4 || dayInput.value > 30 && monthInput.value == 9 || dayInput.value > 30 && monthInput.value == 11) {
        inputStatus.days = false;
    }
    if (monthInput.value == 2 && dayInput.value > 28) {
        inputStatus.days = false
    }
    if (monthInput.value === null || monthInput.value === "" || isNaN(monthInput.value) || monthInput.value < 1 || monthInput.value > 12) {
        inputStatus.months = false;
    } if (yearInput.value === null || yearInput.value === "" || isNaN(yearInput.value) || yearInput.value > dayjs().year()) {
        inputStatus.years = false;
    }


    if (!inputStatus.days) {
        document.querySelector(".dayError").innerText = errorLogs[0]
        document.querySelector(".dayError").classList.remove("hidden")

    }
    if (!inputStatus.months) {
        document.querySelector(".monthError").innerText = errorLogs[1]
        document.querySelector(".monthError").classList.remove("hidden")

    }
    if (!inputStatus.years) {
        document.querySelector(".yearError").innerText = errorLogs[2]
        document.querySelector(".monthError").classList.remove("hidden")

    }

    if (inputStatus.days && inputStatus.months && inputStatus.years) {
        return true
    } else {
        return false
    }

}
function animateYears(dateOfBirth) {
    const yearTarget = document.querySelector("#currentYears .ageNumber")

    anime({
        targets: yearTarget,
        innerHTML: dateOfBirth.years, 
        round: 1, 
        easing: 'linear', 
        duration: 500, 
    });
}
    function animateMonths(dateOfBirth) {
        const monthTarget = document.querySelector("#currentMonths .ageNumber")

        anime({
            targets: monthTarget,
            innerHTML: dateOfBirth.months, 
            round: 1, 
            easing: 'linear',
            duration: 500, 
        });

    }
    function animateDays(dateOfBirth) {
        const dayTarget = document.querySelector("#currentDays .ageNumber")

        anime({
            targets: dayTarget,
            innerHTML: dateOfBirth.days, 
            round: 1, 
            easing: 'linear', 
            duration: 500, 
        });
    }


