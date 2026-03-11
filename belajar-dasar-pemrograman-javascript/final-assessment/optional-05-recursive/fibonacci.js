function fibonacci(n) {
    if (n === 0) return [0];
    else if (n === 1) return [0, 1];
    else {
        const prevSequence = fibonacci(n-1);
        prevSequence.push(prevSequence[prevSequence.length - 1] + prevSequence[prevSequence.length - 2]);
        return prevSequence;
    }
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
