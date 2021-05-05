import crypto from 'crypto'
export default class Hash {
    static logger(func) {
        console.log(func);
    };
    static generateSalt(rounds){
        if (rounds >= 15) {
            throw new Error(`${rounds} is greater than 15,Must be less that 15`);
        }
        if (typeof rounds !== 'number') {
            throw new Error('rounds param must be a number');
        }
        if (rounds == null) {
            rounds = 12;
        }
        return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
    };
    static hasher(password, salt ) {
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt: salt,
            hashedpassword: value
        };
    };
    static hash(password, salt) {
        if (password == null || salt == null) {
            throw new Error('Must Provide Password and salt values');
        }
        if (typeof password !== 'string' || typeof salt !== 'string') {
            throw new Error('password must be a string and salt must either be a salt string or a number of rounds');
        }
        return this.hasher(password, salt);
    };
    static compare(password, hash) {
        if (password == null || hash == null) {
            throw new Error('password and hash is required to compare');
        }
        if (typeof password !== 'string' || typeof hash !== 'object') {
            throw new Error('password must be a String and hash must be an Object');
        }
        let passwordData = this.hasher(password, hash.salt);
        if (passwordData.hashedpassword === hash.hashedpassword) {
            return true;
        }
        return false
    };
    static makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
}
