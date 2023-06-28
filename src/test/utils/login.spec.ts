import {
  login
} from "../../utils/login.js";
import { expect } from 'chai';
import sinon from 'sinon';

describe('login', () => {
  let fetchAdapterStub;

  beforeEach(() => {
    fetchAdapterStub = sinon.stub();
  });

  it('should return an error for invalid credentials', async () => {
    fetchAdapterStub.returns(Promise.resolve({ json: () => errorResponse }));
  
    const response = await login(fetchAdapterStub, '', '');

    expect(response).to.have.property('error');
    
    expect(fetchAdapterStub.calledWith("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: '',
        password: '',
      }),
    })).to.be.true;
  });

  afterEach(() => {
    fetchAdapterStub.restore();
  });
});