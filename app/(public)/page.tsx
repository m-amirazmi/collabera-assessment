import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center flex-col gap-4 justify-center">
      <h1 className="text-xl text-center">Welcome to Collabera Assessment</h1>
      <Link className="btn btn-neutral btn-wide" href="/login">
        Login
      </Link>
    </div>
  );
}
