class Tiger {
    constructor(props) {
        this.strength = Math.floor(Math.random() * 100);
    }

    growl() {
        console.log('grrrrr!');
    }
}

export default Tiger;
