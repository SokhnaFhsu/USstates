const loadStatesData = require('../utils/dataLoader');

exports.getStates = async (req, res) => {
    try {
        const states = loadStatesData();
        res.json(states);
    } catch (error) {
        res.status(500).send('Failed to load state data');
    }
};
