var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
const conn = require('../../database/connect');
var server = require('../../index');
let chaiHttp = require('chai-http');
const { response } = require('express');
const { default: mongoose } = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
chai.use(chaiHttp);

describe('/Product Apis', function () {
  before((done) => {
    conn
      .connectDB()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    conn
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  const id = new mongoose.Types.ObjectId();

  it('create product api', function (done) {
    chai
      .request(server)
      .post(`/api/product/create`)
      .send({
        _id: id,
        productName: 'Fair & Lovely',
        qtyPerUnit: 10,
        unitPrice: 1000,
        discontinued: false,
        categoryName: 'cosmetics',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('update product api', function (done) {
    chai
      .request(server)
      .put(`/api/product/${id.toHexString()}/update`)
      .send({
        productName: 'Fair & Lovely',
        qtyPerUnit: 100,
        unitPrice: 10000,
        discontinued: false,
        categoryName: 'cosmetics',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('get product api', function (done) {
    chai
      .request(server)
      .get(`/api/product/${id.toHexString()}/read`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('get All product api', function (done) {
    chai
      .request(server)
      .get(`/api/product/readall`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('delete product api', function (done) {
    chai
      .request(server)
      .delete(`/api/product/${id.toHexString()}/delete`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
