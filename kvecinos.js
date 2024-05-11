function euclideanDistance(point1, point2) {
    return Math.sqrt(
        point1.reduce((acc, val, index) => acc + Math.pow(val - point2[index], 2), 0)
    );
}

class KNearestNeighbors {
    constructor(k = 3) {
        this.k = k;
        this.X_train = [];
        this.y_train = [];
    }

    fit(X, y) {
        this.X_train = X;
        this.y_train = y;
    }

    predict(X) {
        return X.map(x => this._predict(x));
    }

    _predict(x) {
        const distances = this.X_train.map((point, index) => ({
            index,
            distance: euclideanDistance(x, point)
        }));
        distances.sort((a, b) => a.distance - b.distance);
        const k_nearest_indices = distances.slice(0, this.k).map(item => item.index);
        const k_nearest_labels = k_nearest_indices.map(index => this.y_train[index]);
        const counts = k_nearest_labels.reduce((acc, label) => {
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});

        // Manejar empate
        const maxCount = Math.max(...Object.values(counts));
        const mostCommon = Object.entries(counts).filter(([_, count]) => count === maxCount);
        const randomIndex = Math.floor(Math.random() * mostCommon.length);
        return parseInt(mostCommon[randomIndex][0]);
    }
}

module.exports = { KNearestNeighbors, euclideanDistance };
