// Base de datos de medicamentos
const DRUGS_DATABASE = {
    'pen-duo-strep': {
        name: 'Pen Duo Strep 250/200',
        description: 'Penicilina + Dihidroestreptomicina inyectable',
        presentation: '250/200 mg',
        route: 'IM/IV',
        frequency: 'C/12h',
        unit: 'mL',
        concentration: 50, // mg/mL
        warnings: 'No usar en alérgicos a penicilina. Conservar en lugar fresco.',
        species: {
            perro: {
                dosis: 0.04, // mL por kg
                minWeight: 1,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.03,
                minWeight: 1,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.05,
                minWeight: 20,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.02,
                minWeight: 0.5,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0,
                allowed: false,
                reason: 'No indicado para aves'
            }
        }
    },
    'dexalan': {
        name: 'Dexalan 500 mL',
        description: 'Dexametasona de acción prolongada',
        presentation: '500 mL',
        route: 'IM',
        frequency: 'C/48-72h',
        unit: 'mL',
        concentration: 2, // mg/mL
        warnings: 'Usado en inflamación severa. No prolongar el tratamiento. Contraindicado en infecciones bacterianas sin cobertura antibiótica.',
        species: {
            perro: {
                dosis: 0.02,
                minWeight: 5,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.015,
                minWeight: 2,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.03,
                minWeight: 20,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.01,
                minWeight: 1,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0,
                allowed: false,
                reason: 'Dosis difícil de controlar en aves'
            }
        }
    },
    'catosal': {
        name: 'Catosal 100 mL',
        description: 'Energizante y reconstituyente (Butafosfano + Cianocobalamina)',
        presentation: '100 mL',
        route: 'IM/IV',
        frequency: 'C/48h',
        unit: 'mL',
        concentration: 100, // mg/mL
        warnings: 'Indicado en convalecencia y debilidad. Mejorar respuesta inmunitaria.',
        species: {
            perro: {
                dosis: 0.01,
                minWeight: 5,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.005,
                minWeight: 2,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.02,
                minWeight: 20,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.005,
                minWeight: 1,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0.001,
                minWeight: 0.1,
                maxWeight: 5,
                allowed: true
            }
        }
    },
    'meloxisan': {
        name: 'Meloxisan Pets 50mL',
        description: 'AINE - Antiinflamatorio no esteroide (Meloxicam)',
        presentation: '50 mL',
        route: 'IM/IV',
        frequency: 'C/24h',
        unit: 'mL',
        concentration: 20, // mg/mL
        warnings: 'Usar con cuidado en pacientes con problemas renales o gástricos. Máximo 10 días de tratamiento.',
        species: {
            perro: {
                dosis: 0.1,
                minWeight: 5,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.08,
                minWeight: 2,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.1,
                minWeight: 20,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.06,
                minWeight: 1,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0,
                allowed: false,
                reason: 'Requiere consulta veterinaria especializada'
            }
        }
    },
    'entomic': {
        name: 'Entomic 10% 100 mL',
        description: 'Antiparasitario de amplio espectro (Ivermectina)',
        presentation: '100 mL',
        route: 'SC/IM',
        frequency: 'C/7-14 días',
        unit: 'mL',
        concentration: 10, // mg/mL
        warnings: 'Efectivo contra helmintos y ectoparásitos. No sobredosar. Tóxico en dosis altas.',
        species: {
            perro: {
                dosis: 0.004,
                minWeight: 3,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.003,
                minWeight: 2,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.01,
                minWeight: 20,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.002,
                minWeight: 1,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0.002,
                minWeight: 0.1,
                maxWeight: 5,
                allowed: true
            }
        }
    },
    'biomizona': {
        name: 'Biomizona 100 mL',
        description: 'Complejo vitaminizado con oligoelementos',
        presentation: '100 mL',
        route: 'IM/IV',
        frequency: 'C/48-72h',
        unit: 'mL',
        concentration: 50, // mg/mL
        warnings: 'Para mejorar estado general. Seguro en todas las especies.',
        species: {
            perro: {
                dosis: 0.02,
                minWeight: 2,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.015,
                minWeight: 1,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.03,
                minWeight: 10,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.01,
                minWeight: 0.5,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0.005,
                minWeight: 0.1,
                maxWeight: 5,
                allowed: true
            }
        }
    },
    'hepatin': {
        name: 'Hepatin',
        description: 'Protector y regenerador hepático',
        presentation: 'Ampolla inyectable',
        route: 'IM/IV',
        frequency: 'C/24-48h',
        unit: 'Ampolla',
        concentration: 1,
        warnings: 'Usar en hepatopatías. Coadyuvante en intoxicaciones.',
        species: {
            perro: {
                dosis: 1,
                minWeight: 5,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.5,
                minWeight: 2,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 1,
                minWeight: 20,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.25,
                minWeight: 1,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0,
                allowed: false,
                reason: 'Requiere consulta específica'
            }
        }
    },
    'bio-c': {
        name: 'Bio-C',
        description: 'Complejo de Vitamina C y oligoelementos',
        presentation: 'Inyectable',
        route: 'IM/IV',
        frequency: 'C/48-72h',
        unit: 'mL',
        concentration: 250, // mg/mL
        warnings: 'Seguro en todas las especies. Indicado en estrés y post-operatorio.',
        species: {
            perro: {
                dosis: 0.01,
                minWeight: 2,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.01,
                minWeight: 1,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.02,
                minWeight: 10,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.01,
                minWeight: 0.5,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0.005,
                minWeight: 0.1,
                maxWeight: 5,
                allowed: true
            }
        }
    },
    'vigantol': {
        name: 'Vigantol Biovalgina 250 mL',
        description: 'Vitamina D3 - Regulador del calcio y fósforo',
        presentation: '250 mL',
        route: 'IM',
        frequency: 'C/7-10 días',
        unit: 'mL',
        concentration: 500000, // UI/mL
        warnings: 'Contra raquitismo y trastornos de mineralización. No sobredosar (toxicidad).',
        species: {
            perro: {
                dosis: 0.001,
                minWeight: 5,
                maxWeight: 100,
                allowed: true
            },
            gato: {
                dosis: 0.0005,
                minWeight: 2,
                maxWeight: 20,
                allowed: true
            },
            oveja: {
                dosis: 0.002,
                minWeight: 20,
                maxWeight: 150,
                allowed: true
            },
            conejo: {
                dosis: 0.0005,
                minWeight: 1,
                maxWeight: 10,
                allowed: true
            },
            aves: {
                dosis: 0.0002,
                minWeight: 0.1,
                maxWeight: 5,
                allowed: true
            }
        }
    }
};

