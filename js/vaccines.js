/**
 * MÓDULO: GESTIÓN DE VACUNAS
 * Descripción: Registro y seguimiento de vacunas aplicadas
 * Archivo: js/vaccines.js
 */

// Base de datos de vacunas por especie
const VACCINES_DATABASE = {
    perro: [
        { id: 'parvovirus-perro', name: 'Parvovirus', interval: 365, description: 'Protección contra parvovirus' },
        { id: 'moquillo-perro', name: 'Moquillo', interval: 365, description: 'Protección contra moquillo' },
        { id: 'rabia-perro', name: 'Rabia', interval: 730, description: 'Inmunización contra rabia (bienal)' }
    ],
    gato: [
        { id: 'triple-felina', name: 'Triple Felina', interval: 365, description: 'Calicivirus, rinotraquetis, panleucopenia' },
        { id: 'rabia-gato', name: 'Rabia', interval: 730, description: 'Inmunización contra rabia (bienal)' }
    ],
    oveja: [
        { id: 'clostridiales-oveja', name: 'Clostridiales', interval: 365, description: 'Protección contra enfermedades clostridiales' }
    ],
    conejo: [
        { id: 'mixomatosis', name: 'Mixomatosis', interval: 365, description: 'Protección contra mixomatosis' },
        { id: 'vhd', name: 'VHD', interval: 365, description: 'Enfermedad Vírica Hemorrágica' }
    ],
    aves: [
        { id: 'newcastle', name: 'Newcastle', interval: 365, description: 'Protección contra Enfermedad de Newcastle' }
    ]
};

class VaccinesModule {
    constructor() {
        this.vaccineForm = document.getElementById('vaccineForm');
        this.vaccinesList = document.getElementById('vaccinesList');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        this.speciesSelect = document.getElementById('vaccineSpecies');
        this.vaccineNameSelect = document.getElementById('vaccineName');
        this.vaccineDateInput = document.getElementById('vaccineDate');

        this.init();
    }

    /**
     * Inicializa el módulo
     */
    init() {
        this.attachEventListeners();
        this.setDefaultDate();
        this.displayVaccinesList();
    }

