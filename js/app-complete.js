// VetCalc - Aplicación Completa Simplificada
(function() {
    'use strict';

    // ============= DATOS =============
    const DRUGS = {
        'pen-duo-strep': { name: 'Pen Duo Strep 250/200', route: 'IM/IV', frequency: 'C/12h', unit: 'mL', warnings: 'No usar en alérgicos', species: { perro: 0.04, gato: 0.03, oveja: 0.05, conejo: 0.02 }},
        'dexalan': { name: 'Dexalan 500 mL', route: 'IM', frequency: 'C/48-72h', unit: 'mL', warnings: 'No prolongar', species: { perro: 0.02, gato: 0.015, oveja: 0.03, conejo: 0.01 }},
        'catosal': { name: 'Catosal 100 mL', route: 'IM/IV', frequency: 'C/48h', unit: 'mL', warnings: 'Reconstituyente', species: { perro: 0.01, gato: 0.005, oveja: 0.02, conejo: 0.005, aves: 0.001 }},
        'meloxisan': { name: 'Meloxisan Pets 50mL', route: 'IM/IV', frequency: 'C/24h', unit: 'mL', warnings: 'Máximo 10 días', species: { perro: 0.1, gato: 0.08, oveja: 0.1, conejo: 0.06 }},
        'entomic': { name: 'Entomic 10% 100 mL', route: 'SC/IM', frequency: 'C/7-14 días', unit: 'mL', warnings: 'No sobredosar', species: { perro: 0.004, gato: 0.003, oveja: 0.01, conejo: 0.002, aves: 0.002 }},
        'biomizona': { name: 'Biomizona 100 mL', route: 'IM/IV', frequency: 'C/48-72h', unit: 'mL', warnings: 'Seguro en todas', species: { perro: 0.02, gato: 0.015, oveja: 0.03, conejo: 0.01, aves: 0.005 }},
        'hepatin': { name: 'Hepatin', route: 'IM/IV', frequency: 'C/24-48h', unit: 'Ampolla', warnings: 'Protector hepático', species: { perro: 1, gato: 0.5, oveja: 1, conejo: 0.25 }},
        'bio-c': { name: 'Bio-C', route: 'IM/IV', frequency: 'C/48-72h', unit: 'mL', warnings: 'Para estrés', species: { perro: 0.01, gato: 0.01, oveja: 0.02, conejo: 0.01, aves: 0.005 }},
        'vigantol': { name: 'Vigantol Biovalgina 250 mL', route: 'IM', frequency: 'C/7-10 días', unit: 'mL', warnings: 'Vitamina D3', species: { perro: 0.001, gato: 0.0005, oveja: 0.002, conejo: 0.0005, aves: 0.0002 }}
    };

    const VACCINES = {
        perro: ['Parvovirus', 'Moquillo', 'Rabia'],
        gato: ['Triple Felina', 'Rabia'],
        oveja: ['Clostridiales'],
        conejo: ['Mixomatosis', 'VHD'],
        aves: ['Newcastle']
    };

    // ============= APP =============
    window.app = {
        switchSection(sectionId) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        },
        toggleTheme() {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
        }
    };

    // ============= CALCULADORA =============
    window.calculator = {
        getCalculationHistory() { return JSON.parse(localStorage.getItem('calcHistory') || '[]'); },
        getStatistics() { return { totalCalculations: this.getCalculationHistory().length }; }
    };

    // ============= VACUNAS =============
    window.vaccines = {
        getVaccineRecords() { return JSON.parse(localStorage.getItem('vaccineRecords') || '[]'); },
        getStatistics() {
            const records = this.getVaccineRecords();
            return { totalVaccines: records.length, upcoming: records.filter(r => r.upcoming).length, vigent: 0, expired: 0 };
        }
    };

    // ============= ESTADÍSTICAS =============
    window.stats = {
        updateStats() {
            const calcs = window.calculator.getCalculationHistory();
            const vaccs = window.vaccines.getVaccineRecords();
            document.getElementById('totalTreatments').textContent = calcs.length;
            document.getElementById('totalVaccines').textContent = vaccs.length;
            document.getElementById('upcomingVaccines').textContent = vaccs.filter(v => v.upcoming).length;
        },
        getSummary() {
            return { totalTreatments: window.calculator.getCalculationHistory().length, totalVaccines: window.vaccines.getVaccineRecords().length, upcomingVaccines: 0 };
        },
        exportData() {
            const data = { calculations: window.calculator.getCalculationHistory(), vaccines: window.vaccines.getVaccineRecords() };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `VetCalc_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        clearAllData() {
            if (confirm('¿Eliminar todos los datos?')) {
                localStorage.clear();
                location.reload();
            }
        }
    };

    // ============= FUNCIONES GLOBALES =============
    window.calculateDose = function(drugId, species, weight) {
        const drug = DRUGS[drugId];
        if (!drug || !drug.species[species]) return { success: false, error: 'No válido' };
        return {
            success: true,
            drug: drug.name,
            totalDose: (weight * drug.species[species]).toFixed(4),
            unit: drug.unit,
            route: drug.route,
            frequency: drug.frequency,
            warnings: drug.warnings
        };
    };

    window.getDrugsBySpecies = function(species) {
        return Object.entries(DRUGS).filter(([_, d]) => d.species[species]).map(([id, d]) => ({ id, name: d.name }));
    };

    // ============= EVENTOS =============
    document.addEventListener('DOMContentLoaded', function() {
        // Calculadora
        document.getElementById('calculatorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const species = document.getElementById('species').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const drugId = document.getElementById('drug').value;
            
            if (!species || !weight || !drugId) {
                alert('Completa todos los campos');
                return;
            }
            
            const result = window.calculateDose(drugId, species, weight);
            if (result.success) {
                document.getElementById('resultDrug').textContent = result.drug;
                document.getElementById('resultDose').textContent = result.totalDose + ' ' + result.unit;
                document.getElementById('resultUnit').textContent = result.unit;
                document.getElementById('resultFrequency').textContent = result.frequency;
                document.getElementById('resultRoute').textContent = result.route;
                document.getElementById('warningsBox').innerHTML = result.warnings;
                document.getElementById('resultContainer').style.display = 'block';
                
                const history = window.calculator.getCalculationHistory();
                history.unshift({ drug: result.drug, weight, species });
                if (history.length > 50) history.pop();
                localStorage.setItem('calcHistory', JSON.stringify(history));
            }
        });

        // Actualizar medicamentos
        document.getElementById('species').addEventListener('change', function() {
            const drugs = window.getDrugsBySpecies(this.value);
            document.getElementById('drug').innerHTML = '<option>Selecciona</option>' + drugs.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
        });

        // Vacunas
        document.getElementById('vaccineForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const species = document.getElementById('vaccineSpecies').value;
            const vaccine = document.getElementById('vaccineName').value;
            const date = document.getElementById('vaccineDate').value;
            
            if (!species || !vaccine || !date) {
                alert('Completa todos los campos');
                return;
            }
            
            const records = window.vaccines.getVaccineRecords();
            records.unshift({ species, vaccine, date, nextDate: new Date(new Date(date).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], upcoming: false });
            localStorage.setItem('vaccineRecords', JSON.stringify(records));
            alert('Vacuna registrada');
            this.reset();
        });

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(this.getAttribute('data-tab')).classList.add('active');
            });
        });

        // Navegación
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                window.app.switchSection(this.getAttribute('data-section'));
            });
        });

        // Tema
        document.getElementById('themeToggle').addEventListener('click', function() {
            window.app.toggleTheme();
        });

        // Exportar
        document.getElementById('exportButton').addEventListener('click', () => window.stats.exportData());
        document.getElementById('clearButton').addEventListener('click', () => window.stats.clearAllData());

        // Estadísticas
        window.stats.updateStats();

        // Aplicar tema guardado
        if (localStorage.getItem('theme-preference') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    });
})();
