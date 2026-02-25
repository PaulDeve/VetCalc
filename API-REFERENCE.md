/**
 * DOCUMENTACIÓN API - VetCalc
 * Referencia completa de funciones disponibles
 * Para desarrolladores que deseen extender la aplicación
 */

// ==================== MÓDULO: DRUGS-CORE ====================

/**
 * Obtiene la información completa de un medicamento
 * @param {string} drugId - ID único del medicamento
 * @returns {Object|null} Objeto medicamento o null
 * 
 * @example
 * const drug = getDrug('pen-duo-strep');
 * console.log(drug.name); // "Pen Duo Strep 250/200"
 */
function getDrug(drugId) {}

/**
 * Obtiene todos los medicamentos disponibles
 * @returns {Object} Base de datos completa
 * 
 * @example
 * const allDrugs = getAllDrugs();
 * Object.keys(allDrugs).length; // 9 medicamentos
 */
function getAllDrugs() {}

/**
 * Filtra medicamentos permitidos para una especie
 * @param {string} species - Especie (perro|gato|oveja|conejo|aves)
 * @returns {Array} Array de medicamentos permitidos
 * 
 * @example
 * const dogDrugs = getDrugsBySpecies('perro'); // Array de 9 medicamentos
 * const catDrugs = getDrugsBySpecies('gato'); // Array de 8 medicamentos (sin Newcastle)
 */
function getDrugsBySpecies(species) {}

/**
 * Calcula la dosis exacta de un medicamento
 * @param {string} drugId - ID del medicamento
 * @param {string} species - Especie
 * @param {number} weight - Peso en kg (número)
 * @returns {Object} Objeto con resultado del cálculo
 * 
 * @example
 * const result = calculateDose('pen-duo-strep', 'perro', 25);
 * if (result.success) {
 *   console.log(result.totalDose); // "1.0000"
 *   console.log(result.unit); // "mL"
 *   console.log(result.frequency); // "C/12h"
 * }
 * 
 * @returns {success: boolean, drug: string, species: string, weight: number,
 *          dosePerKg: number, totalDose: string, unit: string, route: string,
 *          frequency: string, warnings: string, dosageRange: string}
 */
function calculateDose(drugId, species, weight) {}

/**
 * Obtiene el ID de un medicamento por su nombre
 * @param {string} name - Nombre del medicamento
 * @returns {string|null} ID o null
 * 
 * @example
 * const id = getDrugIdByName('Pen Duo Strep 250/200');
 * console.log(id); // "pen-duo-strep"
 */
function getDrugIdByName(name) {}

/**
 * Valida si un medicamento es válido para una especie y peso
 * @param {string} drugId - ID del medicamento
 * @param {string} species - Especie
 * @param {number} weight - Peso en kg
 * @returns {Object} {valid: boolean, message: string}
 * 
 * @example
 * const validation = validateDrugUsage('pen-duo-strep', 'perro', 25);
 * if (validation.valid) {
 *   console.log('Medicamento válido');
 * } else {
 *   console.log(validation.message); // Razón del error
 * }
 */
function validateDrugUsage(drugId, species, weight) {}

// ==================== MÓDULO: CALCULATOR ====================

/**
 * Clase CalculatorModule
 * Maneja toda la lógica de cálculo de posología
 */
class CalculatorModule {
    /**
     * Obtiene el historial completo de cálculos realizados
     * @returns {Array} Array de cálculos guardados
     * 
     * @example
     * const history = window.calculator.getCalculationHistory();
     * console.log(history.length); // Número total de cálculos
     */
    getCalculationHistory() {}

    /**
     * Obtiene estadísticas de uso de medicamentos
     * @returns {Object} {totalCalculations, drugUsage, speciesUsage}
     * 
     * @example
     * const stats = window.calculator.getStatistics();
     * console.log(stats.drugUsage['Pen Duo Strep 250/200']); // Veces usado
     */
    getStatistics() {}

    /**
     * Limpia el historial completo de cálculos
     * Dispara evento 'calculationSaved'
     * 
     * @example
     * window.calculator.clearHistory();
     */
    clearHistory() {}
}

// Acceso global
// window.calculator es una instancia de CalculatorModule

// ==================== MÓDULO: VACCINES ====================

/**
 * Clase VaccinesModule
 * Maneja registro y seguimiento de vacunas
 */
class VaccinesModule {
    /**
     * Obtiene todos los registros de vacunas
     * @returns {Array} Array de registros guardados
     * 
     * @example
     * const records = window.vaccines.getVaccineRecords();
     * records.forEach(r => console.log(r.vaccineName));
     */
    getVaccineRecords() {}

    /**
     * Obtiene estadísticas de vacunas
     * @returns {Object} {totalVaccines, vigent, upcoming, expired}
     * 
     * @example
     * const stats = window.vaccines.getStatistics();
     * console.log(`Próximas: ${stats.upcoming}`);
     */
    getStatistics() {}

    /**
     * Elimina un registro de vacuna
     * @param {number} id - ID del registro (timestamp)
     * 
     * @example
     * window.vaccines.deleteVaccine(1708876543210);
     */
    deleteVaccine(id) {}