    /**
     * Adjunta eventos
     */
    attachEventListeners() {
        this.vaccineForm.addEventListener('submit', (e) => this.handleRegister(e));
        this.speciesSelect.addEventListener('change', () => this.updateVaccinesList());
        
        // Tabs
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });

        // Escuchar cambios en cálculos
        window.addEventListener('calculationSaved', () => this.displayVaccinesList());
        window.addEventListener('vaccineSaved', () => this.displayVaccinesList());
    }

    /**
     * Establece la fecha actual como valor por defecto
     */
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        this.vaccineDateInput.value = today;
    }

    /**
     * Actualiza la lista de vacunas según la especie
     */
    updateVaccinesList() {
        const species = this.speciesSelect.value;
        const options = ['<option value="">Selecciona vacuna</option>'];

        if (species && VACCINES_DATABASE[species]) {
            for (const vaccine of VACCINES_DATABASE[species]) {
                options.push(`<option value="${vaccine.id}">${vaccine.name}</option>`);
            }
        }

        this.vaccineNameSelect.innerHTML = options.join('');
    }

    /**
     * Maneja el registro de una vacuna
     * @param {Event} event
     */
    handleRegister(event) {
        event.preventDefault();

        const species = this.speciesSelect.value;
        const vaccineId = this.vaccineNameSelect.value;
        const date = this.vaccineDateInput.value;

        // Validaciones
        if (!species || !vaccineId || !date) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Obtener información de la vacuna
        const vaccine = VACCINES_DATABASE[species].find(v => v.id === vaccineId);
        if (!vaccine) {
            alert('Vacuna no encontrada');
            return;
        }

        // Crear registro
        const record = {
            id: Date.now(),
            species: species,
            vaccineId: vaccine.id,
            vaccineName: vaccine.name,
            date: date,
            nextDate: this.calculateNextDate(date, vaccine.interval),
            interval: vaccine.interval
        };

        // Guardar en localStorage
        this.saveVaccineRecord(record);

        // Limpiar formulario
        this.vaccineForm.reset();
        this.setDefaultDate();
        this.speciesSelect.value = '';
        this.vaccineNameSelect.innerHTML = '<option value="">Selecciona vacuna</option>';

        // Mostrar confirmación
        alert('✅ Vacuna registrada correctamente');

        // Disparar evento
        window.dispatchEvent(new Event('vaccineSaved'));
    }

    /**
     * Calcula la próxima fecha de vacunación
     * @param {string} date - Fecha en formato YYYY-MM-DD
     * @param {number} interval - Intervalo en días
     * @returns {string} Próxima fecha
     */
    calculateNextDate(date, interval) {
        const d = new Date(date);
        d.setDate(d.getDate() + interval);
        return d.toISOString().split('T')[0];
    }

    /**
     * Guarda un registro de vacuna
     * @param {Object} record - Registro de vacuna
     */
    saveVaccineRecord(record) {
        let records = JSON.parse(localStorage.getItem('vaccineRecords') || '[]');
        records.unshift(record);
        
        // Máximo 200 registros
        if (records.length > 200) records.pop();
        
        localStorage.setItem('vaccineRecords', JSON.stringify(records));
    }

    /**
     * Obtiene todos los registros de vacunas
     * @returns {Array} Registros
     */
    getVaccineRecords() {
        return JSON.parse(localStorage.getItem('vaccineRecords') || '[]');
    }

    /**
     * Obtiene el estado de una vacuna
     * @param {string} nextDate - Próxima fecha
     * @returns {string} Estado (vigent, upcoming, expired)
     */
    getVaccineStatus(nextDate) {
        const today = new Date();
        const next = new Date(nextDate);
        const daysUntil = Math.floor((next - today) / (1000 * 60 * 60 * 24));

        if (daysUntil < 0) return 'expired';
        if (daysUntil <= 14) return 'upcoming';
        return 'vigent';
    }

    /**
     * Obtiene la etiqueta de estado
     * @param {string} status - Estado
     * @returns {string} Etiqueta con emoji
     */
    getStatusBadge(status) {
        const badges = {
            vigent: { class: 'badge-vigent', text: '✅ Vigente' },
            upcoming: { class: 'badge-upcoming', text: '⏰ Próxima' },
            expired: { class: 'badge-expired', text: '❌ Vencida' }
        };
        const badge = badges[status] || badges.vigent;
        return `<span class="card-badge ${badge.class}">${badge.text}</span>`;
    }

    /**
     * Muestra la lista de vacunas
     */
    displayVaccinesList() {
        const records = this.getVaccineRecords();

        if (records.length === 0) {
            this.vaccinesList.innerHTML = '<p class="empty-state">No hay vacunas registradas</p>';
            return;
        }

        const html = records.map(record => {
            const status = this.getVaccineStatus(record.nextDate);
            const badge = this.getStatusBadge(status);
            
            const appliedDate = new Date(record.date).toLocaleDateString('es-ES');
            const nextDate = new Date(record.nextDate).toLocaleDateString('es-ES');

            return `
                <div class="vaccine-card">
                    <div class="vaccine-card-header">
                        <div>
                            <div class="vaccine-name">${record.vaccineName}</div>
                            <div class="vaccine-info">
                                <strong>Especie:</strong> ${record.species.charAt(0).toUpperCase() + record.species.slice(1)}<br>
                                <strong>Aplicada:</strong> ${appliedDate}<br>
                                <strong>Próxima:</strong> ${nextDate}
                            </div>
                            ${badge}
                        </div>
                    </div>
                    <div class="vaccine-actions">
                        <button class="btn btn-small btn-secondary" onclick="vaccines.editVaccine(${record.id})">
                            Editar
                        </button>
                        <button class="btn btn-small btn-delete" onclick="vaccines.deleteVaccine(${record.id})">
                            Eliminar
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.vaccinesList.innerHTML = html;
    }

    /**
     * Elimina un registro de vacuna
     * @param {number} id - ID del registro
     */
    deleteVaccine(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return;

        let records = this.getVaccineRecords();
        records = records.filter(r => r.id !== id);
        
        localStorage.setItem('vaccineRecords', JSON.stringify(records));
        
        window.dispatchEvent(new Event('vaccineSaved'));
        alert('✅ Registro eliminado');
    }

    /**
     * Edita un registro de vacuna
     * @param {number} id - ID del registro
     */
    editVaccine(id) {
        const records = this.getVaccineRecords();
        const record = records.find(r => r.id === id);
        
        if (!record) return;

        // Llenar formulario con datos existentes
        this.speciesSelect.value = record.species;
        this.updateVaccinesList();
        this.vaccineNameSelect.value = record.vaccineId;
        this.vaccineDateInput.value = record.date;

        // Scroll al formulario
        document.querySelector('#register-vaccine').scrollIntoView({ behavior: 'smooth' });

        // Eliminar registro antiguo
        this.deleteVaccine(id);
    }

    /**
     * Calcula estadísticas de vacunas
     * @returns {Object} Estadísticas
     */
    getStatistics() {
        const records = this.getVaccineRecords();
        const stats = {
            totalVaccines: records.length,
            vigent: 0,
            upcoming: 0,
            expired: 0
        };

        for (const record of records) {
            const status = this.getVaccineStatus(record.nextDate);
            stats[status]++;
        }

        return stats;
    }

    /**
     * Cambia de tab
     * @param {Event} event
     */
    switchTab(event) {
        const tabName = event.target.getAttribute('data-tab');

        // Desactivar todos los tabs
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Activar tab seleccionado
        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');

        // Actualizar lista si es necesario
        if (tabName === 'view-vaccines') {
            this.displayVaccinesList();
        }
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.vaccines = new VaccinesModule();
    });
} else {
    window.vaccines = new VaccinesModule();
}
