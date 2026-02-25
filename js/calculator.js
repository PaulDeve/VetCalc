/**
 * MÓDULO: CALCULADORA DE POSOLOGÍA
 * Descripción: Lógica de la calculadora de dosis de medicamentos
 * Archivo: js/calculator.js
 */

class CalculatorModule {
    constructor() {
        this.form = document.getElementById('calculatorForm');
        this.resultContainer = document.getElementById('resultContainer');
        this.errorMessage = document.getElementById('errorMessage');
        this.speciesSelect = document.getElementById('species');
        this.weightInput = document.getElementById('weight');
        this.drugSelect = document.getElementById('drug');
        this.saveButton = document.getElementById('saveCalculation');
        
        this.lastResult = null;

        this.init();
    }

    /**
     * Inicializa el módulo
     */
    init() {
        this.attachEventListeners();
        this.populateDrugsList();
    }

    /**
     * Adjunta eventos a los elementos
     */
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleCalculate(e));
        this.speciesSelect.addEventListener('change', () => this.updateDrugsList());
        this.saveButton.addEventListener('click', () => this.saveCalculation());
    }

    /**
     * Llena la lista inicial de medicamentos
     */
    populateDrugsList() {
        const drugs = getAllDrugs();
        const options = ['<option value="">Selecciona un medicamento</option>'];
        
        for (const [key, drug] of Object.entries(drugs)) {
            options.push(`<option value="${key}">${drug.name}</option>`);
        }
        
        this.drugSelect.innerHTML = options.join('');
    }

    /**
     * Actualiza la lista de medicamentos según la especie
     */
    updateDrugsList() {
        const species = this.speciesSelect.value;
        
        if (!species) {
            this.populateDrugsList();
            return;
        }

        const allowedDrugs = getDrugsBySpecies(species);
        const options = ['<option value="">Selecciona un medicamento</option>'];
        
        for (const drug of allowedDrugs) {
            options.push(`<option value="${drug.id}">${drug.name}</option>`);
        }
        
        this.drugSelect.innerHTML = options.join('');
    }

    /**
     * Maneja el envío del formulario
     * @param {Event} event - Evento del formulario
     */
    handleCalculate(event) {
        event.preventDefault();

        const species = this.speciesSelect.value;
        const weight = parseFloat(this.weightInput.value);
        const drugId = this.drugSelect.value;

        // Limpiar mensajes previos
        this.errorMessage.style.display = 'none';
        this.resultContainer.style.display = 'none';

        // Validar entrada
        const validation = {
            species: species !== '' ? null : 'Selecciona una especie',
            weight: weight > 0 ? null : 'Ingresa un peso válido',
            drugId: drugId !== '' ? null : 'Selecciona un medicamento'
        };

        const errors = Object.values(validation).filter(e => e !== null);
        
        if (errors.length > 0) {
            this.showError(errors[0]);
            return;
        }

        // Calcular dosis
        const result = calculateDose(drugId, species, weight);

        if (!result.success) {
            this.showError(result.error);
            return;
        }

        this.lastResult = result;
        this.displayResult(result);
    }

    /**
     * Muestra el resultado del cálculo
     * @param {Object} result - Resultado del cálculo
     */
    displayResult(result) {
        // Llenar campos de resultado
        document.getElementById('resultDrug').textContent = result.drug;
        document.getElementById('resultDose').textContent = `${result.totalDose} ${result.unit}`;
        document.getElementById('resultUnit').textContent = result.unit;
        document.getElementById('resultFrequency').textContent = result.frequency;
        document.getElementById('resultRoute').textContent = result.route;

        // Mostrar advertencias si existen
        const warningsBox = document.getElementById('warningsBox');
        if (result.warnings) {
            warningsBox.innerHTML = `<strong>⚠️ Advertencias:</strong><br>${result.warnings}`;
            warningsBox.style.display = 'block';
        } else {
            warningsBox.style.display = 'none';
        }

        // Mostrar contenedor de resultado
        this.resultContainer.style.display = 'block';

        // Scroll al resultado
        setTimeout(() => {
            this.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    /**
     * Muestra un mensaje de error
     * @param {string} message - Mensaje de error
     */
    showError(message) {
        this.errorMessage.textContent = `❌ Error: ${message}`;
        this.errorMessage.style.display = 'block';

        // Animar error
        this.errorMessage.style.animation = 'none';
        setTimeout(() => {
            this.errorMessage.style.animation = 'shake 500ms ease-in-out';
        }, 10);

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 5000);
    }

    /**
     * Guarda el cálculo realizado en localStorage
     */
    saveCalculation() {
        if (!this.lastResult) return;

        // Obtener historial previo
        let history = JSON.parse(localStorage.getItem('calculationHistory') || '[]');

        // Crear entrada
        const entry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...this.lastResult
        };

        // Agregar entrada (máximo 50 cálculos guardados)
        history.unshift(entry);
        if (history.length > 50) history.pop();

        localStorage.setItem('calculationHistory', JSON.stringify(history));

        // Mostrar confirmación
        const originalText = this.saveButton.textContent;
        this.saveButton.textContent = '✅ Guardado';
        this.saveButton.disabled = true;

        setTimeout(() => {
            this.saveButton.textContent = originalText;
            this.saveButton.disabled = false;
        }, 2000);

        // Disparar evento para actualizar estadísticas
        window.dispatchEvent(new Event('calculationSaved'));
    }

    /**
     * Obtiene el historial de cálculos
     * @returns {Array} Historial de cálculos
     */
    getCalculationHistory() {
        return JSON.parse(localStorage.getItem('calculationHistory') || '[]');
    }

    /**
     * Limpia el historial de cálculos
     */
    clearHistory() {
        localStorage.removeItem('calculationHistory');
        window.dispatchEvent(new Event('calculationSaved'));
    }

    /**
     * Obtiene estadísticas del historial
     * @returns {Object} Estadísticas
     */
    getStatistics() {
        const history = this.getCalculationHistory();
        
        const stats = {
            totalCalculations: history.length,
            drugUsage: {},
            speciesUsage: {}
        };

        for (const calc of history) {
            // Contar por medicamentos
            stats.drugUsage[calc.drug] = (stats.drugUsage[calc.drug] || 0) + 1;
            
            // Contar por especie
            stats.speciesUsage[calc.species] = (stats.speciesUsage[calc.species] || 0) + 1;
        }

        return stats;
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.calculator = new CalculatorModule();
    });
} else {
    window.calculator = new CalculatorModule();
}
