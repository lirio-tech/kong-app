var pjson = require('../../package.json');

export default {
    version() {
        return pjson.version;
    }
}