/**
 * Obtiene la información de un medicamento
 * @param {string} drugId - ID del medicamento
 * @returns {Object|null} Medicamento o null
 */
function getDrug(drugId) {
    return DRUGS_DATABASE[drugId] || null;
}

/**
 * Obtiene todos los medicamentos
 * @returns {Object} Base de datos de medicamentos
 */
function getAllDrugs() {
    return DRUGS_DATABASE;
}

/**
 * Obtiene medicamentos permitidos para una especie
 * @param {string} species - Especie del animal
 * @returns {Array} Array de medicamentos permitidos
 */
function getDrugsBySpecies(species) {
    const allowed = [];
    for (const [key, drug] of Object.entries(DRUGS_DATABASE)) {
        if (drug.species[species] && drug.species[species].allowed) {
            allowed.push({ id: key, ...drug });
        }
    }
    return allowed;
}

/**
 * Calcula la dosis para un paciente
 * @param {string} drugId - ID del medicamento
 * @param {string} species - Especie del animal
 * @param {number} weight - Peso en kg
 * @returns {Object} Resultado del cálculo
 */
function calculateDose(drugId, species, weight) {
    const drug = getDrug(drugId);
    
    if (!drug) {
        return { success: false, error: 'Medicamento no encontrado' };
    }

    const speciesDose = drug.species[species];
    
    if (!speciesDose) {
        return { success: false, error: 'Especie no registrada para este medicamento' };
    }

    if (!speciesDose.allowed) {
        return { 
            success: false, 
            error: `No permitido para ${species}s. Razón: ${speciesDose.reason}` 
        };
    }

    // Validar rango de peso
    if (weight < speciesDose.minWeight || weight > speciesDose.maxWeight) {
        return { 
            success: false, 
            error: `Peso fuera de rango válido (${speciesDose.minWeight}-${speciesDose.maxWeight} kg)` 
        };
    }

    const totalDose = weight * speciesDose.dosis;
    
    return {
        success: true,
        drug: drug.name,
        species: species,
        weight: weight,
        dosePerKg: speciesDose.dosis,
        totalDose: totalDose.toFixed(4),
        unit: drug.unit,
        route: drug.route,
        frequency: drug.frequency,
        warnings: drug.warnings,
        dosageRange: `${speciesDose.minWeight}-${speciesDose.maxWeight} kg`
    };
}

/**
 * Obtiene un medicamento por su nombre
 * @param {string} name - Nombre del medicamento
 * @returns {string|null} ID del medicamento o null
 */
function getDrugIdByName(name) {
    for (const [key, drug] of Object.entries(DRUGS_DATABASE)) {
        if (drug.name === name) return key;
    }
    return null;
}

/**
 * Valida si un medicamento es válido para una especie y peso
 * @param {string} drugId - ID del medicamento
 * @param {string} species - Especie
 * @param {number} weight - Peso en kg
 * @returns {Object} Validación resultado
 */
function validateDrugUsage(drugId, species, weight) {
    if (!Number.isFinite(weight) || weight <= 0) {
        return { valid: false, message: 'Peso inválido' };
    }

    const drug = getDrug(drugId);
    if (!drug) {
        return { valid: false, message: 'Medicamento no encontrado' };
    }

    const speciesDose = drug.species[species];
    if (!speciesDose) {
        return { valid: false, message: 'Especie no configurada' };
    }

    if (!speciesDose.allowed) {
        return { valid: false, message: speciesDose.reason || 'No permitido para esta especie' };
    }

    if (weight < speciesDose.minWeight) {
        return { valid: false, message: `Animal muy ligero. Mínimo: ${speciesDose.minWeight} kg` };
    }

    if (weight > speciesDose.maxWeight) {
        return { valid: false, message: `Animal muy pesado. Máximo: ${speciesDose.maxWeight} kg` };
    }

    return { valid: true, message: 'OK' };
}
