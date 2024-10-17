import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex justify-center mt-10 bg-gray-100">
      <div className="p-4 ">
        <main className="bg-white flex flex-col items-center justify-center py-2 md:py-4 ">
          <article className="flex flex-col items-center justify-center p-2">
            <h1 className=" text-4xl md:text-8xl text-blue-900 font-bold mb-4">
              404
            </h1>
            <div className="flex flex-col items-center justify-center">
              <h1 className=" text-2xl md:text-4xl font-bold">
                Something's missing.
              </h1>
              <p className="text-lg md:text-2xl text-center text-zinc-600 my-4">
                Sorry, we can't find that page. You'll find lots to explore on
                the home page.
              </p>
              <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
                <Link href="/">Back to Home</Link>
              </button>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
