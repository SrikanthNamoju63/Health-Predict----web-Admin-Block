document.addEventListener("DOMContentLoaded", function () {
    fetchMedicines();
    fetchOrders();
    fetchPrescriptions();
    fetchUsers();
});

// Fetch and display medicines
function fetchMedicines() {
    fetch("http://localhost:3000/medicines")
        .then((response) => response.json())
        .then((data) => {
            const medicinesTableBody = document.getElementById("medicinesTableBody");
            medicinesTableBody.innerHTML = data
                .map(
                    (medicine) => `
                    <tr>
                        <td>${medicine.id}</td>
                        <td>${medicine.name}</td>
                        <td>${medicine.description}</td>
                        <td>${medicine.price}</td>
                        <td>${medicine.category}</td>
                        <td>${medicine.stock}</td>
                        <td>
                            <button class="btn btn-sm btn-warning">Edit</button>
                            <button class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                `
                )
                .join("");
        });
}

// Fetch and display orders
function fetchOrders() {
    fetch("http://localhost:3000/admin/orders")
        .then((response) => response.json())
        .then((data) => {
            const ordersTableBody = document.getElementById("ordersTableBody");
            ordersTableBody.innerHTML = data
                .map(
                    (order) => `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.userId}</td>
                        <td>${order.status}</td>
                        <td>${order.trackingId}</td>
                        <td>
                            <button class="btn btn-sm btn-primary">Update Status</button>
                        </td>
                    </tr>
                `
                )
                .join("");
        });
}

// Fetch and display prescriptions
function fetchPrescriptions() {
    fetch("http://localhost:3000/admin/prescriptions")
        .then((response) => response.json())
        .then((data) => {
            const prescriptionsTableBody = document.getElementById("prescriptionsTableBody");
            prescriptionsTableBody.innerHTML = data
                .map(
                    (prescription) => `
                    <tr>
                        <td>${prescription.id}</td>
                        <td>${prescription.userId}</td>
                        <td>${prescription.status}</td>
                        <td>
                            <button class="btn btn-sm btn-success">Approve</button>
                            <button class="btn btn-sm btn-danger">Reject</button>
                        </td>
                    </tr>
                `
                )
                .join("");
        });
}

// Fetch and display users
function fetchUsers() {
    fetch("http://localhost:3000/admin/users")
        .then((response) => response.json())
        .then((data) => {
            const usersTableBody = document.getElementById("usersTableBody");
            usersTableBody.innerHTML = data
                .map(
                    (user) => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.loyaltyPoints}</td>
                    </tr>
                `
                )
                .join("");
        });
}

// Open Add Medicine Modal
function openAddMedicineModal() {
    const modal = new bootstrap.Modal(document.getElementById("addMedicineModal"));
    modal.show();
}

// Add Medicine Form Submission
document.getElementById("addMedicineForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const medicine = {
        name: document.getElementById("medicineName").value,
        description: document.getElementById("medicineDescription").value,
        price: parseFloat(document.getElementById("medicinePrice").value),
        category: document.getElementById("medicineCategory").value,
        stock: parseInt(document.getElementById("medicineStock").value),
    };

    fetch("http://localhost:3000/admin/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicine),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Medicine added successfully!");
            fetchMedicines();
        });
});