"use client";

import { use, useState } from "react";

interface Book{
    title: string;
    price: string;
    availability: string;
    ratings: string;
}

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        const response = await fetch("/api/scrape-books");
        const data = await response.json();
        setBooks(data);
        setLoading(false);
    }

    return(
        <main className="hero bg-base-200 min-h-scrreen">
            <div className="p-6  text-center">
                <div>
                    <h1 className="text-5xl font-bold mb-8">Book Scrapper</h1>
                    <p className="mb-6">
                        <button
                            onClick={fetchBooks}
                            className="btn btn-primary"
                            disabled={loading}
                            >
                            {loading ? "Scraping..." : "Scrape Books"}
                        </button>
                    </p>
                </div>
                {(books && !loading) &&  (
                    <div className="container mx-auto bg-base flex items-center justify-center">
                        <div className="max-h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-8">
                            {books.map((book, index) => (
                                    <div key={index} className="p-4 border rounded shadow">
                                        <h2 className="text-lg font-semibold">{book.title}</h2>
                                        <p><strong>Price:</strong> {book.price}</p>
                                        <p><strong>Availability:</strong> {book.availability}</p>
                                        <p><strong>Ratings:</strong> {book.ratings}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
                {/* <div className="grid"> */}
                    {/* <ul className="grid mt-6 space-y-4">
                        {books.map((book, index) => (
                            <li key={index} className="p-4 border rounded shadow">
                                <h2 className="text-lg font-semibold">{book.title}</h2>
                                <p><strong>Price:</strong> {book.price}</p>
                                <p><strong>Availability:</strong> {book.availability}</p>
                                <p><strong>Ratings:</strong> {book.ratings}</p>
                            </li>
                        ))}
                    </ul> */}
                {/* </div> */}
            </div>
        </main>
    )
}