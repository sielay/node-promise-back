# node-promise-back

Easily wraps deferred/promise to be used in functions requiring callback function.

Works with

 * [kriskowal/q](https://github.com/kriskowal/q)
 * [petkaantonov/bluebird](https://github.com/petkaantonov/bluebird)
 * native Promise

## Install

```
npm install --save node-promise-back
```

## Usage

See [tests](./test.js).

### Q

```javascri[t

var fs = require('fs'),
    promiseBack = require('node-promise-back'),
    q = require('q'),
    deferred = q.defer();

fs.readFile('path.txt', 'utf8', promiseBack(deferred));

deferred.then(...);

```

### BlueBird

```javascript
var fs = require('fs'),
    promiseBack = require('node-promise-back'),
    Promise = require('bluebird'),
    callback = promiseBack.native(Promise);

fs.readFile('path.txt', 'utf8', callback);

callback.promise.then(...);

```

### Native

```javascript
var fs = require('fs'),
    promiseBack = require('node-promise-back'),
    callback = promiseBack.native();

fs.readFile('path.txt', 'utf8', callback);

callback.promise.then(...);

```

## Test

```
mocha
```

## Autor

lukaszsielski@gmail.com / sielay.com

## Contribute

Fork -> Fix -> Test -> Pull Request

## License

MIT of course