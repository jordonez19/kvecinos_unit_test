

const { KNearestNeighbors, euclideanDistance } = require('./kvecinos.js');

// Pruebas unitarias usando Jest
describe('KNearestNeighbors', () => {
    test('predict', () => {
        const X_train = [[1, 2], [3, 4], [5, 6], [7, 8]];
        const y_train = [0, 0, 1, 1];
        const knn = new KNearestNeighbors(5); // Cambiado k a 5
        knn.fit(X_train, y_train);
        const X_test = [[0, 1], [9, 9]]; // Cambiados los puntos de prueba
        const predictions = knn.predict(X_test);
        expect(predictions).toEqual([0, 1]);
    });

    test('euclideanDistance', () => {
        const point1 = [0, 0];
        const point2 = [3, 4];
        const distance = euclideanDistance(point1, point2);
        expect(distance).toBe(5);
    });
});
