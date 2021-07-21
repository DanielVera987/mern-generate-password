import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import server from '../src/server';
import { generatePassword } from '../src/components/generate';

chai.should();
chai.use(chaiHttp);

assert.strict;

describe('Generate Password', () => {
  it('should accept to be called without the options parameter', () => {
    const defaultNumbers = 6;
    assert.strictEqual(generatePassword().length, defaultNumbers);
  });

  it('should give password of correct length', () => {
    const numberOfCharacters = 5;

    const options = {
      "simbols": false,
      "numbers": false,
      "uppercase": false,
      "lowercase": true
    }

    assert.strictEqual(generatePassword(numberOfCharacters, options).length, 5);
  });

  it('generate password included simbols, numbers, uppercase, lowercase', () => {
    const numberOfCharacters = 10;

    const options = {
      "simbols": true,
      "numbers": true,
      "uppercase": true,
      "lowercase": true
    }

    const password = generatePassword(numberOfCharacters, options);

    assert.match(password, /[a-z]/, 'password has a lowercase letter');
    assert.match(password, /[A-Z]/, 'password has a uppercase letter');
    assert.match(password, /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/, 'password has a symbols');
    assert.match(password, /[0-9]/, 'password has a number');
  });

  it('generate password included numbers and ten characters', () => {
    const numberOfCharacters = 10;

    const options = {
      "simbols": false,
      "numbers": true,
      "uppercase": false,
      "lowercase": true
    }

    const password = generatePassword(numberOfCharacters, options);
    assert.strictEqual(password.length, 10, 'accept ten characters');
    assert.match(password, /[0-9]/, 'password has a number');
  });
});

describe('POST /api/generate', () => {
  it('It should POST a generate password', (done) => {
    const options = {
      "character": 5,
      "simbols": true,
      "numbers": true,
      "uppercase": true
    };

    chai.request(server)
      .post("/generate")
      .send(options)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('password');
        done();
      });
  });

  it('It should POST a generate password with two characters', (done) => {
    const options = {
      "character": 2,
      "simbols": true,
      "numbers": true,
      "uppercase": false
    };

    chai.request(server)
      .post("/generate")
      .send(options)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('password');
        done();
      });
  });
});