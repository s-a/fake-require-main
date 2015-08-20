var path = require("path")

var FakeRequireMain = function() {
	return this;
}

FakeRequireMain.prototype.fake = function(require, filename) {
	if ( typeof(require.main) !== typeof(module) ){
		throw new Error("need current require as first parameter!");
	}

	if (!require("module")._cache[filename]){
		throw new Error("module not found.");
	}

	//console.log("changing main module", "from", require.main.filename, "to", filename);
	process.mainModule = require.main = module.parent.require.main = require("module")._cache[filename];
};

FakeRequireMain.prototype.fakeFor = function(require, filename, environment) {
	var env = process.argv[0];
	var ext = path.extname(env);

	if (ext === ""){
		env = path.basename(process.argv[0]);
	} else {
		env = path.basename(process.argv[0], ext);
	}

	if (env === environment) {
		this.fake(require, filename);
	}
};

module.exports = new FakeRequireMain();