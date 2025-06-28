import React, { useState } from 'react';

function LoginPage() {
  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      
      <div>
        <label htmlFor="pass">Password:</label>
        <input type="password" id="pass" name="password" minLength="8" required />
      </div>
      
      <div>
        <input type="submit" value="Sign in" />
      </div>
    </form>
  );
}

export default LoginPage;
