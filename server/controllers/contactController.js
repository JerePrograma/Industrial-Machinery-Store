const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const newContact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        res.status(201).json({ message: 'Contact information submitted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting contact information.', error: error.message });
    }
};