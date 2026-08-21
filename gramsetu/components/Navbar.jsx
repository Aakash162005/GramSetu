import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        GramSetu
      </h1>

      <div className="flex gap-5">
        <Link href="/">Home</Link>
        <Link href="/notices">Notices</Link>
        <Link href="/services">Services</Link>
        <Link href="/events">Events</Link>
        <Link href="/complaints">Complaints</Link>
      </div>
    </nav>
  );
}

export default Navbar;