    /**
     * Edita un registro de vacuna (permite cambiar los datos)
     * @param {number} id - ID del registro
     * 
     * @example
     * window.vaccines.editVaccine(1708876543210);
     */
    editVaccine(id) {}

    /**
     * Obtiene el estado de una vacuna
     * @param {string} nextDate - Fecha en formato YYYY-MM-DD
     * @returns {string} 'vigent' | 'upcoming' | 'expired'
     * 
     * @example
     * const status = window.vaccines.getVaccineStatus('2025-12-31');
     */
    getVaccineStatus(nextDate) {}

    /**
     * Calcula la próxima fecha de vacunación
     * @param {string} date - Fecha en formato YYYY-MM-DD
     * @param {number} interval - Intervalo en días
     * @returns {string} Próxima fecha (YYYY-MM-DD)
     * 
     * @example
     * const nextDate = window.vaccines.calculateNextDate('2025-02-24', 365);
     * console.log(nextDate); // "2026-02-24"
     */
    calculateNextDate(date, interval) {}
}

// Acceso global
// window.vaccines es una instancia de VaccinesModule

// ==================== MÓDULO: STATS ====================

/**
 * Clase StatsModule
 * Maneja estadísticas y visualizaciones
 */
class StatsModule {
    /**
     * Obtiene un resumen rápido de estadísticas
     * @returns {Object} {totalTreatments, totalVaccines, upcomingVaccines}
     * 
     * @example
     * const summary = window.stats.getSummary();
     * console.log(`Total tratamientos: ${summary.totalTreatments}`);
     */
    getSummary() {}

    /**
     * Actualiza todas las estadísticas en pantalla
     * Se ejecuta automáticamente, pero puede forzarse manualmente
     * 
     * @example
     * window.stats.updateStats();
     */
    updateStats() {}

    /**
     * Exporta todos los datos a un archivo JSON
     * Descarga automáticamente el archivo
     * 
     * @example
     * window.stats.exportData();
     * // Descarga: VetCalc_Export_2025-02-24.json
     */
    exportData() {}

    /**
     * Limpia todos los datos (con confirmación doble)
     * Requiere confirmación del usuario
     * 
     * @example
     * window.stats.clearAllData(); // Pide confirmación
     */
    clearAllData() {}

    /**
     * Dibuja/redibuja el gráfico de Canvas
     * Útil cuando cambia el tema o ventana redimensiona
     * 
     * @example
     * window.stats.drawChart();
     */
    drawChart() {}
}

// Acceso global
// window.stats es una instancia de StatsModule

// ==================== MÓDULO: APP ====================

/**
 * Clase VetCalcApp
 * Aplicación principal - Navegación y control global
 */
class VetCalcApp {
    /**
     * Cambia de sección
     * @param {string} sectionId - ID de la sección
     *   - 'calculator-section'
     *   - 'vaccines-section'
     *   - 'stats-section'
     * 
     * @example
     * app.switchSection('vaccines-section');
     */
    switchSection(sectionId) {}

    /**
     * Toggle del tema oscuro/claro
     * 
     * @example
     * app.toggleTheme(); // Cambia a oscuro si está claro, viceversa
     */
    toggleTheme() {}

    /**
     * Aplica el tema actual (claro u oscuro)
     * Recalcula colores y redibuja gráficos si es necesario
     * 
     * @example
     * app.applyTheme();
     */
    applyTheme() {}

    /**
     * Obtiene información de la aplicación
     * @returns {Object} {name, version, description, isDarkMode, currentSection}
     * 
     * @example
     * const info = app.getAppInfo();
     * console.log(info.version); // "1.0.0"
     */
    getAppInfo() {}

    /**
     * Muestra el loader spinner
     * 
     * @example
     * app.showLoader();
     */
    showLoader() {}

    /**
     * Oculta el loader spinner
     * 
     * @example
     * app.hideLoader();
     */
    hideLoader() {}
}

// Acceso global
// app es una instancia de VetCalcApp

// ==================== EVENTOS GLOBALES ====================

/**
 * Se dispara cuando se guarda un cálculo
 * Escucha automáticamente las dependencias para actualizar
 * 
 * @example
 * window.addEventListener('calculationSaved', () => {
 *   console.log('Cálculo guardado, actualizar UI');
 * });
 */
window.addEventListener('calculationSaved', () => {});

/**
 * Se dispara cuando se une o modifica una vacuna
 * Escucha automáticamente las dependencias para actualizar
 * 
 * @example
 * window.addEventListener('vaccineSaved', () => {
 *   console.log('Vacuna guardada, actualizar UI');
 * });
 */
window.addEventListener('vaccineSaved', () => {});

// ==================== FUNCIONES GLOBALES HELPER ====================

/**
 * Cambia de sección desde un evento global
 * @param {string} sectionId - ID de la sección
 * 
 * @example
 * <!-- HTML -->
 * <button onclick="switchSection('stats-section')">Ver Estadísticas</button>
 */
function switchSection(sectionId) {}

/**
 * Toggle del tema desde un evento global
 * 
 * @example
 * <!-- HTML -->
 * <button onclick="toggleTheme()">Toggle Tema</button>
 */
