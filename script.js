
const movies = [
    {
        id: "Oppenheimer",
        title: "Oppenheimere",
        genre: "Action • Adventure • Sci-Fi",
        rating: 4.8,
        duration: "3h 2m",
        language: "English",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
    },

    {
        id: "inception",
        title: "Inception",
        genre: "Sci-Fi • Thriller • Drama",
        rating: 4.7,
        duration: "2h 28m",
        language: "English",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1"
    },

    {
        id: "interstellar",
        title: "Interstellar",
        genre: "Sci-Fi • Adventure • Drama",
        rating: 4.9,
        duration: "2h 49m",
        language: "English",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728"
    },

    {
        id: "dark-knight",
        title: "The Dark Knight",
        genre: "Action • Crime • Drama",
        rating: 4.9,
        duration: "2h 32m",
        language: "English",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0"
    }
];


// -----------------------------
// Theatre Data
// -----------------------------

const theatres = [
    {
        id: 1,
        name: "PVR Cinemas",
        location: "Faridabad",
        shows: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
    },

    {
        id: 2,
        name: "INOX",
        location: "Faridabad",
        shows: ["11:00 AM", "2:30 PM", "6:00 PM", "9:00 PM"]
    },

    {
        id: 3,
        name: "Cinepolis",
        location: "Delhi",
        shows: ["10:30 AM", "1:45 PM", "4:45 PM", "8:00 PM"]
    }
];


// -----------------------------
// Seat Configuration
// -----------------------------

const seatRows = ["A", "B", "C", "D", "E", "F"];

const seatsPerRow = 8;

const ticketPrice = 180;


// -----------------------------
// Get Selected Movie
// -----------------------------

function getSelectedMovie() {

    const params = new URLSearchParams(window.location.search);

    const movieId = params.get("movie");

    if (!movieId) {
        return null;
    }

    return movies.find(movie => movie.id === movieId);
}


// -----------------------------
// Search Movies
// -----------------------------

function searchMovie() {

    const input =
        document.getElementById("movieSearch");

    if (!input) {
        return;
    }

    const searchText =
        input.value.toLowerCase().trim();

    const movieCards =
        document.querySelectorAll(".movie-card");

    if (searchText === "") {

        movieCards.forEach(card => {
            card.style.display = "block";
        });

        return;
    }

    let found = false;

    movieCards.forEach(card => {

        const titleElement =
            card.querySelector("h3");

        if (!titleElement) {
            return;
        }

        const title =
            titleElement.textContent.toLowerCase();

        if (title.includes(searchText)) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });

    if (!found) {

        alert("Movie not found.");

    }
}


// -----------------------------
// Movie Details
// -----------------------------

function loadMovieDetails() {

    const movie = getSelectedMovie();

    if (!movie) {
        return;
    }

    const title =
        document.getElementById("movieTitle");

    const genre =
        document.getElementById("movieGenre");

    const rating =
        document.getElementById("movieRating");

    const duration =
        document.getElementById("movieDuration");

    const language =
        document.getElementById("movieLanguage");

    const image =
        document.getElementById("movieImage");


    if (title) {
        title.textContent = movie.title;
    }

    if (genre) {
        genre.textContent = movie.genre;
    }

    if (rating) {
        rating.textContent = "★ " + movie.rating;
    }

    if (duration) {
        duration.textContent = movie.duration;
    }

    if (language) {
        language.textContent = movie.language;
    }

    if (image) {
        image.src = movie.image;
    }
}


// -----------------------------
// Generate Seats
// -----------------------------

function generateSeats() {

    const seatContainer =
        document.getElementById("seatContainer");

    if (!seatContainer) {
        return;
    }

    seatContainer.innerHTML = "";

    seatRows.forEach(row => {

        const rowContainer =
            document.createElement("div");

        rowContainer.className = "seat-row";


        const rowLabel =
            document.createElement("span");

        rowLabel.className = "row-label";

        rowLabel.textContent = row;

        rowContainer.appendChild(rowLabel);


        for (let i = 1; i <= seatsPerRow; i++) {

            const seat =
                document.createElement("button");

            seat.className = "seat";

            seat.textContent = i;

            seat.dataset.seat =
                row + i;

            seat.addEventListener(
                "click",
                () => selectSeat(seat)
            );

            rowContainer.appendChild(seat);
        }

        seatContainer.appendChild(rowContainer);

    });

    updateBookingSummary();
}


// -----------------------------
// Select Seat
// -----------------------------

