import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="my-20">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
        Me contacter
      </h2>
      <form
        action="https://formsubmit.co/moussaisma05@gmail.com"
        method="POST"
        className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4"
      >
        {/* Champs cachés pour configurer FormSubmit */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-700"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 rounded border dark:bg-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
