// Calculadora - Módulo simplificado
if (!window.calculator) {
    window.calculator = {
        getCalculationHistory: function() {
            return JSON.parse(localStorage.getItem('calculationHistory') || '[]');
        },
        getStatistics: function() {
            return { totalCalculations: this.getCalculationHistory().length, drugUsage: {}, speciesUsage: {} };
        },
        clearHistory: function() {
            localStorage.removeItem('calculationHistory');
        }
    };
    
    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const species = document.getElementById('species').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const drugId = document.getElementById('drug').value;
        
        if (!species || !weight || !drugId) {
            alert('Completa todos los campos');
            return;
        }
        
        const result = calculateDose(drugId, species, weight);
        if (result.success) {
            document.getElementById('resultDrug').textContent = result.drug;
            document.getElementById('resultDose').textContent = result.totalDose + ' ' + result.unit;
            document.getElementById('resultUnit').textContent = result.unit;
            document.getElementById('resultFrequency').textContent = result.frequency;
            document.getElementById('resultRoute').textContent = result.route;
            document.getElementById('warningsBox').innerHTML = '<strong>⚠️ Advertencias:</strong><br>' + result.warnings;
            document.getElementById('warningsBox').style.display = 'block';
            document.getElementById('resultContainer').style.display = 'block';
            
            const history = window.calculator.getCalculationHistory();
            history.unshift({ id: Date.now(), timestamp: new Date().toISOString(), ...result });
            if (history.length > 50) history.pop();
            localStorage.setItem('calculationHistory', JSON.stringify(history));
        } else {
            alert('Error: ' + result.error);
        }
    });

    document.getElementById('species').addEventListener('change', function() {
        const species = this.value;
        const drugs = getDrugsBySpecies(species);
        const drugSelect = document.getElementById('drug');
        drugSelect.innerHTML = '<option value="">Selecciona medicamento</option>' + drugs.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    });
}
