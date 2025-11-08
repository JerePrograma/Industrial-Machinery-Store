-- Insertar maquinaria nueva
INSERT INTO "Maquinaria" (name, brand, category, price, condition, description, "imageUrl", "isOffer", "createdAt", "updatedAt") VALUES
('Excavadora Hidráulica CAT 320', 'Caterpillar', 'Construcción', 85000.00, 'new', 'Excavadora hidráulica de alta potencia para trabajos pesados de construcción.', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500', false, NOW(), NOW()),
('Tractor Agrícola John Deere 6120M', 'John Deere', 'Agrícola', 65000.00, 'new', 'Tractor agrícola versátil con tecnología avanzada para máxima productividad.', 'https://images.unsplash.com/photo-1544838891-56b02a27a3b9?w=500', false, NOW(), NOW()),
('Grúa Torre Liebherr 280 EC-H', 'Liebherr', 'Construcción', 120000.00, 'new', 'Grúa torre de alta capacidad para proyectos de construcción de gran envergadura.', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500', false, NOW(), NOW());

-- Insertar maquinaria usada
INSERT INTO "Maquinaria" (name, brand, category, price, condition, description, "imageUrl", "isOffer", "createdAt", "updatedAt") VALUES
('Retroexcavadora Case 580N', 'Case', 'Construcción', 35000.00, 'used', 'Retroexcavadora en excelente estado, ideal para trabajos de excavación y carga.', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500', false, NOW(), NOW()),
('Montacargas Hyster H80XM', 'Hyster', 'Industrial', 28000.00, 'used', 'Montacargas de combustión interna con capacidad de 8 toneladas.', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500', false, NOW(), NOW()),
('Compactador Dynapac CA2500', 'Dynapac', 'Construcción', 22000.00, 'used', 'Compactador vibratorio para asfalto en buen estado de funcionamiento.', 'https://images.unsplash.com/photo-1580771637509-c2cd5e17e30a?w=500', false, NOW(), NOW());

-- Insertar ofertas especiales
INSERT INTO "Maquinaria" (name, brand, category, price, condition, description, "imageUrl", "isOffer", "createdAt", "updatedAt") VALUES
('Bulldozer Komatsu D65PX ¡OFERTA!', 'Komatsu', 'Construcción', 45000.00, 'used', 'Bulldozer en excelente estado. ¡Precio especial por tiempo limitado!', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500', true, NOW(), NOW()),
('Cargador Frontal CAT 950M ¡LIQUIDACIÓN!', 'Caterpillar', 'Construcción', 55000.00, 'new', 'Cargador frontal nuevo con descuento especial. ¡Últimas unidades!', 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=500', true, NOW(), NOW()),
('Minicargador Bobcat S650 ¡PROMOCIÓN!', 'Bobcat', 'Industrial', 32000.00, 'used', 'Minicargador compacto ideal para espacios reducidos. ¡Oferta limitada!', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500', true, NOW(), NOW());