function selectSeat(seat) {

    if (seat.classList.contains("booked")) {

        alert("This seat is already booked.");

        return;
    }

    seat.classList.toggle("selected");

    updateBookingSummary();
}


// -----------------------------
// Get Selected Seats
// -----------------------------

function getSelectedSeats() {

    const selectedSeats =
        document.querySelectorAll(
            ".seat.selected"
        );

    return Array.from(selectedSeats)
        .map(seat => seat.dataset.seat);
}


// -----------------------------
// Calculate Total
// -----------------------------

function calculateTotal() {

    const selectedSeats =
        getSelectedSeats();

    return selectedSeats.length * ticketPrice;
}


// -----------------------------
// Update Booking Summary
// -----------------------------

function updateBookingSummary() {

    const selectedSeats =
        getSelectedSeats();

    const total =
        calculateTotal();


    const selectedSeatElement =
        document.getElementById("selectedSeats");

    const totalElement =
        document.getElementById("totalAmount");

    const ticketCount =
        document.getElementById("ticketCount");


    if (selectedSeatElement) {

        if (selectedSeats.length === 0) {

            selectedSeatElement.textContent =
                "No seats selected";

        } else {

            selectedSeatElement.textContent =
                selectedSeats.join(", ");

        }

    }


    if (ticketCount) {

        ticketCount.textContent =
            selectedSeats.length;

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + total;

    }
}


// -----------------------------
// Confirm Booking
// -----------------------------

function confirmBooking() {

    const selectedSeats =
        getSelectedSeats();

    if (selectedSeats.length === 0) {

        alert(
            "Please select at least one seat."
        );

        return;

    }


    const movie =
        getSelectedMovie();


    const booking = {

        id:
            "MB" +
            Date.now(),

        movie:
            movie ? movie.title : "Selected Movie",

        seats:
            selectedSeats,

        tickets:
            selectedSeats.length,

        total:
            calculateTotal(),

        date:
            new Date().toLocaleDateString(),

        status:
            "Confirmed"

    };


    // Get previous bookings

    let bookings =
        JSON.parse(
            localStorage.getItem("movieBookings")
        ) || [];


    // Add new booking

    bookings.push(booking);


    // Save booking

    localStorage.setItem(
        "movieBookings",
        JSON.stringify(bookings)
    );


    alert(
        "Booking confirmed successfully!"
    );


    window.location.href =
        "bookings.html";
}


// -----------------------------
// Display Booking History
// -----------------------------

function loadBookings() {

    const bookingContainer =
        document.getElementById(
            "bookingContainer"
        );

    if (!bookingContainer) {
        return;
    }


    const bookings =
        JSON.parse(
            localStorage.getItem("movieBookings")
        ) || [];


    if (bookings.length === 0) {

        bookingContainer.innerHTML = `
            <div class="no-bookings">
                <h3>No bookings found</h3>
                <p>
                    You have not booked any movie tickets yet.
                </p>
                <a href="movies.html">
                    Browse Movies
                </a>
            </div>
        `;

        return;
    }


    bookingContainer.innerHTML = "";


    bookings.reverse().forEach(booking => {

        const card =
            document.createElement("div");

        card.className =
            "booking-card";


        card.innerHTML = `

            <h3>${booking.movie}</h3>

            <p>
                <strong>Booking ID:</strong>
                ${booking.id}
            </p>

            <p>
                <strong>Seats:</strong>
                ${booking.seats.join(", ")}
            </p>

            <p>
                <strong>Tickets:</strong>
                ${booking.tickets}
            </p>

            <p>
                <strong>Total:</strong>
                ₹${booking.total}
            </p>

            <p>
                <strong>Date:</strong>
                ${booking.date}
            </p>

            <span class="booking-status">
                ${booking.status}
            </span>

        `;


        bookingContainer.appendChild(card);

    });

}


// -----------------------------
// Clear Booking History
// -----------------------------

function clearBookings() {

    const confirmation =
        confirm(
            "Are you sure you want to clear all bookings?"
        );


    if (!confirmation) {
        return;
    }


    localStorage.removeItem(
        "movieBookings"
    );


    loadBookings();

    alert(
        "Booking history cleared."
    );
}


// -----------------------------
// Logout
// -----------------------------

function logout() {

    localStorage.removeItem(
        "movieUser"
    );

    alert(
        "You have been logged out."
    );

    window.location.href =
        "index.html";
}




document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadMovieDetails();

        generateSeats();

        loadBookings();

    }
);
