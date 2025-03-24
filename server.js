const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample data for medicines
let medicines = [
    {
        id: 1,
        name: "Paracetamol",
        description: "Pain reliever and fever reducer",
        price: 10.0,
        imageUrl: "https://example.com/paracetamol.jpg",
        category: "Pain Relief",
        stock: 100
    },
    {
        id: 2,
        name: "Ibuprofen",
        description: "Anti-inflammatory and pain reliever",
        price: 15.0,
        imageUrl: "https://example.com/ibuprofen.jpg",
        category: "Pain Relief",
        stock: 50
    },
    {
        id: 3,
        name: "Amoxicillin",
        description: "Antibiotic for bacterial infections",
        price: 20.0,
        imageUrl: "https://example.com/amoxicillin.jpg",
        category: "Antibiotics",
        stock: 30
    }
];

// Store orders
let orders = [];

// Store prescriptions
let prescriptions = [];

// Store users
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", loyaltyPoints: 100 }
];

// Store payments
let payments = [];

// Endpoint to fetch all medicines
app.get('/medicines', (req, res) => {
    res.json(medicines);
});

// Endpoint to fetch medicine by ID
app.get('/medicines/:id', (req, res) => {
    const medicineId = parseInt(req.params.id);
    const medicine = medicines.find(m => m.id === medicineId);
    if (medicine) {
        res.json(medicine);
    } else {
        res.status(404).json({ message: "Medicine not found" });
    }
});

// Endpoint to place an order
app.post('/orders', (req, res) => {
    const { userId, items, deliveryAddress, deliveryDate } = req.body;

    const order = {
        id: orders.length + 1,
        userId,
        items,
        deliveryAddress,
        deliveryDate,
        status: "Pending", // Pending, Shipped, Delivered
        trackingId: `TRACK${orders.length + 1}`
    };

    orders.push(order);
    res.json({ message: "Order placed successfully", order });
});

// Endpoint to upload prescription
app.post('/prescriptions', (req, res) => {
    const { userId, fileUrl } = req.body;

    const prescription = {
        id: prescriptions.length + 1,
        userId,
        fileUrl,
        status: "Pending" // Pending, Approved, Rejected
    };

    prescriptions.push(prescription);
    res.json({ message: "Prescription uploaded successfully", prescription });
});

// Endpoint to fetch all orders (for admin)
app.get('/admin/orders', (req, res) => {
    res.json(orders);
});

// Endpoint to update order status (for admin)
app.put('/admin/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        res.json({ message: "Order status updated", order });
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

// Endpoint to fetch all prescriptions (for admin)
app.get('/admin/prescriptions', (req, res) => {
    res.json(prescriptions);
});

// Endpoint to update prescription status (for admin)
app.put('/admin/prescriptions/:id', (req, res) => {
    const prescriptionId = parseInt(req.params.id);
    const { status } = req.body;

    const prescription = prescriptions.find(p => p.id === prescriptionId);
    if (prescription) {
        prescription.status = status;
        res.json({ message: "Prescription status updated", prescription });
    } else {
        res.status(404).json({ message: "Prescription not found" });
    }
});

// Endpoint to fetch all users (for admin)
app.get('/admin/users', (req, res) => {
    res.json(users);
});

// Endpoint to fetch all payments (for admin)
app.get('/admin/payments', (req, res) => {
    res.json(payments);
});

// Serve static files for the admin dashboard
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});