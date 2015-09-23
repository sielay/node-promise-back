'use strict';

var q           = require('q'),
	BBPromise = require('bluebird'),
	promiseBack = require('./index');

require('should');
require('should-promised');

function callbackVoid(callback) {
	callback();
}

function callbackResult(result, callback) {
	callback(null, result);
}

function callbackResults(results, callback) {
	callback.apply(null, [null].concat(results));
}

function fail(callback) {
	callback(new Error('Error'));
}

describe('Works with Q', function () {

	it('Works with no data resolve', function () {
		var deferred = q.defer();
		callbackVoid(promiseBack(deferred));
		return deferred.promise.should.be.resolved;
	});

	it('Works with one arg resolve', function () {
		var deferred = q.defer();
		callbackResult(123, promiseBack(deferred));
		return deferred.promise.should.eventually.be.equal(123);
	});

	it('Works with few args arg resolve', function () {
		var deferred = q.defer();
		callbackResults([123, 456, 789], promiseBack(deferred));
		return deferred.promise.should.eventually.be.eql([123, 456, 789]);
	});

	it('Works with fail', function () {
		var deferred = q.defer();
		fail(promiseBack(deferred));
		return deferred.promise.should.be.rejected;
	});

});

describe('Works with native Promise', function () {

	it('Works with no data resolve', function () {
		var deferred = promiseBack.native();
		callbackVoid(deferred);
		deferred.promise.should.be.instanceOf(Promise);
		return deferred.promise.should.be.resolved;
	});

	it('Works with one arg resolve', function () {
		var deferred = promiseBack.native();
		callbackResult(123, deferred);
		deferred.promise.should.be.instanceOf(Promise);
		return deferred.promise.should.eventually.be.equal(123);
	});

	it('Works with few args arg resolve', function () {
		var deferred = promiseBack.native();
		callbackResults([123, 456, 789], deferred);
		deferred.promise.should.be.instanceOf(Promise);
		return deferred.promise.should.eventually.be.eql([123, 456, 789]);
	});

	it('Works with fail', function () {
		var deferred = promiseBack.native();
		fail(deferred);
		deferred.promise.should.be.instanceOf(Promise);
		return deferred.promise.should.be.rejected;
	});

});

describe('Works with BlueBird', function () {

	it('Works with no data resolve', function () {
		var deferred = promiseBack.native(BBPromise);
		callbackVoid(deferred);
		deferred.promise.should.be.instanceOf(BBPromise);
		return deferred.promise.should.be.resolved;
	});

	it('Works with one arg resolve', function () {
		var deferred = promiseBack.native(BBPromise);
		callbackResult(123, deferred);
		deferred.promise.should.be.instanceOf(BBPromise);
		return deferred.promise.should.eventually.be.equal(123);
	});

	it('Works with few args arg resolve', function () {
		var deferred = promiseBack.native(BBPromise);
		callbackResults([123, 456, 789], deferred);
		deferred.promise.should.be.instanceOf(BBPromise);
		return deferred.promise.should.eventually.be.eql([123, 456, 789]);
	});

	it('Works with fail', function () {
		var deferred = promiseBack.native(BBPromise);
		fail(deferred);
		deferred.promise.should.be.instanceOf(BBPromise);
		return deferred.promise.should.be.rejected(); // because `Unhandled rejection Error`
	});

});
