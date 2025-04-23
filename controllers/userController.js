const supabase = require('../lib/supabaseClient');

// Create user
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }]);

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
};

// Get users
exports.getUsers = async (req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};
