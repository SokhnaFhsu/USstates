const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');
const { updateFunFact } = require('../controllers/statesController');
console.log(statesController); 

router.get('/', statesController.getAllStates);
router.get('/:state', statesController.getStateDetails);
router.post('/:state/funfact', statesController.addFunFact);
router.patch('/:state/funfact', statesController.updateFunFact);
router.delete('/:state/funfact', statesController.deleteFunFact);
router.patch('/:state/funfact', updateFunFact);
router.get('/:state/capital', (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const state = statesData.find(s => s.stateCode === stateCode);
    if (state) {
        res.json({ state: state.name, capital: state.capital });
    } else {
        res.status(404).json({ error: "State not found" });
    }
});

router.get('/', (req, res) => {
    if (req.query.contig === 'true') {
        const contiguousStates = statesData.filter(state => state.stateCode !== 'AK' && state.stateCode !== 'HI');
        res.json(contiguousStates);
    } else if (req.query.contig === 'false') {
        const nonContiguousStates = statesData.filter(state => state.stateCode === 'AK' || state.stateCode === 'HI');
        res.json(nonContiguousStates);
    } else {
        res.json(statesData);
    }
});


module.exports = router;

