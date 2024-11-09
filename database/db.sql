DROP TABLE IF EXISTS history_detail;
DROP TABLE IF EXISTS treatment;
DROP TABLE IF EXISTS recomendation;

-- Crear la tabla 'detalle historial'
CREATE TABLE history_detail (
    history_id TEXT PRIMARY KEY,  -- Definir history_id como TEXT y clave primaria
    title TEXT,
    notes TEXT
);

-- Crear la tabla 'treatment'
CREATE TABLE treatment (
    id SERIAL PRIMARY KEY,
    history_id TEXT,  -- Cambiar a TEXT para que coincida con history_detail.history_id
    detail TEXT,
    title TEXT,
    recipe TEXT,
    FOREIGN KEY (history_id) REFERENCES history_detail(history_id)
);

-- Crear la tabla 'recomendation'
CREATE TABLE recomendation (
    id SERIAL PRIMARY KEY,
    description TEXT,
    treatment_id INT,
    FOREIGN KEY (treatment_id) REFERENCES treatment(id)
);
