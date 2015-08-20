#!/usr/bin/env node
var should  = require('should');
var fakeMainModule = require("../index.js");
var mainModuleBackup = require.main;

describe('fake require.main', function(){
	it('should expect require as 1. parameter', function(){
		(function testFirstParm() {
			fakeMainModule.fake("asdfasdfasd");
		}).should.throw(new Error("need current require as first parameter!"));
	});

	it('should expect a valid module filename as 2. parameter', function(){
		(function testFirstParm() {
			fakeMainModule.fake(require, "asdfasdfasd");
		}).should.throw("module not found.");
	});

	it('should not assigned to this module __filename', function(){
		require.main.should.not.deepEqual(module);
	});

	it('should not be assigned to this module for electron env', function(){
		fakeMainModule.fakeFor(require, __filename, "electron");
		require.main.should.not.deepEqual(module);
	});

	it('should not assigned to this module __filename', function(){
		require.main = mainModuleBackup;
		require.main.should.not.deepEqual(module);
	});

	it('should be assigned to this module', function(){
		fakeMainModule.fake(require, __filename);
		require.main.should.deepEqual(module);
		process.mainModule.should.deepEqual(module);
	});

	it('should not assigned to this module __filename', function(){
		require.main = mainModuleBackup;
		require.main.should.not.deepEqual(module);
	});

	it('should be assigned to this module for node env', function(){
		fakeMainModule.fakeFor(require, __filename, "node");
		require.main.should.deepEqual(module);
		process.mainModule.should.deepEqual(module);
	});
});