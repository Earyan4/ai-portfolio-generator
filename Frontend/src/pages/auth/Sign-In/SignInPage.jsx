import React, { useState } from "react";
import { loginUser } from "../../../Services/authApi";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      console.log("Login success:", res.data);
      alert("Login successful");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignInPage;

