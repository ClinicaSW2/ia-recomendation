DROP TABLE IF EXISTS recomendation;
DROP TABLE IF EXISTS treatment;

-- Crear la tabla 'treatment'
CREATE TABLE treatment (
    id SERIAL PRIMARY KEY,
    tratamiento_id VARCHAR(50) UNIQUE NOT NULL ,
    detail TEXT,
    title VARCHAR(255),
    recipe TEXT
);
-- Crear la tabla 'recomendation'
CREATE TABLE recomendation (
    id SERIAL PRIMARY KEY,
    description TEXT,
    treatment_id INT,
    FOREIGN KEY (treatment_id) REFERENCES treatment(id)
);

-- Insertar tratamientos en la tabla 'treatment'
INSERT INTO treatment (tratamiento_id,detail, title, recipe) VALUES
('2','Tratamiento para el síndrome del ojo seco con lágrimas artificiales.', 'Síndrome del Ojo Seco', 'Aplicar lágrimas artificiales cada 2 horas.'),
('3','Procedimiento para eliminar cataratas y restaurar la visión.', 'Cirugía de Cataratas', 'Eliminación quirúrgica del cristalino nublado.'),
('4','Tratamiento para el glaucoma para reducir la presión intraocular.', 'Tratamiento de Glaucoma', 'Aplicar gotas para los ojos recetadas dos veces al día.'),
('5','Tratamiento para infección ocular con gotas antibióticas.', 'Infección Ocular', 'Aplicar gotas antibióticas para los ojos 4 veces al día.'),
('6','Tratamiento para la conjuntivitis alérgica con antihistamínicos.', 'Conjuntivitis Alérgica', 'Usar gotas para los ojos con antihistamínicos según sea necesario.'),
('7','Examen ocular de rutina para evaluación de la visión.', 'Examen Ocular de Rutina', 'Realizar examen ocular y prescribir gafas si es necesario.'),
('8','Procedimiento para corregir la visión con cirugía láser.', 'Cirugía LASIK', 'Realizar cirugía LASIK.'),
('9','Tratamiento para la degeneración macular con inyecciones.', 'Degeneración Macular', 'Administrar inyecciones anti-VEGF.'),
('10','Tratamiento para la retinopatía diabética con terapia láser.', 'Retinopatía Diabética', 'Realizar fotocoagulación láser.'),
('11','Tratamiento para abrasión corneal con parche ocular protector.', 'Abrasión Corneal', 'Aplicar parche ocular protector y gotas antibióticas.');

-- Insertar recomendaciones en la tabla 'recommendation'
INSERT INTO recomendation (description, treatment_id) VALUES
('Usar gotas lubricantes frecuentemente para mantener los ojos húmedos.', 1),
('Evitar conducir inmediatamente después de la cirugía hasta que la visión se estabilice.', 2),
('Monitorear regularmente la presión ocular y seguir con su oftalmólogo.', 3),
('Completar el curso completo de antibióticos incluso si los síntomas mejoran.', 4),
('Evitar frotarse los ojos y usar compresas frías para alivio.', 5);




select * from treatment;
select * from recomendation;