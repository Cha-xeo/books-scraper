import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

interface Book{
    title: string;
    price: string;
    availability: string;
    ratings: string;
}

const url: string = "https://books.toscrape.com/";

export async function GET() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: "domcontentloaded"});

    // extract data
    const books: Book[] = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".product_pod")).map(book => ({
            title: book.querySelector("h3 a")?.getAttribute("title") || "No Title",
            price: book.querySelector(".price_color")?.textContent?.trim() || "No Price",
            availability: book.querySelector(".availability")?.textContent?.trim() || "Unknown",
            ratings: book.querySelector(".star-rating")?.classList[1] || "No Rating",
        }));
    });

    await browser.close();
    return NextResponse.json(books);
}