'use strict';

/**
 * Create callback for Q.Deferred
 * @param {Q.Deferred} deferred
 * @returns {Function}
 */
module.exports = function (deferred) {

	return function () {

		var args = Array.prototype.slice.call(arguments),
			error = args.shift();

		if (error) return deferred.reject();

		if (args.length > 1) return deferred.resolve(args);
		if (args.length === 1) return deferred.resolve(args[0]);
		deferred.resolve(true);

	};

};

/**
 * Creates callback for native or BlueBird promise
 * @param {undefined|Function} constructClass
 * @returns {Function}
 */
module.exports.native = function (constructClass) {

	var resolve,
		reject,
		promise = new (constructClass || Promise)(function (_resolve, _reject) {
			resolve = _resolve;
			reject = _reject;
		}), callback =

			function () {

				var args = Array.prototype.slice.call(arguments),
					error = args.shift();

				if (error) return reject();

				if (args.length > 1) return resolve(args);
				if (args.length === 1) return resolve(args[0]);
				resolve(true);

			};

	callback.promise = promise;
	return callback;

};