function toggleTheme() {}

// ==================== EJEMPLOS AVANZADOS ====================

/**
 * EJEMPLO 1: Crear una alerta personalizada para medicamentos críticos
 * ---
 * 
 * window.addEventListener('calculationSaved', () => {
 *   const history = window.calculator.getCalculationHistory();
 *   const lastCalc = history[0];
 *   
 *   if (['Vigantol Biovalgina 250 mL', 'Entomic 10% 100 mL'].includes(lastCalc.drug)) {
 *     console.log(`⚠️ MEDICAMENTO CRÍTICO: ${lastCalc.drug}`);
 *   }
 * });
 */

/**
 * EJEMPLO 2: Exportar datos automáticos cada X cálculos
 * ---
 * 
 * let calculationCount = 0;
 * 
 * window.addEventListener('calculationSaved', () => {
 *   calculationCount++;
 *   if (calculationCount % 10 === 0) {
 *     console.log('Auto-guardando datos...');
 *     window.stats.exportData();
 *   }
 * });
 */

/**
 * EJEMPLO 3: Recordatorio de vacunas próximas en página de inicio
 * ---
 * 
 * function checkVaccineReminders() {
 *   const vaccineStats = window.vaccines.getStatistics();
 *   if (vaccineStats.upcoming > 0) {
 *     console.log(`🔔 ${vaccineStats.upcoming} vacunas próximas a vencer`);
 *   }
 * }
 * 
 * // Ejecutar cada 5 minutos
 * setInterval(checkVaccineReminders, 5 * 60 * 1000);
 */

/**
 * EJEMPLO 4: Sincronizar datos con servidor (extensión futura)
 * ---
 * 
 * async function syncDataToCloud() {
 *   const data = {
 *     calculations: window.calculator.getCalculationHistory(),
 *     vaccines: window.vaccines.getVaccineRecords()
 *   };
 *   
 *   try {
 *     const response = await fetch('https://api.example.com/sync', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(data)
 *     });
 *     console.log('Datos sincronizados');
 *   } catch (error) {
 *     console.error('Error de sincronización:', error);
 *   }
 * }
 */

/**
 * EJEMPLO 5: Generar reporte en formato texto
 * ---
 * 
 * function generateTextReport() {
 *   const summary = window.stats.getSummary();
 *   const report = `
 * REPORTE VETCALC
 * ===============
 * Total Tratamientos: ${summary.totalTreatments}
 * Total Vacunas: ${summary.totalVaccines}
 * Vacunas Próximas: ${summary.upcomingVaccines}
 * Fecha: ${new Date().toLocaleString()}
 *   `;
 *   return report;
 * }
 * 
 * console.log(generateTextReport());
 */

// ==================== ESTRUCTURA LOCALSTORAGE ====================

/**
 * calculationHistory - Array de cálculos realizados
 * Estructura:
 * [
 *   {
 *     id: 1708876543210,
 *     timestamp: "2025-02-24T10:30:00.000Z",
 *     drug: "Pen Duo Strep 250/200",
 *     species: "perro",
 *     weight: 25,
 *     dosePerKg: 0.04,
 *     totalDose: "1.0000",
 *     unit: "mL",
 *     route: "IM/IV",
 *     frequency: "C/12h",
 *     warnings: "No usar en alérgicos...",
 *     dosageRange: "1-100 kg"
 *   }
 * ]
 */

/**
 * vaccineRecords - Array de registros de vacunas
 * Estructura:
 * [
 *   {
 *     id: 1708876543210,
 *     species: "perro",
 *     vaccineId: "parvovirus-perro",
 *     vaccineName: "Parvovirus",
 *     date: "2025-02-24",
 *     nextDate: "2026-02-24",
 *     interval: 365
 *   }
 * ]
 */

/**
 * theme-preference - Preferencia de tema
 * Valor: "light" | "dark"
 */

// ==================== COMPATIBILIDAD ====================

/**
 * Navegadores soportados:
 * - Chrome/Chromium 90+
 * - Firefox 88+
 * - Safari 14+
 * - Edge 90+
 * - Android Chrome
 * - Android Firefox
 * 
 * No requiere polyfills ya que usa APIs estándar
 */

// ==================== PERFORMANCE ====================

/**
 * Tamaño total:
 * - index.html: ~8 KB
 * - styles.css: ~45 KB
 * - drugs-core.js: ~12 KB
 * - calculator.js: ~8 KB
 * - vaccines.js: ~15 KB
 * - stats.js: ~12 KB
 * - app.js: ~8 KB
 * - sw.js: ~4 KB
 * ─────────────
 * Total: ~112 KB (sin comprimir)
 * 
 * Con gzip: ~35 KB
 * Con brotli: ~28 KB
 */

// ==================== AYUDA ====================

/**
 * Para soporte técnico o reportar bugs:
 * 1. Abre la consola del navegador (F12)
 * 2. Verifica si hay errores en la consola
 * 3. Comprueba el estado del Service Worker
 * 4. Limpiar caché: Abre DevTools > Application > Clear Storage
 * 5. Recarga la página
 */
