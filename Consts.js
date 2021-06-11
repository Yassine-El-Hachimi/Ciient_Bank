

let Consts = () => {
    var USER_ID = -1;

    setUID = (id) => {
        this.USER_ID = id;
    }

    getUID = () => {
        return this.USER_ID;
    }
}   

export default Consts;