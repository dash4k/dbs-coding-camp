class Wolf {
    constructor(props) {
        this.strength = Math.floor(Math.random() * 100);
    }

    howl() {
        console.log('owoooo!');
    }
}

export default Wolf;
