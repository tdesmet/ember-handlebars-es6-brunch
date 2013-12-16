var compiler = require('ember-template-compiler');
var sysPath = require('path');

function EmberHandlebarsEs6Compiler(brunchCfg) {
  var config = brunchCfg && brunchCfg.plugins && brunchCfg.plugins.emberHandlebarsEs6;
  this.validate = (config && config.validate);
  if (this.validate == null) this.validate = true;
}
EmberHandlebarsEs6Compiler.prototype.brunchPlugin = true;
EmberHandlebarsEs6Compiler.prototype.type = 'template';
EmberHandlebarsEs6Compiler.prototype.extension = 'hbs';
EmberHandlebarsEs6Compiler.prototype.compile = function(data, path, callback) {
  var tmplPath, tmplName, content;
  try {
    tmplPath = path.replace(this.root, '');
    tmplPath = tmplPath.replace(/\\/g, '/');
    tmplPath = tmplPath.substr(0, tmplPath.length - sysPath.extname(tmplPath).length);
    tmplName = "Ember.TEMPLATES['" + tmplPath + "']";
    content = compiler.precompile(data.toString()).toString();
    var result = "export default " + tmplName + " = Ember.Handlebars.template(" + content + ");";
    return callback(null,result);
  } catch (error) {
    return callback(error);
  }
};

module.exports = EmberHandlebarsEs6Compiler;