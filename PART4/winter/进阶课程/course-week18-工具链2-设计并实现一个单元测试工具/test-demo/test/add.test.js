//var add = require('../src/add');
//var assert = require('assert');
import {add} from '../src/add.js';
import assert from 'assert';

describe('add', function() {
    it('add(3, 4) should be 7', function() {
        assert.equal(add(3, 4), 7);
    }); 
});