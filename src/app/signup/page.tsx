"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [options, setOptions] = useState<{ id: string; role: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch("/api/roles");
        const data = await res.json();

        const capitalizedData = data.map(
          (item: { role: string; id: string }) => ({
            ...item,
            role:
              item.role.charAt(0).toUpperCase() +
              item.role.slice(1).toLowerCase(),
          })
        );

        setOptions(capitalizedData);
      } catch (error) {
        console.error("Error getting roles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOptions();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Extrair valores
    const full_name = formData.get("full_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");
    const role = formData.get("role");
    const gender = formData.get("gender");

    // Validar campos obrigatórios
    if (
      !full_name ||
      !email ||
      !password ||
      !confirm_password ||
      !birthdate ||
      !role ||
      !gender
    ) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    // Validar passwords
    if (password.toString() !== confirm_password.toString()) {
      setError("Passwords don't match");
      return;
    }

    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: full_name.toString(),
          email: email.toString(),
          password: password.toString(),
          birthdate: birthdate,
          role: Number(role),
          gender: gender.toString(),
        }),
      });
      const data = await res.json();

      if (!data) {
        toast.error("Error creating account");
        return;
      }
      toast.success("Account created");
      setTimeout(() => {
        router.push("/signin"); // redireciona para página de login. Falta fazer pagina de login
      }, 1000);
    } catch (err) {
      console.error(err);
      // Needs to show an error (setError) when email is allready registered
      toast.error(`Error creating account ${err}`);
    }

    // Aqui podes redirecionar para outra página, ex: login
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center border-blue-200 border-1 shadow-2xl rounded-lg mt-10 w-[400px] mx-auto p-2">
        <h1 className="text-2xl mb-5">Create Account</h1>
        <p className="text-red-500 mb-3">{error}</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <p className="self-start text-sm mb-2">You are a:</p>
          <select
            id="role"
            name="role"
            disabled={loading}
            defaultValue={""}
            className="mb-4 w-full p-2 border rounded"
          >
            <option value="" disabled hidden>
              Select...
            </option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.role}
              </option>
            ))}
          </select>
          <p className="self-start text-sm mb-2">Full Name</p>
          <input
            name="full_name"
            type="text"
            placeholder="Full Name"
            className="mb-4 w-full p-2 border rounded"
          />
          <p className="self-start text-sm mb-2">Email</p>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="mb-4 w-full p-2 border rounded"
          />
          <p className="self-start text-sm mb-2">Password</p>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-4 w-full p-2 border rounded"
          />
          <p className="self-start text-sm mb-2">Repeat Password</p>
          <input
            name="confirm_password"
            type="password"
            placeholder="Password"
            className="mb-4 w-full p-2 border rounded"
          />
          <p className="self-start text-sm mb-2">Gender</p>
          <select
            id="gender"
            name="gender"
            disabled={loading}
            defaultValue={""}
            className="mb-4 w-full p-2 border rounded"
          >
            <option value="" disabled hidden>
              Select...
            </option>
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
          <p className="self-start text-sm mb-2">Birthdate</p>
          <input
            name="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="mb-4 w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        closeButton={false}
        theme="dark"
      />
    </>
  );
}
