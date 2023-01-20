import { useGlobalContext } from "../context/context";

const Personalinfo = () => {
  const { page, setPage } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  return (
    <section className="flex flex-col gap-3 bg-white p-5 rounded-lg md:h-full md:relative">
      <h1 className="text-2xl text-[var(--Marine-blue)] font-bold">
        Personal info
      </h1>
      <h3 className="text-[var(--Cool-gray)] text-lg">
        Please provide your name, email address, and phone number.
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-[var(--Marine-blue)] text-sm font-medium"
            >
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              placeholder="e.g. Stephen King"
              className="border rounded py-2 px-3 font-semibold"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email adress"
              className="text-[var(--Marine-blue)] text-sm font-medium"
            >
              Email Adress
            </label>
            <input
              required
              type="email"
              id="email adress"
              placeholder="e.g. stephenking@lorem.com"
              className="border rounded py-2 px-3 font-semibold"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone number"
              className="text-[var(--Marine-blue)] text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              required
              type="number"
              id="phone number"
              placeholder="e.g. +1 234 567 890"
              className="border rounded py-2 px-3 font-semibold"
            />
          </div>
        </div>
        <div className="fixed bottom-0 right-0 w-full bg-white p-5 flex justify-end md:absolute md:bg-transparent md:p-0">
          <button
            type="submit"
            className="bg-[var(--Marine-blue)] text-white text-bold rounded p-2"
          >
            Next Step
          </button>
        </div>
      </form>
    </section>
  );
};

export default Personalinfo;
