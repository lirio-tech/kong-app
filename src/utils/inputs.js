export default {
    usernameInputs(value) {
        let v = String(value);
        v=v.replace(/[^a-zA-Z0-9]/g, "");
        return v;        
    }
}